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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold">Our Development Process</h3>
        <p className="text-gray-600">
          We follow a structured approach to ensure your project is delivered on
          time and exceeds expectations.
        </p>
      </div>

      <div className="mb-12">
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 hidden md:block"
            style={{ transform: "translateX(-50%)" }}
          ></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`${
                  activeStep === step.id ? "bg-gray-50" : "bg-white"
                } rounded-xl p-6 border border-gray-200 transition-all duration-300 md:ml-16 relative`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-8 w-16 h-16 bg-${step.color}/20 rounded-full  items-center justify-center hidden md:flex`}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-${step.color} text-white flex items-center justify-center`}
                  >
                    {step.id}
                  </div>
                </div>

                <div className="flex flex-col items-start md:flex-row">
                  <div
                    className={`w-12 h-12 rounded-full bg-${step.color}/20 text-${step.color} flex items-center justify-center mb-4 md:hidden`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-grow">
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() =>
                        setActiveStep(activeStep === step.id ? null : step.id)
                      }
                    >
                      <div>
                        <div className="items-center md:flex">
                          <div
                            className={`hidden md:flex w-10 h-10 rounded-full bg-${step.color}/20 text-${step.color} items-center justify-center mr-4`}
                          >
                            {step.icon}
                          </div>
                          <h4 className="text-lg font-bold">{step.title}</h4>
                        </div>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>

                      <button
                        className={`ml-4 w-8 h-8 rounded-full flex items-center justify-center ${
                          activeStep === step.id ? "bg-gray-200" : "bg-gray-100"
                        }`}
                      >
                        {activeStep === step.id ? (
                          <span className="text-gray-500">-</span>
                        ) : (
                          <span className="text-gray-500">+</span>
                        )}
                      </button>
                    </div>

                    {activeStep === step.id && (
                      <motion.div
                        variants={detailsVariants}
                        initial="hidden"
                        animate="visible"
                        className="pl-0 mt-4 md:pl-14"
                      >
                        <div className="pt-4 border-t border-gray-200">
                          <h5 className="mb-3 font-semibold text-gray-800">
                            What happens in this stage:
                          </h5>
                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                                  {i + 1}
                                </div>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="p-6 border border-gray-200 bg-gray-50 rounded-xl">
        <div className="flex items-start">
          <Layers size={24} className="flex-shrink-0 mt-1 mr-4 text-primary" />
          <div>
            <h4 className="mb-2 text-lg font-bold">Our Client Portal</h4>
            <p className="mb-4 text-gray-600">
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
                    className="text-green-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <span>{feature}</span>
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
          className="px-8 py-3 text-white rounded-lg shadow-md bg-gradient-to-r from-primary to-secondary"
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
