// src/pages/GetStarted/FaqSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageSquare, Calendar } from "lucide-react";
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
        "Timeline depends on the complexity of your project. A simple landing page can be completed in 2 weeks, while e-commerce sites typically take 4-6 weeks. Blog and portfolio sites usually take 3-4 weeks. During our initial consultation, we'll provide you with a specific timeline based on your requirements.",
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
      question: "Can you help with redesigning an existing website?",
      answer:
        "Absolutely! We specialize in website redesigns to improve performance, user experience, and modern design standards. We can work with your existing content and structure or completely rebuild your site. We'll analyze your current website and provide recommendations for improvement.",
    },
    {
      question: "What happens after my website is launched?",
      answer:
        "After launch, we provide ongoing support including content updates, security monitoring, and technical maintenance. We offer different support packages based on your needs. We also provide training on how to manage your website's content and can help with future enhancements.",
    },
    {
      question: "Do you offer custom software development?",
      answer:
        "Yes, we develop custom software solutions including web applications, management systems, and enterprise software. Our team has experience in various technologies and can build solutions tailored to your specific business requirements.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on the scope, complexity, and timeline of your project. We provide detailed quotes after understanding your requirements. We believe in transparent pricing with no hidden costs. Payment is typically split into milestones throughout the project.",
    },
    {
      question: "Do you provide SEO services?",
      answer:
        "Yes, we implement SEO best practices in all our websites, including proper meta tags, structured data, fast loading speeds, and mobile optimization. We can also provide ongoing SEO services to help improve your search engine rankings and online visibility.",
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gray-600 via-gray-700 to-gray-600" />

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-6">
              {/* Step indicator */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index % 3 === 0
                    ? "bg-gray-600 hover:bg-gray-500"
                    : index % 3 === 1
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-500 hover:bg-gray-400"
                } text-white z-10 flex-shrink-0 transition-all duration-300 cursor-pointer`}
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-light">{index + 1}</span>
              </div>

              {/* FAQ content */}
              <div
                className={`flex-grow cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? "text-white" : "text-gray-300"
                }`}
                onClick={() => toggleFaq(index)}
              >
                <div className="mb-2">
                  <h3 className="text-lg font-light mb-1">{faq.question}</h3>
                  <div className="w-8 h-px bg-gray-600" />
                </div>

                {/* Expandable answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2">
                    <p className="text-sm font-light text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-12 pt-8 border-t border-gray-800 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-light text-white mb-2">
            Still Have Questions?
          </h3>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
        </div>
        <p className="text-gray-400 font-light mb-6 leading-relaxed">
          We're here to help! Get in touch and we'll answer any questions you
          have about your project.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            onClick={() => setActiveSection("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-light transition-all duration-300 hover:bg-gray-100"
          >
            <MessageSquare size={16} />
            <span>Contact Us</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveSection("booking")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-light transition-all duration-300 hover:bg-gray-700 border border-gray-700"
          >
            <Calendar size={16} />
            <span>Book a Call</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqSection;
