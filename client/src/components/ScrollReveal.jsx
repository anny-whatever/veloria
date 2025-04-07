import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollReveal = ({
  children,
  direction = "up",
  duration = 0.6,
  delay = 0,
  distance = 30,
  threshold = 0.1,
  repeat = false,
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat) {
            observer.unobserve(currentRef);
          } else if (entry.intersectionRatio < threshold) {
            setIsVisible(false);
          }
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, repeat]);

  // Define initial and animate states based on direction
  const getAnimationProps = () => {
    let initial = { opacity: 0 };

    switch (direction) {
      case "up":
        initial = { opacity: 0, y: distance };
        break;
      case "down":
        initial = { opacity: 0, y: -distance };
        break;
      case "left":
        initial = { opacity: 0, x: distance };
        break;
      case "right":
        initial = { opacity: 0, x: -distance };
        break;
      case "scale":
        initial = { opacity: 0, scale: 0.9 };
        break;
      default:
        initial = { opacity: 0, y: distance };
    }

    return {
      initial,
      animate: isVisible ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for a smooth, natural feel
      },
      viewport: {
        once: !repeat,
        margin: `${-threshold * 100}px`,
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      {...getAnimationProps()}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
