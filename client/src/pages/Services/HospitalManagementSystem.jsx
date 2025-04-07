import { motion } from "framer-motion";
import {
  Building2,
  Check,
  Calendar,
  Users,
  Activity,
  BarChart3,
  CreditCard,
  ShieldCheck,
  Microscope,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const HospitalManagementSystem = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Patient Management",
      description:
        "Comprehensive patient records with medical history, diagnoses, treatments, and appointment tracking.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Appointment Scheduling",
      description:
        "Efficient scheduling system for appointments, surgeries, and consultations with automated reminders.",
    },
    {
      icon: <Activity size={24} />,
      title: "Electronic Medical Records",
      description:
        "Secure and accessible digital patient records, including test results, prescriptions, and treatment plans.",
    },
    {
      icon: <Microscope size={24} />,
      title: "Laboratory Management",
      description:
        "Track lab samples, manage test requests, record results, and generate comprehensive reports.",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Billing & Insurance",
      description:
        "Automate billing processes, manage insurance claims, and track patient payments efficiently.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Security & Compliance",
      description:
        "HIPAA-compliant security measures to protect sensitive patient data with audit trails and access controls.",
    },
  ];

  const benefits = [
    "Improve patient care quality and safety through better record-keeping",
    "Streamline administrative workflows and reduce operational costs",
    "Enhance interdepartmental communication and coordination",
    "Optimize resource allocation including staff scheduling and bed management",
    "Increase revenue through efficient billing and reduced claim rejections",
    "Meet regulatory compliance requirements with comprehensive reporting",
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
  const title = "Hospital Management System Development | Veloria";
  const description =
    "Custom hospital management software development services in India. Streamline healthcare operations, enhance patient care, and improve clinical efficiency with our tailored hospital management systems.";
  const keywords =
    "hospital management system development, clinic management software development, healthcare management software, medical practice management system, EHR system, electronic health records, patient information system";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/hospital-management-system"
        structuredData={getServiceSchema({
          name: "Hospital Management System Development",
          description:
            "Custom hospital management software development services for streamlining healthcare operations and enhancing patient care experiences.",
          slug: "hospital-management-system",
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
                  Hospital Management System Development
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Optimize your healthcare facility with our custom-built
                  hospital management system designed specifically for hospitals
                  and clinics in India.
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
                      <Building2 size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Comprehensive Healthcare Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our hospital management system is designed to handle all
                      aspects of healthcare operations, from patient records and
                      appointments to billing and inventory management.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Patient Records
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Appointment Scheduling
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Billing & Insurance
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Pharmacy Management
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
                Key Features of Our Hospital Management System
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our comprehensive solution is designed to address all aspects of
                healthcare management, from patient care to administrative
                operations and financial processes.
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
                  Benefits for Your Healthcare Facility
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Implementing our hospital management system can transform your
                  operations and significantly improve patient care outcomes.
                  Here's how:
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
                      Healthcare Statistics
                    </h3>
                    <p className="text-primary-100">
                      Why modern healthcare facilities need management systems
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          42%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Reduction in administrative workload
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          76%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Hospitals reported improved patient outcomes
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          38%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Average reduction in billing errors
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          62%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Improvement in resource utilization
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
                We follow a systematic approach to develop custom hospital
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
                      "We start by understanding your healthcare facility's specific needs, workflows, and challenges to design a tailored solution.",
                  },
                  {
                    title: "System Design",
                    description:
                      "Our experts create detailed system architecture and user interface designs based on your requirements and healthcare standards.",
                  },
                  {
                    title: "Development",
                    description:
                      "Our developers build your custom hospital management system using the latest technologies, ensuring security and compliance.",
                  },
                  {
                    title: "Testing & QA",
                    description:
                      "Rigorous testing is performed to ensure the system is robust, secure, user-friendly, and meets all healthcare regulations.",
                  },
                  {
                    title: "Deployment & Training",
                    description:
                      "We deploy the system and provide comprehensive training to your medical and administrative staff to ensure smooth adoption.",
                  },
                  {
                    title: "Support & Maintenance",
                    description:
                      "Our team provides ongoing support and regular updates to keep your system running optimally and compliant with evolving regulations.",
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
              Ready to transform your healthcare operations?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's discuss how our custom hospital management system can
              streamline your operations, enhance patient care, and improve
              healthcare outcomes.
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
                Have questions about our hospital management system? Find
                answers to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "How does your hospital management system ensure data security and patient privacy?",
                  answer:
                    "Our hospital management system implements multiple layers of security including data encryption, role-based access controls, audit trails, and regular security assessments. We ensure compliance with healthcare regulations like HIPAA and maintain patient data confidentiality.",
                },
                {
                  question:
                    "Can your system integrate with existing medical equipment and software?",
                  answer:
                    "Yes, our system is built with integration capabilities to connect with various medical devices, laboratory equipment, radiology information systems, and other healthcare software through industry-standard protocols like HL7, DICOM, and APIs.",
                },
                {
                  question:
                    "How long does it take to implement a hospital management system?",
                  answer:
                    "Implementation timelines vary based on the size of your facility and the complexity of requirements. Typically, a full hospital management system deployment takes 4-8 months, including customization, data migration, testing, and staff training.",
                },
                {
                  question:
                    "Is the system accessible on mobile devices for doctors and staff?",
                  answer:
                    "Yes, our hospital management system features responsive web interfaces and dedicated mobile apps that allow healthcare providers to access patient information, update records, and manage appointments from their smartphones or tablets, enhancing care delivery flexibility.",
                },
                {
                  question:
                    "Do you provide training and ongoing support for the system?",
                  answer:
                    "Yes, we provide comprehensive training for all user roles including administrative staff, nurses, doctors, and IT personnel. We also offer ongoing support through multiple channels including phone, email, and remote assistance, with service level agreements to ensure system reliability.",
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

export default HospitalManagementSystem;
