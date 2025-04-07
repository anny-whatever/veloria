import { motion } from "framer-motion";
import {
  School,
  Check,
  Calendar,
  Users,
  BookOpen,
  BarChart3,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const SchoolManagementSystem = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Student Management",
      description:
        "Comprehensive student profiles including personal details, attendance, academic performance, and medical information.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Academic Management",
      description:
        "Organize courses, classes, and curricula with tools for assignment tracking, grading, and report card generation.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Attendance Management",
      description:
        "Automated attendance tracking with real-time reports, absence notifications, and trend analysis.",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Fee Management",
      description:
        "Streamline fee collection, generate invoices, track payments, and manage scholarships and concessions.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Reporting & Analytics",
      description:
        "Comprehensive dashboards and reports on student performance, attendance, fee collection, and other key metrics.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Security & Access Control",
      description:
        "Role-based access control ensuring data privacy and security for student and staff information.",
    },
  ];

  const benefits = [
    "Automate administrative tasks and reduce paperwork",
    "Improve communication between teachers, students, and parents",
    "Track student performance and identify areas for improvement",
    "Streamline fee collection and financial management",
    "Enhance security with digital record-keeping and backups",
    "Make data-driven decisions with comprehensive analytics",
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
  const title = "School Management System Development | Veloria";
  const description =
    "Custom school management software development services in India. Digitize administrative processes, enhance student management, and streamline academic operations with our tailored school ERP systems.";
  const keywords =
    "school management system development, school ERP software India, education management software, college management system development, student information system, academic management software";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/school-management-system"
        structuredData={getServiceSchema({
          name: "School Management System Development",
          description:
            "Custom school management software development services for digitizing educational processes and enhancing administrative efficiency.",
          slug: "school-management-system",
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
                  School Management System Development
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Digitize your educational institution with our custom-built
                  school management system designed specifically for schools and
                  colleges in India.
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
                      <School size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Comprehensive School Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our school management system is designed to handle all
                      aspects of educational institution operations, from
                      student admissions to academic management and fee
                      collection.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Student Records
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Academic Management
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Fee Collection
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Attendance Tracking
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
                Key Features of Our School Management System
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our comprehensive solution is designed to address all aspects of
                school management, from student administration to academic
                processes and financial operations.
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
                  Benefits for Your Educational Institution
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Implementing our school management system can transform your
                  operations and significantly improve administrative
                  efficiency. Here's how:
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
                      Education Statistics
                    </h3>
                    <p className="text-primary-100">
                      Why modern schools need management systems
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          68%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Reduction in administrative workload
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          82%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Schools reported improved parent engagement
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          40%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Average increase in fee collection efficiency
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          55%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Improvement in tracking student performance
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
                Our Development Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a systematic approach to develop custom school
                management systems tailored to your specific requirements.
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
                      "We start by understanding your school's specific needs, workflows, and challenges to design a tailored solution.",
                  },
                  {
                    title: "System Design",
                    description:
                      "Our experts create detailed system architecture and user interface designs based on your requirements.",
                  },
                  {
                    title: "Development",
                    description:
                      "Our developers build your custom school management system using the latest technologies and industry best practices.",
                  },
                  {
                    title: "Testing & QA",
                    description:
                      "Rigorous testing is performed to ensure the system is robust, secure, and user-friendly.",
                  },
                  {
                    title: "Deployment & Training",
                    description:
                      "We deploy the system and provide comprehensive training to your staff to ensure smooth adoption.",
                  },
                  {
                    title: "Support & Maintenance",
                    description:
                      "Our team provides ongoing support and regular updates to keep your system running optimally.",
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
              Ready to digitize your educational institution?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's discuss how our custom school management system can
              streamline your operations, enhance student management, and
              improve administrative efficiency.
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
                Have questions about our school management system? Find answers
                to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "How long does it take to develop a custom school management system?",
                  answer:
                    "The development timeline depends on the complexity and specific requirements of your institution. Typically, a fully custom school management system takes 3-6 months to develop, test, and deploy.",
                },
                {
                  question:
                    "Can your system be customized for different types of educational institutions?",
                  answer:
                    "Yes, our school management systems are highly customizable and can be tailored for various types of educational institutions including K-12 schools, colleges, universities, and coaching centers.",
                },
                {
                  question: "Is the system accessible on mobile devices?",
                  answer:
                    "Absolutely! Our school management systems are built with responsive design principles, making them accessible on desktops, tablets, and smartphones. We can also develop dedicated mobile apps for students, teachers, and parents.",
                },
                {
                  question:
                    "How do you ensure data security in the school management system?",
                  answer:
                    "We implement industry-standard security measures, including data encryption, secure authentication, role-based access controls, and regular security audits to protect sensitive student and staff information.",
                },
                {
                  question:
                    "Do you provide training and support after deployment?",
                  answer:
                    "Yes, we provide comprehensive training to your staff and ongoing technical support to ensure your system runs smoothly. We also offer maintenance packages that include regular updates and enhancements.",
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

export default SchoolManagementSystem;
