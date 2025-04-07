import { motion } from "framer-motion";
import {
  Database,
  Check,
  Shield,
  BarChart,
  Laptop,
  Network,
  Search,
  ServerCrash,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const DatabaseSolutions = () => {
  const features = [
    {
      icon: <Database size={24} />,
      title: "Database Design & Architecture",
      description:
        "Custom database design tailored to your specific business requirements with optimized schema architecture for performance and scalability.",
    },
    {
      icon: <Network size={24} />,
      title: "Database Migration",
      description:
        "Seamless migration of your existing databases to modern database systems with minimal downtime and data integrity preservation.",
    },
    {
      icon: <Shield size={24} />,
      title: "Security Implementation",
      description:
        "Robust security measures including encryption, access controls, and compliance with data protection regulations to safeguard sensitive information.",
    },
    {
      icon: <BarChart size={24} />,
      title: "Performance Optimization",
      description:
        "Fine-tuning database performance with query optimization, indexing strategies, and resource allocation to reduce latency and improve response times.",
    },
    {
      icon: <Search size={24} />,
      title: "Data Analytics Solutions",
      description:
        "Implementation of data warehousing, business intelligence tools, and analytics platforms to derive valuable insights from your data.",
    },
    {
      icon: <ServerCrash size={24} />,
      title: "Backup & Recovery",
      description:
        "Comprehensive backup solutions with automated schedules and disaster recovery plans to ensure business continuity and data resilience.",
    },
  ];

  const benefits = [
    "Improved data integrity and reliability",
    "Enhanced application performance through optimized database design",
    "Robust security for sensitive information",
    "Scalable architecture that grows with your business",
    "Reduced operational costs through efficient data management",
    "Better business insights through improved data accessibility",
  ];

  // SEO metadata
  const title = "Database Solutions & Services | Veloria";
  const description =
    "Expert database design, migration, and optimization services. Our database solutions ensure performance, security, and scalability for your business-critical data.";
  const keywords =
    "database solutions, database design, database migration, database optimization, SQL database services, NoSQL database services, data warehousing, database security";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/database-solutions"
        structuredData={getServiceSchema({
          name: "Database Solutions",
          description:
            "Professional database design, migration, and optimization services ensuring performance, security, and scalability for your critical business data.",
          slug: "database-solutions",
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
                  Database Solutions
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Robust database systems designed for performance, security,
                  and scalability to support your critical business operations.
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
                      <Database size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Data-Driven Excellence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We design, implement, and optimize database systems that
                      ensure your data is secure, accessible, and driving
                      business value.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          SQL Databases
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          NoSQL Solutions
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Cloud Databases
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Data Warehousing
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
                Our Database Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive database solutions to ensure your data is secure,
                optimized, and driving business value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Benefits of Professional Database Solutions
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  A well-designed database is the foundation for efficient
                  operations and data-driven decision making.
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
                      Database Technologies
                    </h3>
                    <p className="text-primary-100">
                      Our expertise spans across multiple database systems
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                          SQL Databases
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              PostgreSQL
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              MySQL/MariaDB
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              SQL Server
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              Oracle
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                          NoSQL Databases
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              MongoDB
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              Redis
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              Cassandra
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="text-green-500" size={16} />
                            <span className="text-gray-600 dark:text-gray-300">
                              DynamoDB
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary-600 dark:bg-primary-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to optimize your database infrastructure?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's build a database solution that ensures performance,
              security, and reliability for your business.
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
                Have questions about our database solutions? Find answers to
                commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What database system is best for my business?",
                  answer:
                    "The ideal database solution depends on your specific requirements, data structure, scalability needs, and use cases. SQL databases like PostgreSQL or MySQL are excellent for structured data with complex relationships. NoSQL databases like MongoDB are better for unstructured data, high scalability, and flexibility. Cloud-based solutions offer advantages in terms of maintenance and scalability. We assess your specific needs and recommend the most appropriate solution during our consultation process.",
                },
                {
                  question:
                    "Can you migrate our existing database to a new system?",
                  answer:
                    "Yes, we specialize in database migration with minimal disruption to your operations. Our methodical approach includes thorough assessment, data mapping, testing, and validation to ensure data integrity. We can migrate from legacy systems to modern databases, between different database technologies (SQL to NoSQL or vice versa), or to cloud-based database services. Our migration strategies prioritize data integrity, security, and business continuity.",
                },
                {
                  question: "How do you ensure database security?",
                  answer:
                    "We implement multiple layers of security including encryption of data at rest and in transit, robust authentication and authorization mechanisms, regular security audits, and compliance with industry regulations like GDPR, HIPAA, and PCI DSS where applicable. We also implement secure backup strategies, monitoring tools for unusual activities, and comprehensive security policies tailored to your specific requirements.",
                },
                {
                  question: "How can you improve our database performance?",
                  answer:
                    "Our performance optimization process includes query analysis and optimization, proper indexing strategies, database architecture review, server configuration tuning, and implementation of caching mechanisms. We use monitoring tools to identify bottlenecks, analyze execution plans, and implement targeted improvements. For high-traffic applications, we can implement sharding, replication, or clustering solutions to distribute load and improve response times.",
                },
                {
                  question:
                    "Do you provide ongoing database maintenance services?",
                  answer:
                    "Yes, we offer comprehensive database maintenance services including regular health checks, performance monitoring, security updates, backup verification, and proactive issue resolution. Our maintenance plans can include 24/7 monitoring, regular optimization reviews, capacity planning, and emergency support. We work with you to develop a maintenance schedule that minimizes disruption to your business operations while ensuring database reliability and performance.",
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

export default DatabaseSolutions;
