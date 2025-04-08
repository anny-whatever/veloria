import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const srcDir = path.resolve(__dirname, "../src");
const outputDir = path.resolve(__dirname, "../dist/client");

console.log("Starting image optimization...");

// Create a map to store original image paths and their optimized versions
const imageMap = new Map();

/**
 * Optimize all images in the source directories
 */
async function optimizeImages() {
  console.log("Scanning for images...");

  // Find all image files
  const imagePatterns = ["png", "jpg", "jpeg", "gif"].map(
    (ext) => `{${publicDir},${srcDir}}/**/*.${ext}`
  );

  const imagePaths = imagePatterns.flatMap((pattern) =>
    globSync(pattern, { absolute: true })
  );

  console.log(`Found ${imagePaths.length} images to optimize.`);

  if (imagePaths.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Group by directory to maintain structure
  const imagesByDir = {};
  for (const imagePath of imagePaths) {
    const dir = path.dirname(imagePath);
    if (!imagesByDir[dir]) {
      imagesByDir[dir] = [];
    }
    imagesByDir[dir].push(imagePath);
  }

  // Process images directory by directory
  for (const [dir, images] of Object.entries(imagesByDir)) {
    // Determine output directory
    let relativePath;
    if (dir.startsWith(publicDir)) {
      relativePath = path.relative(publicDir, dir);
    } else if (dir.startsWith(srcDir)) {
      relativePath = path.relative(srcDir, dir);
    } else {
      relativePath = "";
    }

    const targetDir = path.join(outputDir, relativePath);

    // Ensure target directory exists
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(
      `Processing ${images.length} images in ${
        relativePath || "root"
      } directory...`
    );

    for (const imagePath of images) {
      const filename = path.basename(imagePath);
      const fileExt = path.extname(imagePath).toLowerCase();
      const filenameWithoutExt = path.basename(filename, fileExt);

      try {
        // Get original file size
        const originalStats = fs.statSync(imagePath);
        totalOriginalSize += originalStats.size;

        // Read image data
        const imageBuffer = fs.readFileSync(imagePath);

        // Process with Sharp - resize if needed and optimize
        let processedImage = sharp(imageBuffer);

        // Get image metadata
        const metadata = await processedImage.metadata();

        // Only resize if the image is very large
        if (metadata.width > 1920) {
          processedImage = processedImage.resize({
            width: 1920,
            withoutEnlargement: true,
          });
        }

        // Create both optimized original format and WebP version
        const outputPathOriginal = path.join(targetDir, filename);
        const outputPathWebp = path.join(
          targetDir,
          `${filenameWithoutExt}.webp`
        );

        // Save optimized version in original format
        await processedImage.toFile(outputPathOriginal);

        // Create WebP version
        await processedImage.webp({ quality: 80 }).toFile(outputPathWebp);

        // Get optimized sizes
        const optimizedStats = fs.statSync(outputPathOriginal);
        const webpStats = fs.statSync(outputPathWebp);

        totalOptimizedSize += Math.min(optimizedStats.size, webpStats.size);

        // Add to image map
        const relativeImagePath = path.join(relativePath, filename);
        imageMap.set(relativeImagePath, {
          original: {
            path: relativeImagePath,
            size: optimizedStats.size,
          },
          webp: {
            path: path.join(relativePath, `${filenameWithoutExt}.webp`),
            size: webpStats.size,
          },
        });

        // Calculate savings
        const originalKB = (originalStats.size / 1024).toFixed(2);
        const optimizedKB = (optimizedStats.size / 1024).toFixed(2);
        const webpKB = (webpStats.size / 1024).toFixed(2);
        const bestSizeKB = (
          Math.min(optimizedStats.size, webpStats.size) / 1024
        ).toFixed(2);
        const savingsPercent = (
          ((originalStats.size -
            Math.min(optimizedStats.size, webpStats.size)) /
            originalStats.size) *
          100
        ).toFixed(2);

        console.log(
          `${filename}: ${originalKB} KB → ${bestSizeKB} KB (${savingsPercent}% savings)`
        );
      } catch (err) {
        console.error(`Error processing ${filename}:`, err.message);
      }
    }
  }

  // Calculate total savings
  const savingsPercent = (
    ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) *
    100
  ).toFixed(2);
  console.log(
    `\nTotal image optimization: ${(totalOriginalSize / 1024 / 1024).toFixed(
      2
    )} MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(
      2
    )} MB (${savingsPercent}% savings)`
  );
}

/**
 * Create a manifest file with the optimized image paths
 */
function createImageManifest() {
  const manifestPath = path.join(outputDir, "image-manifest.json");
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(Object.fromEntries(imageMap), null, 2)
  );
  console.log(`Created image manifest at ${manifestPath}`);
}

/**
 * Create utility script for optimal image loading
 */
function createImageLoader() {
  const scriptContent = `
// Image loader utility
export function getOptimalImagePath(imagePath) {
  // Check if browser supports WebP
  const supportsWebp = localStorage.getItem('supports-webp');
  
  if (supportsWebp === 'true') {
    // Replace extension with .webp if it exists
    const webpPath = imagePath.replace(/\\.(jpg|jpeg|png|gif)$/i, '.webp');
    return webpPath;
  }
  
  return imagePath;
}

// Detect WebP support and store in localStorage
export function detectWebpSupport() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('supports-webp') === null) {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
      canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
        ? localStorage.setItem('supports-webp', 'true')
        : localStorage.setItem('supports-webp', 'false');
    }
  }
}

// Preload critical images
export function preloadCriticalImages(images) {
  if (typeof window === 'undefined') return;
  
  images.forEach(src => {
    const optimalSrc = getOptimalImagePath(src);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimalSrc;
    document.head.appendChild(link);
  });
}
`;

  const outputPath = path.join(srcDir, "utils", "imageLoader.js");

  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, scriptContent);
  console.log(`Created image loader utility at ${outputPath}`);
}

// Run all optimization tasks
async function runOptimizations() {
  try {
    await optimizeImages();
    createImageManifest();
    createImageLoader();
    console.log("Image optimization completed.");
  } catch (err) {
    console.error("Error during image optimization:", err);
    process.exit(1);
  }
}

runOptimizations();
