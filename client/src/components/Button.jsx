import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href = null,
      to = null,
      fullWidth = false,
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      className = "",
      ...props
    },
    ref
  ) => {
    // Variant styles (primary, secondary, outline, ghost, etc.)
    const variantClasses = {
      primary: "btn-primary text-white font-medium",
      secondary: "btn-secondary text-primary-600 dark:text-white font-medium",
      accent: "btn-accent text-white font-medium",
      outline:
        "btn border-2 border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium",
      ghost:
        "btn bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium",
      danger:
        "btn bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 font-medium",
      success:
        "btn bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 font-medium",
    };

    // Size styles
    const sizeClasses = {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2 text-base",
      lg: "px-8 py-3 text-lg",
      xl: "px-10 py-4 text-xl",
    };

    // Common button styles
    const buttonClasses = `
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed dark:opacity-40" : ""}
    ${className}
    flex items-center justify-center gap-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300
  `;

    // Animation settings
    const motionProps = !disabled
      ? {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.2 },
        }
      : {};

    // If it's a link to an external URL
    if (href) {
      return (
        <motion.a
          href={href}
          className={buttonClasses}
          ref={ref}
          {...motionProps}
          {...props}
        >
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </motion.a>
      );
    }

    // If it's a react-router Link
    if (to) {
      return (
        <motion.div className={buttonClasses} {...motionProps}>
          <Link
            to={to}
            className="flex items-center justify-center w-full h-full"
            ref={ref}
            {...props}
          >
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && (
              <span className="inline-flex group-hover:translate-x-1 transition-transform">
                {rightIcon}
              </span>
            )}
          </Link>
        </motion.div>
      );
    }

    // Default button
    return (
      <motion.button
        className={buttonClasses}
        disabled={disabled}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && (
          <span className="inline-flex group-hover:translate-x-1 transition-transform">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
