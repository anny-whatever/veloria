import { motion } from "framer-motion";
import {
  Code,
  Check,
  Settings,
  LayoutGrid,
  Lock,
  Database,
  RefreshCw,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const CustomSoftwareDevelopment = () => {
  const features = [
    {
      icon: <Settings size={24} />,
      title: "Tailored Solutions",
      description:
        "Custom-built software designed specifically to address your unique business challenges and requirements.",
    },
    {
      icon: <LayoutGrid size={24} />,
      title: "Scalable Architecture",
      description:
        "Robust, flexible software architecture that grows with your business needs and adapts to changing requirements.",
    },
    {
      icon: <Code size={24} />,
      title: "Clean Code Practices",
      description:
        "Modern development methodologies and clean code practices that ensure maintainability and extensibility.",
    },
    {
      icon: <Lock size={24} />,
      title: "Security By Design",
      description:
        "Built-in security measures from the ground up, protecting sensitive data and ensuring compliance with regulations.",
    },
    {
      icon: <Database size={24} />,
      title: "Data Integration",
      description:
        "Seamless integration with existing systems, databases, and third-party applications to create a unified ecosystem.",
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Iterative Development",
      description:
        "Agile approach with regular updates, feedback integration, and continuous improvement throughout the development lifecycle.",
    },
  ];

  const benefits = [
    "Precise alignment with your specific business requirements",
    "Enhanced operational efficiency and productivity",
    "Competitive advantage through unique software capabilities",
    "Full ownership and control over your software assets",
    "Lower long-term costs compared to off-the-shelf solutions",
    "Flexibility to adapt and evolve with changing business needs",
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
  const title = "Custom Software Development Services | Veloria";
  const description =
    "Tailor-made software solutions designed specifically for your business needs. Our custom software development services drive efficiency, innovation, and growth.";
  const keywords =
    "custom software development, bespoke software solutions, tailored software, enterprise software development, custom application development, software engineering services";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/custom-software-development"
        structuredData={getServiceSchema({
          name: "Custom Software Development Services",
          description:
            "Professional custom software development services tailored to your specific business requirements, ensuring optimal performance and scalability.",
          slug: "custom-software-development",
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
                  Custom Software Development
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tailored software solutions designed specifically for your
                  unique business challenges and goals.
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
                      <Code size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Software That Works For You
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We develop custom software solutions that address your
                      specific business challenges, streamline operations, and
                      create competitive advantages.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Web Applications
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Desktop Software
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          API Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Integration Services
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
                Our Custom Software Development Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We build tailored software solutions that address your unique
                business challenges and provide a competitive edge.
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
                  Benefits of Custom Software
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Custom software solutions offer unique advantages that
                  off-the-shelf products simply cannot match.
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
                    <h3 className="text-2xl font-bold mb-2">
                      Custom vs. Off-the-Shelf
                    </h3>
                    <p className="text-primary-100">
                      Why custom software provides better value
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-1/2">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                            Custom Software
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Check className="text-green-500" size={16} />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Tailored to your needs
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="text-green-500" size={16} />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Full ownership
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="text-green-500" size={16} />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Competitive advantage
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="text-green-500" size={16} />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Scales with your business
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                            Off-the-Shelf
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <span className="text-red-500 text-xl font-bold leading-none">
                                ×
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                One-size-fits-all approach
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-red-500 text-xl font-bold leading-none">
                                ×
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Subscription/license fees
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-red-500 text-xl font-bold leading-none">
                                ×
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Same features as competitors
                              </span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-red-500 text-xl font-bold leading-none">
                                ×
                              </span>
                              <span className="text-gray-600 dark:text-gray-300 text-sm">
                                Limited customization
                              </span>
                            </li>
                          </ul>
                        </div>
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
                Our Development Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a systematic approach to deliver high-quality custom
                software that meets your specific requirements.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Discovery & Analysis",
                    description:
                      "We work closely with you to understand your business processes, challenges, and requirements to define the scope of your software project.",
                  },
                  {
                    title: "Planning & Design",
                    description:
                      "Our team creates detailed specifications, wireframes, and technical architecture to ensure the solution aligns perfectly with your needs.",
                  },
                  {
                    title: "Development",
                    description:
                      "We build your custom software following agile methodologies, with regular iterations and continuous feedback integration.",
                  },
                  {
                    title: "Testing & QA",
                    description:
                      "Rigorous testing ensures your software is bug-free, secure, and performs optimally under all conditions.",
                  },
                  {
                    title: "Deployment",
                    description:
                      "We handle the smooth implementation of your software, including data migration, integration, and staff training.",
                  },
                  {
                    title: "Maintenance & Support",
                    description:
                      "Our team provides ongoing support, updates, and enhancements to ensure your software continues to meet your evolving business needs.",
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
              Ready to build your custom software?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's create a tailored solution that addresses your specific
              business challenges and drives growth.
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
                Have questions about custom software development? Find answers
                to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How much does custom software development cost?",
                  answer:
                    "The cost of custom software development varies widely depending on factors such as complexity, features, integrations, and timeline. Simple applications might start at $20,000-$50,000, while enterprise-level solutions can range from $100,000 to $500,000 or more. We provide detailed estimates after understanding your specific requirements during our discovery phase.",
                },
                {
                  question: "How long does it take to develop custom software?",
                  answer:
                    "Development timelines depend on project scope and complexity. Small to medium projects typically take 3-6 months, while larger enterprise systems might require 6-12 months or more. Our agile development approach allows for incremental delivery, so you'll see working components throughout the development process rather than waiting until the very end.",
                },
                {
                  question:
                    "What technologies do you use for custom software development?",
                  answer:
                    "We select technologies based on your specific project requirements. For web applications, we commonly use frameworks like React, Angular, or Vue.js for front-end, and Node.js, Python, or .NET for back-end development. For database solutions, we work with SQL options like PostgreSQL and MySQL, as well as NoSQL databases like MongoDB. We're technology-agnostic and choose the best tools for your specific needs.",
                },
                {
                  question:
                    "Do you provide ongoing maintenance for custom software?",
                  answer:
                    "Yes, we offer comprehensive maintenance and support services for the software we develop. This includes bug fixes, security updates, performance optimization, feature enhancements, and technical support. We provide flexible support packages tailored to your needs, from basic maintenance to full 24/7 support options.",
                },
                {
                  question:
                    "Can you integrate custom software with our existing systems?",
                  answer:
                    "Absolutely. One of the major advantages of custom software is the ability to integrate seamlessly with your existing systems and workflows. We have extensive experience developing APIs and integration solutions that connect with CRMs, ERPs, accounting software, payment gateways, and various third-party services. We ensure data flows smoothly between systems to create a unified ecosystem.",
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

      <Footer />
    </div>
  );
};

export default CustomSoftwareDevelopment;
