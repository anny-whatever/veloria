import { motion } from "framer-motion";
import {
  Monitor,
  Check,
  Code,
  Layers,
  BarChart3,
  Zap,
  Globe,
  Server,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const WebDevelopment = () => {
  const features = [
    {
      icon: <Code size={24} />,
      title: "Custom Website Development",
      description:
        "Tailor-made websites built from scratch to meet your specific business requirements with clean, efficient code.",
    },
    {
      icon: <Globe size={24} />,
      title: "Responsive Web Design",
      description:
        "Websites that adapt seamlessly to all devices and screen sizes, ensuring optimal user experience on desktop, tablet, and mobile.",
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimization",
      description:
        "High-speed websites with optimized loading times, efficient code, and streamlined assets for maximum performance.",
    },
    {
      icon: <Layers size={24} />,
      title: "CMS Integration",
      description:
        "Integration with content management systems like WordPress, Drupal, or custom CMS solutions for easy content updates.",
    },
    {
      icon: <Server size={24} />,
      title: "API Development",
      description:
        "Custom API development to connect your website with other systems, services, and applications for seamless data exchange.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "SEO-Friendly Development",
      description:
        "Websites built with search engine optimization in mind, including clean code, fast loading times, and proper structure.",
    },
  ];

  const benefits = [
    "Establish a professional online presence that builds trust with customers",
    "Reach customers across all devices with responsive design",
    "Improve search engine rankings with SEO-optimized development",
    "Reduce bounce rates with fast-loading, high-performance websites",
    "Scale your business with websites that grow with your needs",
    "Get found by more customers with local SEO optimization",
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
    "Web Design & Development Services | Professional Website Solutions | Veloria";
  const description =
    "Expert web design and development services creating professional, responsive, and SEO-friendly websites that drive business growth and maximize online visibility.";
  const keywords =
    "web design agency, website development company, custom website development, responsive web design, web application development, e-commerce website development, professional website services";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/web-development"
        structuredData={getServiceSchema({
          name: "Web Design & Development Services",
          description:
            "Professional web design and development services creating fast, responsive, and SEO-friendly websites that drive business growth and conversions.",
          slug: "web-development",
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
                  Web Design & Development Services
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Create stunning, high-performance websites that engage
                  visitors, drive conversions, and establish your professional
                  online presence.
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
                      <Monitor size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Modern Web Solutions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We build websites with the latest technologies that are
                      fast, secure, and optimized for all devices, providing
                      exceptional user experiences.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Responsive Design
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Performance Optimized
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          SEO-Friendly
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Secure & Scalable
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
                Professional Web Design & Development Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We provide comprehensive web design and development solutions
                that combine cutting-edge technology with exceptional design to
                deliver websites that stand out and drive business results.
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
                  Benefits of Professional Web Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  A professionally developed website serves as the foundation of
                  your online presence and offers numerous advantages for your
                  business.
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
                    <h3 className="text-2xl font-bold mb-2">Web Statistics</h3>
                    <p className="text-primary-100">
                      Why quality web development matters
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          75%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Users judge credibility by website design
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          3s
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Maximum load time before users leave
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          70%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Of web traffic comes from mobile devices
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          88%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Users won't return after bad experiences
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
                Our Web Development Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a structured approach to ensure each website we build
                meets the highest standards of quality and performance.
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
                      "We analyze your business needs, target audience, and goals to create a strategic plan for your website development.",
                  },
                  {
                    title: "Design Phase",
                    description:
                      "Our designers create wireframes and visual designs that align with your brand and ensure an optimal user experience.",
                  },
                  {
                    title: "Development",
                    description:
                      "Our developers build your website using clean, efficient code and the latest technologies for optimal performance.",
                  },
                  {
                    title: "Testing & QA",
                    description:
                      "We conduct thorough testing across browsers and devices to ensure your website works flawlessly for all users.",
                  },
                  {
                    title: "Deployment",
                    description:
                      "After final approval, we launch your website with proper server configuration and performance optimization.",
                  },
                  {
                    title: "Maintenance & Support",
                    description:
                      "We provide ongoing support, updates, and monitoring to ensure your website remains secure and performs optimally.",
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
              Ready to build your perfect website?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's create a website that not only looks great but also drives
              results for your business.
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
                Have questions about our web development services? Find answers
                to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "What makes Veloria's web design and development services stand out?",
                  answer:
                    "Our web design and development services combine technical expertise with strategic business understanding. We create websites that not only look visually impressive but are optimized for performance, usability, and conversion. Our development process emphasizes clean code, SEO best practices, and responsive design to ensure your website performs exceptionally across all devices and search engines.",
                },
                {
                  question:
                    "How long does it take to develop a professional website?",
                  answer:
                    "The timeline varies based on the complexity and requirements of your project. A simple informational website might take 4-6 weeks, while a complex e-commerce site or web application could require 8-12 weeks or more. We'll provide a detailed timeline after understanding your specific needs, and we always work efficiently to deliver your project on schedule.",
                },
                {
                  question:
                    "What technologies do you use for web design and development?",
                  answer:
                    "We use a wide range of modern technologies based on project requirements. For frontend development, we work with HTML5, CSS3, JavaScript, React, Vue.js, and Angular. For backend development, we use Node.js, PHP, Python, Ruby on Rails, and .NET. Our database expertise includes MySQL, PostgreSQL, MongoDB, and more. We select the most appropriate technology stack for each project to ensure optimal performance and scalability.",
                },
                {
                  question: "How do you ensure websites are SEO-friendly?",
                  answer:
                    "SEO is built into our web development process from the beginning. We implement technical SEO best practices including proper HTML structure, schema markup, fast loading times, mobile optimization, secure connections (HTTPS), and clean URL structures. We also optimize on-page elements like meta tags, headings, and content structure to establish a solid foundation for your search engine rankings.",
                },
                {
                  question: "Do you provide website maintenance after launch?",
                  answer:
                    "Yes, we offer comprehensive website maintenance packages to keep your site running smoothly. Our maintenance services include regular updates, security monitoring, performance optimization, content updates, and technical support. We recommend ongoing maintenance to ensure your website remains secure, fast, and up-to-date with the latest web standards and technologies.",
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

export default WebDevelopment;
