import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FeaturesSectionDemo from "../ui/features-section-demo";

const TechnicalExcellence = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const headerVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      },
    },
  };

  const subtleFloat = {
    y: [0, -6, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="technical-excellence"
      ref={ref}
      className="relative py-24 text-white bg-gradient-to-b from-black/98 to-gray-950/95 md:py-32"
    >
      {/* Minimal background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/5 w-80 h-80 bg-gradient-radial from-gray-800/4 to-transparent rounded-full"
          animate={subtleFloat}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-radial from-gray-700/3 to-transparent rounded-full"
          animate={{
            ...subtleFloat,
            transition: { ...subtleFloat.transition, delay: 2.5 },
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Minimal Section header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-white tracking-tight">
              Technical Excellence
            </h2>
            <p className="text-gray-400 text-base font-light leading-relaxed">
              Engineering capabilities that drive innovation and deliver
              scalable solutions.
            </p>
          </div>
          <FeaturesSectionDemo />
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalExcellence;
