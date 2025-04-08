import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { minify } from "terser";
import { globSync } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, "../src");

console.log("Starting JavaScript optimization...");

/**
 * Tree-shake unused imports across the codebase
 */
async function removeUnusedImports() {
  console.log("Analyzing imports across codebase...");
  const jsxFiles = globSync(`${srcDir}/**/*.{js,jsx}`, { absolute: true });

  let count = 0;
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, "utf8");

    // Find unused imports
    const importRegex =
      /import\s+(?:{([^}]+)}\s+from\s+['"][^'"]+['"]|([^\s;]+)\s+from\s+['"][^'"]+['"])/g;
    let modifiedContent = content;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importedItems = match[1] || match[2];
      if (!importedItems) continue;

      // Check each imported item
      if (match[1]) {
        // Named imports
        const items = importedItems
          .split(",")
          .map((item) => item.trim().split(" as ")[0].trim());

        for (const item of items) {
          if (item === "") continue;

          // Check if item is used in the file outside of import statements
          const regex = new RegExp(`[^a-zA-Z0-9_]${item}[^a-zA-Z0-9_]`, "g");
          const usageMatches = content.match(regex);

          if (!usageMatches || usageMatches.length <= 0) {
            console.log(
              `Removing unused import: ${item} in ${path.basename(file)}`
            );
            // Remove the specific import
            modifiedContent = modifiedContent.replace(
              new RegExp(`\\s*${item}\\s*,?`, "g"),
              ""
            );
            count++;
          }
        }
      }
    }

    if (modifiedContent !== content) {
      // Clean up any empty import statements or trailing commas
      modifiedContent = modifiedContent
        .replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?/g, "")
        .replace(/import\s*{\s*,\s*}/g, "import {")
        .replace(/,\s*}/g, " }")
        .replace(/,\s*,/g, ",");

      fs.writeFileSync(file, modifiedContent);
    }
  }

  console.log(`Removed ${count} unused imports`);
}

/**
 * Minify individual JS files
 */
async function minifyJsFiles() {
  console.log("Minifying JavaScript files...");
  const jsFiles = globSync(`${srcDir}/**/*.{js,jsx}`, { absolute: true });

  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");

    try {
      const minified = await minify(content, {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"],
        },
        mangle: true,
      });

      if (minified.code) {
        // Only save minified versions during build to preserve source for development
        // Instead, let's save the minified size information for reference
        const originalSize = Buffer.byteLength(content, "utf8");
        const minifiedSize = Buffer.byteLength(minified.code, "utf8");
        const savingsPercent = (
          ((originalSize - minifiedSize) / originalSize) *
          100
        ).toFixed(2);

        console.log(
          `${path.basename(
            file
          )}: ${originalSize} → ${minifiedSize} bytes (${savingsPercent}% reduction)`
        );

        // Don't actually write minified files - let Vite handle the minification during build
        // fs.writeFileSync(file, minified.code);
      }
    } catch (err) {
      console.error(`Error minifying ${file}:`, err.message);
    }
  }
}

/**
 * Analyze component dependencies
 */
function analyzeComponentDependencies() {
  console.log("Analyzing component dependencies...");
  const jsxFiles = globSync(`${srcDir}/**/*.jsx`, { absolute: true });

  const dependencyGraph = {};

  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileName = path.basename(file);

    dependencyGraph[fileName] = [];

    // Extract imports
    const importRegex =
      /import\s+(?:{([^}]+)}\s+from\s+['"]([^'"]+)['"]|([^\s;]+)\s+from\s+['"]([^'"]+)['"])/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[2] || match[4];
      if (importPath.startsWith(".")) {
        const importedFile = path.basename(importPath) + ".jsx";
        dependencyGraph[fileName].push(importedFile);
      }
    }
  }

  // Find circular dependencies
  const circularDeps = findCircularDependencies(dependencyGraph);
  if (circularDeps.length > 0) {
    console.log("⚠️ Circular dependencies detected:");
    circularDeps.forEach((cycle) => {
      console.log(`  ${cycle.join(" → ")} → ${cycle[0]}`);
    });
  } else {
    console.log("✅ No circular dependencies detected");
  }

  // Find most imported components (candidates for code splitting)
  const importCounts = {};
  Object.values(dependencyGraph).forEach((deps) => {
    deps.forEach((dep) => {
      importCounts[dep] = (importCounts[dep] || 0) + 1;
    });
  });

  const topImported = Object.entries(importCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (topImported.length > 0) {
    console.log("📊 Top imported components (candidates for code splitting):");
    topImported.forEach(([component, count]) => {
      console.log(`  ${component}: imported ${count} times`);
    });
  }
}

/**
 * Find circular dependencies in the dependency graph
 */
function findCircularDependencies(graph) {
  const cycles = [];
  const visited = new Set();
  const recursionStack = new Set();

  function dfs(node, path = []) {
    if (recursionStack.has(node)) {
      const cycleStart = path.indexOf(node);
      if (cycleStart >= 0) {
        cycles.push(path.slice(cycleStart));
      }
      return;
    }

    if (visited.has(node)) return;

    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    for (const neighbor of graph[node] || []) {
      dfs(neighbor, [...path]);
    }

    recursionStack.delete(node);
  }

  for (const node of Object.keys(graph)) {
    dfs(node);
  }

  return cycles;
}

// Run all optimization tasks
async function runOptimizations() {
  try {
    await removeUnusedImports();
    await minifyJsFiles();
    analyzeComponentDependencies();
    console.log("JavaScript optimization completed.");
  } catch (err) {
    console.error("Error during JavaScript optimization:", err);
    process.exit(1);
  }
}

runOptimizations();
