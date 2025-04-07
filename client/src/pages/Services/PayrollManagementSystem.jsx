import { motion } from "framer-motion";
import {
  DollarSign,
  Check,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Lock,
  Users,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const PayrollManagementSystem = () => {
  const features = [
    {
      icon: <Calendar size={24} />,
      title: "Automated Payroll Processing",
      description:
        "Streamline payroll calculations with automated processing that handles salaries, taxes, deductions, and benefits with precision and compliance.",
    },
    {
      icon: <FileText size={24} />,
      title: "Tax Compliance Management",
      description:
        "Stay compliant with all tax regulations with automatic tax calculations, filing reminders, and up-to-date tax tables for multiple jurisdictions.",
    },
    {
      icon: <Users size={24} />,
      title: "Employee Self-Service Portal",
      description:
        "Empower employees with self-service access to pay stubs, tax documents, benefit information, and leave requests through a secure portal.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Payroll Analytics & Reporting",
      description:
        "Gain valuable insights into labor costs, department spending, and payroll trends with comprehensive reporting and analytics tools.",
    },
    {
      icon: <Clock size={24} />,
      title: "Time & Attendance Integration",
      description:
        "Seamlessly integrate with time tracking systems to automatically calculate wages based on hours worked, overtime, and shift differentials.",
    },
    {
      icon: <Lock size={24} />,
      title: "Secure Data Management",
      description:
        "Protect sensitive payroll data with enterprise-grade security features, role-based access controls, and data encryption for all personal information.",
    },
  ];

  const benefits = [
    "Reduce payroll processing time by up to 80%",
    "Minimize errors and compliance risks",
    "Improve employee satisfaction with accurate and timely payments",
    "Gain real-time visibility into labor costs",
    "Simplify tax filing and regulatory compliance",
    "Save money by reducing payroll administration costs",
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
  const title = "Payroll Management System | Veloria";
  const description =
    "Streamline your payroll operations with our comprehensive Payroll Management System. Automate calculations, ensure compliance, and provide employee self-service.";
  const keywords =
    "payroll management system, automated payroll processing, payroll software, tax compliance, employee self-service, payroll reporting, time and attendance integration";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/payroll-management-system"
        structuredData={getServiceSchema({
          name: "Payroll Management System",
          description:
            "Comprehensive payroll management solution that automates calculations, ensures tax compliance, and provides employee self-service capabilities.",
          slug: "payroll-management-system",
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
                  Payroll Management System
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Automate and streamline your payroll operations with a
                  comprehensive system designed for accuracy, compliance, and
                  efficiency.
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
                      <DollarSign size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Simplified Payroll Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our Payroll Management System automates complex
                      calculations, ensures compliance, and provides a seamless
                      experience for both administrators and employees.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Automated Processing
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Tax Compliance
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Employee Self-Service
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Detailed Reporting
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
                Comprehensive Payroll System Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our Payroll Management System includes everything you need to
                simplify payroll processing and ensure compliance.
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
                  Benefits of Our Payroll System
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Implementing our Payroll Management System brings numerous
                  advantages to your organization.
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
                      Payroll Efficiency Metrics
                    </h3>
                    <p className="text-primary-100">
                      How our system improves your operations
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          80%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Reduction in processing time
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          99.9%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Accuracy in calculations
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          30%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Reduction in admin costs
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          100%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Tax compliance
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
                Implementation Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a structured approach to implement our Payroll
                Management System in your organization.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Requirements Analysis",
                    description:
                      "We analyze your existing payroll processes, compliance requirements, and specific needs to customize the solution.",
                  },
                  {
                    title: "System Configuration",
                    description:
                      "Our team configures the system with your tax settings, pay structures, deductions, and company policies.",
                  },
                  {
                    title: "Data Migration",
                    description:
                      "We securely migrate employee data, salary information, and historical payroll records to the new system.",
                  },
                  {
                    title: "Testing & Validation",
                    description:
                      "Rigorous testing of all calculations, tax rules, and processes to ensure accuracy and compliance.",
                  },
                  {
                    title: "Training & Deployment",
                    description:
                      "We train your staff on using the system and deploy it with parallel runs to ensure a smooth transition.",
                  },
                  {
                    title: "Ongoing Support",
                    description:
                      "Our team provides continuous support, updates for tax law changes, and regular system enhancements.",
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
              Ready to modernize your payroll operations?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's implement a Payroll Management System that saves time,
              reduces errors, and ensures compliance.
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
                Have questions about our Payroll Management System? Find answers
                to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "Can your system handle multiple tax jurisdictions?",
                  answer:
                    "Yes, our Payroll Management System is designed to handle multiple tax jurisdictions, including federal, state, and local taxes. The system automatically applies the correct tax rates based on employee location, and stays updated with changing tax laws and regulations. This ensures accurate tax calculations and compliance across different regions where your employees may be located.",
                },
                {
                  question:
                    "How does the system handle different types of employees?",
                  answer:
                    "Our system accommodates various employment types including full-time, part-time, contract, and temporary workers. It manages different pay structures such as hourly, salaried, commission-based, and mixed compensation models. The system also handles different benefit eligibility rules, tax situations, and reporting requirements for each employee type, ensuring accurate processing regardless of employment classification.",
                },
                {
                  question:
                    "Is the system compliant with labor laws and regulations?",
                  answer:
                    "Absolutely. Our Payroll Management System is built with compliance at its core. It stays current with changing labor laws, tax regulations, and reporting requirements. The system helps ensure compliance with regulations such as FLSA, ACA, FMLA, and various state-specific labor laws. Regular updates are provided to address regulatory changes, helping you avoid costly penalties and compliance issues.",
                },
                {
                  question: "Can employees access their payroll information?",
                  answer:
                    "Yes, the system includes a secure employee self-service portal where workers can access their pay stubs, W-2 forms, tax withholding information, and benefit details. Employees can update their personal information, adjust tax withholdings, manage direct deposit accounts, and view their payroll history. This reduces administrative workload while giving employees 24/7 access to their important payroll information.",
                },
                {
                  question: "How secure is the payroll data in your system?",
                  answer:
                    "Security is a top priority in our Payroll Management System. We implement multiple layers of protection including data encryption, secure authentication with multi-factor options, role-based access controls, audit trails, and regular security updates. The system complies with data protection regulations and industry best practices. All sensitive information is encrypted both in transit and at rest, and we conduct regular security assessments to identify and address potential vulnerabilities.",
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

export default PayrollManagementSystem;
