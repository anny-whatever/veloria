import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  interactive = false,
  hover = false,
  depth = "default",
  padding = "default",
  as = "div",
  onClick = null,
  ...props
}) => {
  // Determine shadow based on depth
  const shadows = {
    none: "",
    sm: "shadow-sm dark:shadow-lg",
    default: "shadow-md dark:shadow-lg",
    lg: "shadow-lg dark:shadow-xl",
    xl: "shadow-xl dark:shadow-xl",
  };

  // Determine padding based on size
  const paddings = {
    none: "p-0",
    sm: "p-3",
    default: "p-5",
    lg: "p-6",
    xl: "p-8",
  };

  // Base classes always applied
  let cardClasses = `
    bg-surface-50 dark:bg-dark-100 
    border border-gray-100 dark:border-gray-800
    text-gray-900 dark:text-gray-100
    rounded-lg 
    ${shadows[depth] || shadows.default}
    ${paddings[padding] || paddings.default}
    ${className}
  `;

  // Add interactivity if requested
  if (interactive) {
    cardClasses += " cursor-pointer transition-all duration-300";
  }

  // Props for interactive cards
  const interactiveProps = interactive
    ? {
        whileHover: {
          y: -5,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        whileTap: { y: -2 },
        onClick: onClick,
      }
    : {};

  // Props for hover effect but non-interactive cards
  const hoverProps =
    hover && !interactive
      ? {
          whileHover: {
            y: -5,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          },
        }
      : {};

  // Create component with specified element type
  const Component = motion[as];

  return (
    <Component
      className={cardClasses}
      {...interactiveProps}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
