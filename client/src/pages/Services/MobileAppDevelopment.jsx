import { motion } from "framer-motion";
import {
  Smartphone,
  Check,
  Repeat,
  Layers,
  Share2,
  ShieldCheck,
  Store,
  Github,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const MobileAppDevelopment = () => {
  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "Native App Development",
      description:
        "High-performance iOS and Android applications built specifically for each platform using Swift, Objective-C, Kotlin, and Java.",
    },
    {
      icon: <Repeat size={24} />,
      title: "Cross-Platform Development",
      description:
        "Cost-effective solutions using frameworks like React Native and Flutter to build apps that work seamlessly across different platforms.",
    },
    {
      icon: <Store size={24} />,
      title: "App Store Optimization",
      description:
        "Strategic optimization of your app for higher visibility and better rankings in the App Store and Google Play Store.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Development",
      description:
        "Implementation of industry-standard security practices to protect user data and ensure compliance with privacy regulations.",
    },
    {
      icon: <Share2 size={24} />,
      title: "API Integration",
      description:
        "Seamless integration with third-party services, payment gateways, social media platforms, and existing business systems.",
    },
    {
      icon: <Layers size={24} />,
      title: "UI/UX Design",
      description:
        "Intuitive, engaging, and visually appealing interfaces designed specifically for mobile users following platform guidelines.",
    },
  ];

  const benefits = [
    "Expand your market reach with multi-platform presence",
    "Increase customer engagement through intuitive mobile experiences",
    "Improve business efficiency with streamlined processes",
    "Generate new revenue streams through in-app purchases or subscriptions",
    "Enhance brand loyalty with personalized mobile interactions",
    "Collect valuable user data for better business decisions",
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
  const title = "Mobile App Development Services | Veloria";
  const description =
    "Professional mobile app development services in India. Build native and cross-platform applications for iOS and Android that engage users and drive business growth.";
  const keywords =
    "mobile app development, iOS app development, Android app development, cross-platform app development, React Native development, Flutter development, mobile application services";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/mobile-app-development"
        structuredData={getServiceSchema({
          name: "Mobile App Development Services",
          description:
            "Professional mobile app development services creating intuitive and engaging native and cross-platform applications for iOS and Android.",
          slug: "mobile-app-development",
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
                  Mobile App Development
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Transform your business with custom mobile applications that
                  engage users, streamline operations, and drive growth.
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
                      <Smartphone size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Powerful Mobile Solutions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We build native and cross-platform mobile applications
                      that deliver exceptional user experiences, performance,
                      and functionality.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          iOS Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Android Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Cross-Platform Apps
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Progressive Web Apps
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
                Our Mobile App Development Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We provide end-to-end mobile application development services to
                help businesses reach their target audience on any device.
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
                  Benefits of Mobile App Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Mobile applications offer numerous advantages that can help
                  your business connect with customers and drive growth.
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
                      Mobile App Stats
                    </h3>
                    <p className="text-primary-100">
                      Why businesses need mobile applications
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          6.3B
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          People use smartphones worldwide
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          90%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Mobile time spent in apps vs. browsers
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          $935B
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Mobile app market revenue by 2023
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          230B
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Annual app downloads worldwide
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
                Our App Development Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a proven development methodology to create
                high-quality mobile applications that meet your business
                objectives.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Discovery & Planning",
                    description:
                      "We analyze your business requirements, target audience, and market to create a strategic roadmap for your mobile application.",
                  },
                  {
                    title: "UI/UX Design",
                    description:
                      "Our designers create intuitive and engaging user interfaces that follow platform guidelines and deliver exceptional user experiences.",
                  },
                  {
                    title: "App Development",
                    description:
                      "Our developers build your application using the latest technologies, ensuring clean code, optimal performance, and scalability.",
                  },
                  {
                    title: "Quality Assurance",
                    description:
                      "We conduct extensive testing across devices and scenarios to ensure your app is bug-free, secure, and performs flawlessly.",
                  },
                  {
                    title: "Deployment",
                    description:
                      "We handle the submission process to app stores, ensuring compliance with guidelines and optimizing for visibility and downloads.",
                  },
                  {
                    title: "Post-Launch Support",
                    description:
                      "We provide ongoing maintenance, updates, and support to ensure your app remains compatible with new devices and OS versions.",
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
              Ready to build your mobile app?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's create a powerful mobile application that connects with your
              audience and drives business growth.
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
                Have questions about our mobile app development services? Find
                answers to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "Should I build a native app or cross-platform app?",
                  answer:
                    "This depends on your specific requirements. Native apps (built specifically for iOS or Android) offer maximum performance, access to all platform features, and the best user experience. Cross-platform apps (built with React Native, Flutter, etc.) are more cost-effective, have faster development time, and maintain a single codebase. We'll help you choose the right approach based on your budget, timeline, performance needs, and feature requirements.",
                },
                {
                  question: "How long does it take to develop a mobile app?",
                  answer:
                    "Development time varies based on complexity, features, and platforms. A simple app might take 3-4 months, while a complex app could take 6-9 months or more. The typical process includes discovery (2-3 weeks), design (3-6 weeks), development (8-16 weeks), testing (2-4 weeks), and deployment (1-2 weeks). We provide a detailed timeline after understanding your specific requirements.",
                },
                {
                  question: "What is your app development technology stack?",
                  answer:
                    "For native iOS apps, we use Swift and Objective-C. For native Android apps, we work with Kotlin and Java. For cross-platform development, we specialize in React Native and Flutter. Our backend services are built with Node.js, Python, or .NET, with databases including MongoDB, PostgreSQL, and Firebase. We select the most appropriate technologies based on your project requirements.",
                },
                {
                  question: "Do you provide app maintenance and support?",
                  answer:
                    "Yes, we offer comprehensive maintenance and support services for mobile applications. This includes bug fixes, security updates, compatibility updates for new OS versions and devices, performance optimization, feature enhancements, and technical support. We recommend ongoing maintenance to ensure your app remains competitive, secure, and provides the best possible user experience.",
                },
                {
                  question: "How do you ensure the security of mobile apps?",
                  answer:
                    "We implement multiple security measures including secure authentication (biometrics, two-factor authentication), data encryption (both in transit and at rest), secure API communication, input validation, code obfuscation, secure storage, regular security testing, and compliance with platform-specific security guidelines. We stay current with the latest security best practices and vulnerabilities to ensure your app and user data remain protected.",
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

export default MobileAppDevelopment;
