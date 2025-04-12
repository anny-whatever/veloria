import { motion } from "framer-motion";
import {
  LayoutGrid,
  Check,
  Cog,
  BarChart3,
  Users,
  ShieldCheck,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Box,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const ERPSystem = () => {
  const features = [
    {
      icon: <LayoutGrid size={24} />,
      title: "Modular Architecture",
      description:
        "Customizable modules for finance, HR, inventory, procurement, manufacturing, and more to fit your specific business needs.",
    },
    {
      icon: <ClipboardList size={24} />,
      title: "Resource Planning",
      description:
        "Optimize resource allocation across departments with powerful planning tools and forecasting capabilities.",
    },
    {
      icon: <DollarSign size={24} />,
      title: "Financial Management",
      description:
        "Comprehensive financial tools including general ledger, accounts payable/receivable, budgeting, and tax management.",
    },
    {
      icon: <Box size={24} />,
      title: "Inventory & Supply Chain",
      description:
        "Real-time inventory tracking, procurement automation, supplier management, and logistics optimization.",
    },
    {
      icon: <Users size={24} />,
      title: "Human Resources",
      description:
        "Complete employee lifecycle management with recruitment, onboarding, payroll, benefits, and performance tracking.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Business Intelligence",
      description:
        "Advanced reporting and analytics with customizable dashboards, KPIs, and data visualization tools.",
    },
  ];

  const benefits = [
    "Streamline operations across all departments in a single integrated system",
    "Enhance decision-making with real-time data and comprehensive analytics",
    "Reduce operational costs through process automation and optimization",
    "Improve collaboration and information sharing across your organization",
    "Scale your business with a flexible system that grows with your needs",
    "Ensure regulatory compliance with built-in controls and audit trails",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // SEO metadata
  const title =
    "ERP Development Services | Enterprise Resource Planning Systems | Veloria";
  const description =
    "Professional ERP development services creating integrated enterprise resource planning systems that streamline operations, improve efficiency and enable data-driven decisions.";
  const keywords =
    "erp development services, enterprise resource planning systems, business management software, erp solutions, custom erp development, integrated business systems, erp implementation";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/erp-system"
        structuredData={getServiceSchema({
          name: "ERP Development Services",
          description:
            "Professional ERP development services creating custom enterprise resource planning systems that integrate core business processes and enhance operational efficiency.",
          slug: "erp-system",
        })}
      />

      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-100 dark:to-dark-300 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ERP Development Services
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Transform your business operations with our custom-built
                  Enterprise Resource Planning systems that integrate core
                  processes and drive operational excellence.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <a
                    href="/get-started"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    Get Started
                  </a>
                  <a
                    href="/contact"
                    className="bg-white dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-400 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </div>
              <div className="lg:w-1/2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="bg-white dark:bg-dark-300 rounded-2xl shadow-xl p-6 relative z-10">
                    <div className="text-primary-500 dark:text-primary-400 mb-4">
                      <LayoutGrid size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Comprehensive Business Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our ERP system integrates all core business processes into
                      a single unified system, enabling efficient operations and
                      informed decision-making.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Financial Management
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Supply Chain
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Human Resources
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Business Intelligence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-100 dark:bg-primary-900/20 rounded-2xl -z-10"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Enterprise Resource Planning System Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our comprehensive ERP solution integrates all critical business
                functions into a single, cohesive system tailored to your
                organizational needs and industry requirements.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                >
                  <div className="text-primary-500 dark:text-primary-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Benefits for Your Enterprise
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Implementing our ERP system can transform your business
                  operations and significantly improve efficiency and
                  decision-making. Here's how:
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-primary-500 dark:bg-primary-600 rounded-full p-1 text-white mt-0.5">
                        <Check size={16} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <motion.div
                  className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary-600 dark:bg-primary-700 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">ERP Impact</h3>
                    <p className="text-primary-100">
                      How ERP systems transform business operations
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          32%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Average reduction in operational costs
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          65%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Improvement in business process efficiency
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          45%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Reduction in data redundancy and errors
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          78%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Of businesses report improved decision-making
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our ERP Implementation Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a systematic approach to develop and implement custom
                ERP solutions tailored to your specific business requirements.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Business Analysis",
                    description:
                      "We begin by analyzing your business processes, challenges, and objectives to identify how an ERP can best support your organizational needs.",
                  },
                  {
                    title: "System Design",
                    description:
                      "Our experts design a comprehensive ERP architecture with the necessary modules and integrations based on your specific requirements.",
                  },
                  {
                    title: "Development",
                    description:
                      "We develop your custom ERP solution using modern technologies, focusing on performance, scalability, and user experience.",
                  },
                  {
                    title: "Data Migration",
                    description:
                      "We carefully migrate your existing data to the new system, ensuring data integrity and proper validation throughout the process.",
                  },
                  {
                    title: "Testing & Training",
                    description:
                      "Rigorous testing ensures the system works flawlessly, while comprehensive training prepares your team to use the new ERP effectively.",
                  },
                  {
                    title: "Deployment & Support",
                    description:
                      "We manage the go-live process and provide ongoing technical support, updates, and enhancements to ensure your ERP continues to meet your evolving needs.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col md:flex-row items-center md:items-start gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div
                      className={`md:w-1/2 flex ${
                        index % 2 === 0 ? "md:justify-end" : "md:order-last"
                      }`}
                    >
                      <div className="bg-white dark:bg-dark-300 p-6 rounded-xl shadow-lg max-w-md">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline marker */}
                    <div className="absolute left-[50%] transform -translate-x-1/2 -translate-y-1/3 hidden md:block">
                      <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary-600 dark:bg-primary-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to transform your business operations?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's discuss how our custom ERP solution can streamline your
              processes, reduce costs, and provide the insights needed for
              informed decision-making.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/get-started"
                className="bg-white text-primary-600 hover:text-primary-700 px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Get Started
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Have questions about our ERP development services? Find answers
                to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "What industries benefit most from your ERP development services?",
                  answer:
                    "Our ERP development services benefit a wide range of industries including manufacturing, retail, distribution, healthcare, education, professional services, and construction. Each industry has unique operational challenges that our customizable ERP solutions can address. We tailor our enterprise resource planning systems to the specific workflows, compliance requirements, and reporting needs of your industry, providing comprehensive business management tools that integrate all critical functions.",
                },
                {
                  question:
                    "What modules are included in your ERP development solutions?",
                  answer:
                    "Our ERP development solutions feature a modular architecture allowing you to select components based on your business needs. Core modules include financial management (accounting, billing, budgeting), inventory and supply chain management, human resources and payroll, customer relationship management, manufacturing and production planning, project management, and business intelligence with reporting dashboards. Each module can be customized and additional industry-specific modules can be developed.",
                },
                {
                  question:
                    "How do your ERP systems improve business operations?",
                  answer:
                    "Our enterprise resource planning systems improve business operations by centralizing data, automating routine tasks, eliminating data silos, and providing real-time insights. This leads to increased efficiency, reduced operational costs, improved data accuracy, better inventory management, enhanced financial control, streamlined compliance, and more informed decision-making. Most clients report 20-30% improvement in operational efficiency after implementing our ERP solutions.",
                },
                {
                  question:
                    "Can your ERP systems integrate with existing software?",
                  answer:
                    "Yes, our ERP systems are designed with comprehensive integration capabilities. We can build custom integrations with your existing software including accounting systems, CRM platforms, e-commerce solutions, manufacturing systems, warehouse management tools, and any industry-specific applications. This creates a unified ecosystem where data flows seamlessly between systems, providing a complete view of your business operations while preserving your existing technology investments.",
                },
                {
                  question:
                    "What support do you provide for ERP implementation?",
                  answer:
                    "We offer comprehensive support throughout the ERP implementation process and beyond. This includes system planning and architecture, data migration, user training programs, go-live assistance, and ongoing technical support. We also provide regular maintenance, performance optimization, security updates, and system enhancements to ensure your ERP solution continues to meet your evolving business needs. Our support packages can be customized based on your specific requirements.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ERPSystem;
