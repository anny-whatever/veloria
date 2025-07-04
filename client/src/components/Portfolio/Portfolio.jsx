// src/components/Portfolio/Portfolio.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import portfolioProjects from "../../data/portfolioProjects.jsx";
import { cn } from "../../lib/utils";
import {
  IconCode,
  IconRocket,
  IconShield,
  IconDatabase,
  IconCloud,
  IconBrandGithub,
  IconExternalLink,
  IconBrain,
  IconServer,
  IconCurrencyBitcoin,
  IconHeartHandshake,
  IconApi,
} from "@tabler/icons-react";

const categoryIcons = {
  mvp: <IconRocket className="w-5 h-5" />,
  ai: <IconBrain className="w-5 h-5" />,
  ecommerce: <IconHeartHandshake className="w-5 h-5" />,
  healthcare: <IconShield className="w-5 h-5" />,
  blockchain: <IconCurrencyBitcoin className="w-5 h-5" />,
  infrastructure: <IconServer className="w-5 h-5" />,
  api: <IconApi className="w-5 h-5" />,
  database: <IconDatabase className="w-5 h-5" />,
  cloud: <IconCloud className="w-5 h-5" />,
  default: <IconCode className="w-5 h-5" />,
};

const Portfolio = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

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
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-24 text-white bg-gradient-to-b from-gray-900/95 to-black/98 md:py-32"
    >
      {/* Minimal background decoration */}
      {/* <div className="overflow-hidden absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 to-transparent rounded-full bg-gradient-radial from-gray-700/5"
          animate={subtleFloat}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 to-transparent rounded-full bg-gradient-radial from-gray-600/3"
          animate={{
            ...subtleFloat,
            transition: { ...subtleFloat.transition, delay: 2 },
          }}
        />
      </div> */}

      <div className="container relative z-10 px-6 mx-auto max-w-6xl">
        {/* Minimal Section header */}
        <motion.div
          className="mx-auto mb-20 max-w-3xl text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl">
            Featured Work
          </h2>
          <p className="text-base font-light leading-relaxed text-gray-400">
            A selection of projects showcasing technical excellence and creative
            solutions.
          </p>
        </motion.div>

        {/* Minimal Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="grid relative grid-cols-1 gap-0 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.slice(0, 6).map((project, index) => (
              <PortfolioFeature
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Minimal CTA Section */}
        <motion.div
          className="pt-16 text-center border-t border-dashed border-gray-700/40"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h3 className="mb-4 text-xl font-light text-white">
            Let's work together
          </h3>
          <p className="mx-auto mb-8 max-w-lg text-sm font-light text-gray-400">
            Interested in collaborating? Get in touch to discuss your next
            project.
          </p>
          <motion.button
            className="px-6 py-2 text-sm font-light text-gray-300 rounded-none border border-dashed transition-all duration-500 border-gray-600/50 hover:border-gray-500/70 hover:text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a conversation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioFeature = ({ project, index }) => {
  const isTopRow = index < 3;
  const isLeftColumn = index % 3 === 0;
  const isRightColumn = index % 3 === 2;
  const isBottomRow = index >= 3;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "flex flex-col relative group/feature transition-all duration-500 bg-transparent",
        // Dashed borders with subtle colors
        "border-r border-dashed border-gray-700/30",
        "border-b border-dashed border-gray-700/30",
        // Border conditions
        isLeftColumn && "border-l border-dashed border-gray-700/30",
        isTopRow && "border-t border-dashed border-gray-700/30",
        // Hover effects
        "hover:bg-gray-900/20 hover:border-gray-600/40"
      )}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700 pointer-events-none from-gray-800/0 to-gray-900/0 group-hover/feature:from-gray-800/5 group-hover/feature:to-gray-900/10" />

      <div className="relative z-10 p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
        {/* Icon and category */}
        <div className="mb-6">
          <motion.div
            className="mb-4 text-gray-500 transition-colors duration-300 group-hover/feature:text-gray-400"
            whileHover={{
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.5 },
            }}
          >
            {categoryIcons[project.category] || categoryIcons.default}
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-lg font-light text-white transition-colors duration-300 group-hover/feature:text-gray-100">
              {project.title}
            </h3>
            <p className="text-sm font-light leading-relaxed text-gray-500 transition-colors duration-300 group-hover/feature:text-gray-400">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Minimal metrics display */}
        {project.metrics && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(project.metrics)
                .slice(0, 2)
                .map(([metric, value]) => (
                  <div
                    key={metric}
                    className="py-2 text-center border border-dashed transition-colors duration-300 border-gray-700/20 group-hover/feature:border-gray-600/30"
                  >
                    <div className="text-xs font-light text-gray-400 transition-colors duration-300 group-hover/feature:text-gray-300">
                      {value}
                    </div>
                    <div className="mt-1 text-xs font-light text-gray-600">
                      {metric}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Minimal action indicator */}
        <div className="flex justify-between items-center">
          <motion.div
            className="flex gap-2 items-center text-gray-600 transition-colors duration-300 cursor-pointer group-hover/feature:text-gray-400"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs font-light">View details</span>
            <IconExternalLink className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
