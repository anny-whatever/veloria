// src/pages/GetStarted/ProcessTimeline.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  MessageSquare,
  FileText,
  Layers,
} from "lucide-react";

const ProcessTimeline = ({ setActiveSection }) => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      description:
        "We discuss your requirements, goals, and budget to determine if we're a good fit for each other.",
      icon: <Coffee size={20} />,
      color: "primary",
      details: [
        "In-depth discussion about your project needs and vision",
        "Analysis of your target audience and business goals",
        "Budget and timeline expectation setting",
        "Quote provided on-spot or within 24 hours for complex projects",
      ],
    },
    {
      id: 2,
      title: "Project Planning",
      description:
        "We collect all necessary assets and information to create a detailed project plan.",
      icon: <FileText size={20} />,
      color: "secondary",
      details: [
        "Brand assets collection (logos, images, content)",
        "Color palette selection",
        "Font style preferences",
        "Template examples to decide on layout preferences",
        "Detailed specification document creation",
        "Wireframe development for key pages",
      ],
    },
    {
      id: 3,
      title: "Design Phase",
      description:
        "Based on your preferences, we create beautiful design mockups for your approval.",
      icon: <Palette size={20} />,
      color: "accent",
      details: [
        "Initial design concepts presented",
        "Interactive mockups for key pages",
        "Collaborative feedback and revisions (up to 3 rounds)",
        "Final design approval before development begins",
        "Responsive designs for mobile, tablet and desktop",
      ],
    },
    {
      id: 4,
      title: "Development",
      description:
        "Our developers build your website or application using the latest technologies.",
      icon: <Code size={20} />,
      color: "primary",
      details: [
        "Clean, semantic code development",
        "SEO optimization built-in",
        "Cross-browser compatibility testing",
        "Performance optimization",
        "Security best practices implementation",
        "Mobile-first responsive development",
      ],
    },
    {
      id: 5,
      title: "Testing & QA",
      description:
        "Thorough testing to ensure everything works perfectly across all devices and browsers.",
      icon: <CheckCircle size={20} />,
      color: "secondary",
      details: [
        "Cross-browser compatibility testing",
        "Mobile responsiveness testing",
        "Performance and speed optimization",
        "Security vulnerability testing",
        "User experience testing",
        "Final client review and approval",
      ],
    },
    {
      id: 6,
      title: "Launch & Support",
      description:
        "We deploy your project and provide ongoing support to ensure smooth operations.",
      icon: <Rocket size={20} />,
      color: "accent",
      details: [
        "Domain and hosting setup",
        "SSL certificate installation",
        "Production deployment",
        "Post-launch monitoring",
        "1 year of free hosting included",
        "Ongoing maintenance and support options",
      ],
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case "primary":
        return "bg-gray-600 hover:bg-gray-500";
      case "secondary":
        return "bg-gray-700 hover:bg-gray-600";
      case "accent":
        return "bg-gray-500 hover:bg-gray-400";
      default:
        return "bg-gray-600 hover:bg-gray-500";
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-gray-600" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-6">
              {/* Step indicator */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(
                  step.color
                )} text-white z-10 flex-shrink-0 transition-all duration-300 cursor-pointer`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                {step.icon}
              </div>

              {/* Step content */}
              <div
                className={`flex-grow cursor-pointer transition-all duration-300 ${
                  activeStep === step.id ? "text-white" : "text-gray-300"
                }`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                <div className="mb-2">
                  <h3 className="text-lg font-light mb-1">{step.title}</h3>
                  <div className="w-8 h-px bg-gray-600" />
                </div>
                <p className="text-sm font-light text-gray-400 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Expandable details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeStep === step.id ? "auto" : 0,
                    opacity: activeStep === step.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: activeStep === step.id ? 1 : 0,
                          x: activeStep === step.id ? 0 : -10,
                        }}
                        transition={{
                          delay: activeStep === step.id ? detailIndex * 0.1 : 0,
                          duration: 0.3,
                        }}
                      >
                        <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm font-light text-gray-400 leading-relaxed">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-12 pt-8 border-t border-gray-800 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-light text-white mb-2">
            Ready to Start Your Project?
          </h3>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={() => setActiveSection("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-light transition-all duration-300 hover:bg-gray-100"
          >
            <MessageSquare size={16} />
            <span>Get Started</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveSection("booking")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-light transition-all duration-300 hover:bg-gray-700 border border-gray-700"
          >
            <Coffee size={16} />
            <span>Book a Call</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessTimeline;
