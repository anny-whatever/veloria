import React from "react";

// Container component with constrained width
export const Container = ({
  children,
  className = "",
  fullWidth = false,
  padding = true,
  ...props
}) => {
  const containerClass = `
    ${fullWidth ? "w-full" : "container mx-auto"} 
    ${padding ? "px-4 md:px-6" : ""}
    ${className}
  `;

  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
};

// Grid component using CSS Grid
export const Grid = ({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "md",
  className = "",
  ...props
}) => {
  // Map gap sizes to appropriate values
  const gapSizes = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
    "2xl": "gap-10",
  };

  // Generate responsive column classes
  const generateColsClass = () => {
    const {
      default: defaultCols,
      sm,
      md,
      lg,
      xl,
    } = typeof cols === "object" ? cols : { default: cols };

    let colClasses = `grid-cols-${defaultCols}`;

    if (sm) colClasses += ` sm:grid-cols-${sm}`;
    if (md) colClasses += ` md:grid-cols-${md}`;
    if (lg) colClasses += ` lg:grid-cols-${lg}`;
    if (xl) colClasses += ` xl:grid-cols-${xl}`;

    return colClasses;
  };

  const gridClass = `
    grid
    ${gapSizes[gap] || gapSizes.md}
    ${generateColsClass()}
    ${className}
  `;

  return (
    <div className={gridClass} {...props}>
      {children}
    </div>
  );
};

// Grid item component
export const GridItem = ({
  children,
  colSpan = { default: 1 },
  rowSpan = { default: 1 },
  className = "",
  ...props
}) => {
  // Generate responsive column span classes
  const generateSpanClass = (span, type = "col") => {
    if (typeof span === "number") {
      return `${type}-span-${span}`;
    }

    const { default: defaultSpan, sm, md, lg, xl } = span;

    let spanClasses = `${type}-span-${defaultSpan}`;

    if (sm) spanClasses += ` sm:${type}-span-${sm}`;
    if (md) spanClasses += ` md:${type}-span-${md}`;
    if (lg) spanClasses += ` lg:${type}-span-${lg}`;
    if (xl) spanClasses += ` xl:${type}-span-${xl}`;

    return spanClasses;
  };

  const itemClass = `
    ${generateSpanClass(colSpan)}
    ${generateSpanClass(rowSpan, "row")}
    ${className}
  `;

  return (
    <div className={itemClass} {...props}>
      {children}
    </div>
  );
};

// Section component for consistent spacing
export const Section = ({
  children,
  id,
  spacing = "default",
  className = "",
  ...props
}) => {
  // Map spacing sizes to appropriate values
  const spacingSizes = {
    none: "py-0",
    sm: "py-8 md:py-12",
    default: "py-12 md:py-16",
    lg: "py-16 md:py-20",
    xl: "py-20 md:py-24",
  };

  const sectionClass = `
    section
    ${spacingSizes[spacing] || spacingSizes.default}
    ${className}
  `;

  return (
    <section id={id} className={sectionClass} {...props}>
      {children}
    </section>
  );
};

export default { Container, Grid, GridItem, Section };
