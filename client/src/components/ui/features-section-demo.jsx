import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  IconCode,
  IconRocket,
  IconShield,
  IconDatabase,
  IconCloud,
  IconBrandGithub,
  IconBrain,
  IconServer,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Enterprise Architecture",
      description:
        "Built for scale with microservices, auto-scaling, and enterprise-grade security compliance.",
      icon: <IconServer className="w-5 h-5" />,
    },
    {
      title: "AI-Native Development",
      description:
        "Integrated AI/ML capabilities with custom models, vector databases, and intelligent automation.",
      icon: <IconBrain className="w-5 h-5" />,
    },
    {
      title: "Production Ready",
      description:
        "99.9% uptime SLA, comprehensive monitoring, and zero-downtime deployment strategies.",
      icon: <IconRocket className="w-5 h-5" />,
    },
    {
      title: "Security First",
      description:
        "SOC2 compliant, end-to-end encryption, and enterprise security protocols.",
      icon: <IconShield className="w-5 h-5" />,
    },
    {
      title: "Scalable Infrastructure",
      description:
        "Kubernetes orchestration, auto-scaling, and multi-region deployment capabilities.",
      icon: <IconCloud className="w-5 h-5" />,
    },
    {
      title: "Open Source Ready",
      description:
        "Transparent development with open-source contributions and technical documentation.",
      icon: <IconBrandGithub className="w-5 h-5" />,
    },
    {
      title: "Performance Optimized",
      description:
        "Sub-100ms response times, intelligent caching, and database optimization strategies.",
      icon: <IconDatabase className="w-5 h-5" />,
    },
    {
      title: "Developer Experience",
      description:
        "Clean code architecture, comprehensive testing, and maintainable codebases.",
      icon: <IconCode className="w-5 h-5" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-6xl mx-auto gap-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  const isTopRow = index < 4;
  const isLeftColumn = index === 0 || index === 4;
  const isRightColumn = index === 3 || index === 7;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "flex flex-col relative group/feature transition-all duration-500 bg-transparent",
        // Dashed borders with subtle colors
        "border-r border-dashed border-gray-700/25",
        "border-b border-dashed border-gray-700/25",
        // Border conditions
        isLeftColumn && "border-l border-dashed border-gray-700/25",
        isTopRow && "border-t border-dashed border-gray-700/25",
        // Hover effects
        "hover:bg-gray-900/10 hover:border-gray-600/35"
      )}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/0 to-gray-900/0 group-hover/feature:from-gray-800/3 group-hover/feature:to-gray-900/8 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 p-8 md:p-10 min-h-[240px] flex flex-col justify-between">
        {/* Icon and title */}
        <div className="mb-6">
          <motion.div
            className="mb-4 text-gray-500 group-hover/feature:text-gray-400 transition-colors duration-300"
            whileHover={{
              rotate: [0, -8, 8, 0],
              transition: { duration: 0.4 },
            }}
          >
            {icon}
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-base font-light text-white group-hover/feature:text-gray-100 transition-colors duration-300 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed group-hover/feature:text-gray-400 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Minimal accent indicator */}
        <div className="flex items-center justify-end">
          <motion.div
            className="w-6 h-px bg-gray-700/50 group-hover/feature:bg-gray-500/70 transition-colors duration-300"
            whileHover={{ scaleX: 1.3 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
