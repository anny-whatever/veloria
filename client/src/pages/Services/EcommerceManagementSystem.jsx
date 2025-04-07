import { motion } from "framer-motion";
import {
  ShoppingBag,
  Check,
  Truck,
  CreditCard,
  BarChart3,
  Users,
  ShieldCheck,
  Smartphone,
  Globe,
  RefreshCw,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const EcommerceManagementSystem = () => {
  const features = [
    {
      icon: <ShoppingBag size={24} />,
      title: "Product Management",
      description:
        "Comprehensive product catalog with categories, variants, customizable attributes, and inventory tracking.",
    },
    {
      icon: <Truck size={24} />,
      title: "Order & Fulfillment",
      description:
        "End-to-end order management with automated workflows, shipping integration, and real-time tracking.",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Payment Processing",
      description:
        "Multiple payment gateways integration, secure checkout, and automated invoicing and refunds.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics & Reporting",
      description:
        "Comprehensive dashboards and reports for sales, inventory, customer behavior, and marketing performance.",
    },
    {
      icon: <Users size={24} />,
      title: "Customer Management",
      description:
        "Customer profiles, purchase history, segmentation, and personalized marketing capabilities.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Commerce",
      description:
        "Responsive design and native mobile app integration for on-the-go shopping experiences.",
    },
  ];

  const benefits = [
    "Increase sales through omnichannel selling capabilities",
    "Improve operational efficiency with automated workflows",
    "Enhance customer experience with personalized shopping",
    "Reduce cart abandonment with optimized checkout process",
    "Scale your business with flexible, cloud-based architecture",
    "Gain valuable insights through advanced analytics",
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
  const title = "E-commerce Management System Development | Veloria";
  const description =
    "Custom e-commerce platform development services in India. Build scalable and feature-rich online stores with integrated payment gateways, inventory management, and marketing tools.";
  const keywords =
    "e-commerce development, online store development, e-commerce platform, shopping cart development, payment gateway integration, inventory management system, e-commerce website development india";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/ecommerce-management-system"
        structuredData={getServiceSchema({
          name: "E-commerce Management System Development",
          description:
            "Custom e-commerce platform development services for creating scalable online stores with integrated payment, inventory, and marketing capabilities.",
          slug: "ecommerce-management-system",
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
                  E-commerce Management System Development
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Launch and scale your online business with our custom-built
                  e-commerce platform designed specifically for businesses in
                  India and global markets.
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
                      <ShoppingBag size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Comprehensive E-commerce Solution
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our e-commerce management system is designed to handle all
                      aspects of online selling, from product listings and
                      inventory to orders and customer management.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Product Catalog
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Order Management
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Payment Processing
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Customer Management
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
                Key Features of Our E-commerce Management System
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our comprehensive solution is designed to address all aspects of
                online selling, from product management to customer experience
                and business analytics.
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
                  Benefits for Your Online Business
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Implementing our e-commerce management system can transform
                  your online business and significantly improve sales and
                  customer satisfaction. Here's how:
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
                      E-commerce Statistics
                    </h3>
                    <p className="text-primary-100">
                      Why businesses need robust e-commerce systems
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          18%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Annual growth in Indian e-commerce market
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          67%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Consumers prefer shopping on mobile devices
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          30%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Higher conversion with personalized experiences
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          88%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Customers value real-time order tracking
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
                We follow a systematic approach to develop custom e-commerce
                solutions tailored to your specific business requirements.
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
                      "We start by understanding your business model, target audience, product range, and competitive landscape to create a tailored strategy.",
                  },
                  {
                    title: "UX/UI Design",
                    description:
                      "Our designers create intuitive and conversion-optimized user interfaces that reflect your brand identity and enhance the shopping experience.",
                  },
                  {
                    title: "Development",
                    description:
                      "Our developers build your custom e-commerce platform using the latest technologies, ensuring scalability, performance, and security.",
                  },
                  {
                    title: "Integration",
                    description:
                      "We integrate payment gateways, shipping providers, inventory systems, marketing tools, and other third-party services you require.",
                  },
                  {
                    title: "Testing & Launch",
                    description:
                      "Rigorous testing across devices and browsers ensures your e-commerce platform functions flawlessly before going live.",
                  },
                  {
                    title: "Growth & Support",
                    description:
                      "Our team provides ongoing support, performance optimization, and feature enhancements to help your e-commerce business grow.",
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
              Ready to transform your online business?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's discuss how our custom e-commerce solution can help you
              increase sales, streamline operations, and deliver exceptional
              customer experiences.
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
                Have questions about our e-commerce development services? Find
                answers to commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question:
                    "How long does it take to develop a custom e-commerce platform?",
                  answer:
                    "The timeline varies based on the complexity and specific requirements of your project. A basic e-commerce store can be launched in 8-12 weeks, while more complex systems with extensive integrations might take 3-6 months. We'll provide a detailed timeline after understanding your requirements.",
                },
                {
                  question:
                    "Which payment gateways can be integrated with your e-commerce system?",
                  answer:
                    "Our platform supports integration with all major payment gateways including Razorpay, PayU, PayTM, Stripe, PayPal, and numerous others. We also support UPI payments, net banking, and other India-specific payment methods to ensure maximum convenience for your customers.",
                },
                {
                  question:
                    "Can your e-commerce platform handle a large product catalog?",
                  answer:
                    "Yes, our e-commerce system is designed for scalability and can efficiently handle thousands of products with multiple variants, attributes, and categories. The database and search functionality are optimized for performance even with large catalogs.",
                },
                {
                  question:
                    "Do you provide mobile apps along with the e-commerce website?",
                  answer:
                    "Yes, we offer mobile app development for both Android and iOS platforms to complement your e-commerce website. You can choose between native apps for maximum performance or cross-platform solutions for cost-effectiveness. Our mobile apps sync seamlessly with your main e-commerce system.",
                },
                {
                  question:
                    "What marketing and SEO features are included in your e-commerce platform?",
                  answer:
                    "Our e-commerce system includes comprehensive SEO tools, marketing automation capabilities, discount and promotion management, abandoned cart recovery, email marketing integration, social media sharing, product reviews, and analytics integration to help you attract and retain customers.",
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

export default EcommerceManagementSystem;
