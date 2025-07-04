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
      className="grid relative z-10 grid-cols-1 gap-0 mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-4"
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
      <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700 pointer-events-none from-gray-800/0 to-gray-900/0 group-hover/feature:from-gray-800/3 group-hover/feature:to-gray-900/8" />

      <div className="relative z-10 p-8 md:p-10 min-h-[240px] flex flex-col justify-between">
        {/* Icon and title */}
        <div className="mb-6">
          <div className="mb-4 text-gray-500 transition-colors duration-300 group-hover/feature:text-gray-400">
            {icon}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-light leading-snug text-white transition-colors duration-300 group-hover/feature:text-gray-100">
              {title}
            </h3>
            <p className="text-sm font-light leading-relaxed text-gray-500 transition-colors duration-300 group-hover/feature:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        {/* Minimal accent indicator */}
        <div className="flex justify-end items-center">
          <motion.div
            className="w-6 h-px transition-colors duration-300 bg-gray-700/50 group-hover/feature:bg-gray-500/70"
            whileHover={{ scaleX: 1.3 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
