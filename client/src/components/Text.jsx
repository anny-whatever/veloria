import React from "react";

const Text = ({
  children,
  size = "base",
  weight = "normal",
  color = "default",
  align = "left",
  className = "",
  as = "p",
  ...props
}) => {
  // Font size classes
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };

  // Font weight classes
  const weightClasses = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  // Text color classes with fixed dark mode variants
  const colorClasses = {
    default: "text-gray-900 dark:text-gray-100",
    primary: "text-primary-600 dark:text-primary-400",
    secondary: "text-secondary-600 dark:text-secondary-400",
    accent: "text-accent-600 dark:text-accent-400",
    muted: "text-gray-600 dark:text-gray-300",
    lighter: "text-gray-500 dark:text-gray-400",
    lightest: "text-gray-400 dark:text-gray-500",
    white: "text-white",
    black: "text-black dark:text-white",
    error: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
  };

  // Text alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  // Combine classes
  const textClasses = `
    ${sizeClasses[size] || sizeClasses.base}
    ${weightClasses[weight] || weightClasses.normal}
    ${colorClasses[color] || colorClasses.default}
    ${alignClasses[align] || alignClasses.left}
    ${className}
  `;

  // Create component with specified element type
  const Component = as;

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

// Specialized variant for headings
export const Heading = ({
  level = 1,
  children,
  color = "default",
  align = "left",
  className = "",
  ...props
}) => {
  // Mapping heading levels to appropriate sizes
  const sizeMap = {
    1: "4xl",
    2: "3xl",
    3: "2xl",
    4: "xl",
    5: "lg",
    6: "base",
  };

  // Mapping heading levels to appropriate weights
  const weightMap = {
    1: "bold",
    2: "bold",
    3: "semibold",
    4: "semibold",
    5: "medium",
    6: "medium",
  };

  // Mapping heading levels to appropriate margin bottoms
  const marginMap = {
    1: "mb-6",
    2: "mb-5",
    3: "mb-4",
    4: "mb-3",
    5: "mb-2",
    6: "mb-2",
  };

  return (
    <Text
      as={`h${level}`}
      size={sizeMap[level] || "4xl"}
      weight={weightMap[level] || "bold"}
      color={color}
      align={align}
      className={`${marginMap[level] || "mb-4"} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Text;
