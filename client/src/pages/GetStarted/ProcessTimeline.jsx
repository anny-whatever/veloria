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
        "We discuss your requirements, goals, and budget to determine if we&apos;re a good fit for each other.",
      icon: <Coffee size={24} />,
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
      icon: <FileText size={24} />,
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
      icon: <Palette size={24} />,
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
        "Once designs are approved, we start building your website with regular progress updates.",
      icon: <Code size={24} />,
      color: "primary",
      details: [
        "Frontend development based on approved designs",
        "Backend functionality implementation",
        "Content management system setup",
        "Payment gateway integration (for e-commerce)",
        "Daily progress updates through client portal",
        "Regular check-ins and milestone reviews",
      ],
    },
    {
      id: 5,
      title: "Testing & Refinement",
      description:
        "We thoroughly test your website to ensure everything works flawlessly.",
      icon: <CheckCircle size={24} />,
      color: "secondary",
      details: [
        "Comprehensive quality assurance testing",
        "Cross-browser and cross-device compatibility checks",
        "Performance optimization",
        "Security testing",
        "Content review and spell-checking",
        "Client review and final adjustments",
      ],
    },
    {
      id: 6,
      title: "Launch",
      description:
        "We deploy your website to your domain and provide training on how to use it.",
      icon: <Rocket size={24} />,
      color: "accent",
      details: [
        "Domain and hosting setup",
        "Website deployment",
        "Final checks in live environment",
        "Training session on content management system",
        "Documentation and user guides provided",
        "Google Search Console and Analytics setup",
      ],
    },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 dark:text-white">Our Process</h3>
        <p className="text-gray-600 dark:text-gray-300">
          We follow a structured approach to deliver quality websites on time.
        </p>
      </div>

      <div className="relative mb-10">
        {/* Timeline line */}
        <div className="absolute h-full w-1 bg-gray-300 dark:bg-gray-700 left-6 top-0"></div>

        {/* Timeline steps */}
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="mb-6 relative z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex">
              {/* Step indicator */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step.color === "primary"
                    ? "bg-primary-600 dark:bg-primary-500"
                    : step.color === "secondary"
                    ? "bg-secondary-600 dark:bg-secondary-500"
                    : "bg-accent-600 dark:bg-accent-500"
                } text-white z-10 flex-shrink-0 shadow-lg`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                {step.icon}
              </div>

              {/* Step content */}
              <div
                className={`ml-6 bg-white dark:bg-dark-200 rounded-lg border-2 ${
                  activeStep === step.id
                    ? step.color === "primary"
                      ? "border-primary-600 dark:border-primary-500"
                      : step.color === "secondary"
                      ? "border-secondary-600 dark:border-secondary-500"
                      : "border-accent-600 dark:border-accent-500"
                    : "border-gray-300 dark:border-gray-700"
                } flex-grow hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer`}
                onClick={() =>
                  setActiveStep(activeStep === step.id ? null : step.id)
                }
              >
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                      {index + 1}. {step.title}
                    </h4>
                    <span
                      className={`${
                        step.color === "primary"
                          ? "text-primary-600 dark:text-primary-400"
                          : step.color === "secondary"
                          ? "text-secondary-600 dark:text-secondary-400"
                          : "text-accent-600 dark:text-accent-400"
                      } text-sm font-medium`}
                    >
                      {activeStep === step.id
                        ? "Click to collapse"
                        : "Click to see details"}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    {step.description}
                  </p>

                  {/* Expanded details */}
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 pt-4 border-t border-gray-300 dark:border-gray-700`}
                    >
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle
                              size={18}
                              className={`${
                                step.color === "primary"
                                  ? "text-primary-600 dark:text-primary-400"
                                  : step.color === "secondary"
                                  ? "text-secondary-600 dark:text-secondary-400"
                                  : "text-accent-600 dark:text-accent-400"
                              } mt-0.5 mr-3 flex-shrink-0`}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-300 rounded-xl">
        <div className="flex items-start">
          <Layers
            size={24}
            className="flex-shrink-0 mt-1 mr-4 text-primary dark:text-primary-400"
          />
          <div>
            <h4 className="mb-2 text-lg font-bold dark:text-white">
              Our Client Portal
            </h4>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Once your project begins, you'll get access to our client portal
              where you can:
            </p>
            <ul className="space-y-2">
              {[
                "Track the daily progress of your website development",
                "View and approve design mockups",
                "Communicate directly with your project manager",
                "Upload and manage content and assets",
                "Review project milestones and timelines",
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle
                    size={18}
                    className="text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span className="dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-white rounded-lg shadow-md bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400"
          onClick={() => setActiveSection("form")}
        >
          <div className="flex items-center">
            <MessageSquare size={20} className="mr-2" />
            <span>Start Your Project Now</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default ProcessTimeline;
