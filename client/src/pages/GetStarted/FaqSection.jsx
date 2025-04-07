// src/pages/GetStarted/FaqSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const FaqSection = ({ setActiveSection }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer:
        "Timeline depends on the complexity of your project. A simple landing page can be completed in 2 weeks, while e-commerce sites typically take 4-6 weeks. Blog and portfolio sites usually take 3-4 weeks. During our initial consultation, we&apos;ll provide you with a specific timeline based on your requirements.",
    },
    {
      question: "What do I need to provide to get started?",
      answer:
        "To begin your project, we'll need your brand assets (logo, images, brand guidelines if available), content for your website (text, product information), any existing website information if applicable, and a clear understanding of your goals. After our initial consultation, we'll provide a detailed list of everything required.",
    },
    {
      question: "Do you provide hosting and domain registration?",
      answer:
        "Yes, we include one year of free hosting with all our packages. We can also register a domain for you (included in the price if it costs under ₹1,500 per year). After the first year, we offer hosting maintenance plans or can help you transition to your preferred hosting provider.",
    },
    {
      question: "Can I update the website myself after it's built?",
      answer:
        "Absolutely! All our websites come with a user-friendly content management system that allows you to update text, images, add new products or blog posts, and make basic changes without any technical knowledge. We provide training on how to use the system once your site is complete.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, UPI payments, and major credit/debit cards. For projects, we typically require a 20% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we may set up milestone payments.",
    },
    {
      question: "Do you offer maintenance and support after launch?",
      answer:
        "Yes, we provide one month of free bug fixes after launch. For ongoing support, we offer various maintenance packages that include regular updates, security monitoring, performance optimization, and content updates. We can discuss these options during our consultation.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes, we specialize in website redesigns. We&apos;ll analyze your current site, identify areas for improvement, and create a fresh, modern design while preserving your brand identity. We can also help migrate content from your existing site to the new one.",
    },
    {
      question: "Do you provide SEO services?",
      answer:
        "All our websites are built with SEO best practices in mind, including proper HTML structure, mobile optimization, and fast loading times. We include basic on-page SEO setup, but for comprehensive SEO campaigns including keyword research, content strategy, and ongoing optimization, we offer specialized SEO packages as an add-on service.",
    },
    {
      question: "What happens if I'm not satisfied with the design?",
      answer:
        "Your satisfaction is our priority. Our design process includes up to three rounds of revisions to ensure you're completely happy with the final result. We maintain open communication throughout the project and incorporate your feedback at each stage to prevent any misalignment of expectations.",
    },
    {
      question: "Can you help with content creation?",
      answer:
        "Yes, we offer content creation services including copywriting, photography sourcing, custom graphics, and product descriptions as add-on services. If you need help creating compelling content for your website, we can discuss these options during our initial consultation.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 dark:text-white">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions about our services and process.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 mb-12"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`border ${
              activeIndex === index
                ? "border-primary/50 dark:border-primary-400/50 bg-primary/5 dark:bg-primary-900/10"
                : "border-gray-200 dark:border-gray-700"
            } rounded-lg overflow-hidden transition-colors duration-300 dark:bg-dark-200`}
          >
            <div
              className={`p-5 flex justify-between items-center cursor-pointer ${
                activeIndex === index
                  ? "border-b border-primary/50 dark:border-primary-400/50"
                  : ""
              }`}
              onClick={() => toggleFaq(index)}
            >
              <h4 className="font-medium text-lg pr-8 dark:text-white">
                {faq.question}
              </h4>
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full ${
                  activeIndex === index
                    ? "bg-primary-600 dark:bg-primary-400 text-white"
                    : "bg-gray-200 dark:bg-dark-300 text-gray-600 dark:text-gray-300"
                }`}
              >
                {activeIndex === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
        <h4 className="text-lg font-bold mb-3 dark:text-white">
          Still have questions?
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're here to help! Contact us directly or schedule a discovery call.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 text-white rounded-lg shadow-md w-full sm:w-auto"
            >
              <div className="flex items-center justify-center">
                <MessageSquare size={18} className="mr-2" />
                <span>Contact Us</span>
              </div>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-300 rounded-lg w-full sm:w-auto hover:bg-primary/5 dark:hover:bg-primary-900/10 transition-colors"
            onClick={() => setActiveSection("booking")}
          >
            Schedule a Call
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
