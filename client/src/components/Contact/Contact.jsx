// src/components/Contact/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFormSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "info@veloria.in",
      href: "mailto:info@veloria.in",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 9315 360 595",
      href: "tel:+919315360595",
    },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: "Mumbai, India",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="px-4 py-16 md:py-20"
      style={{ backgroundColor: "#EDEDED" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="text-gray-800">Get In</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {"Touch".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h2>
          <motion.p
            className="mx-auto max-w-2xl text-gray-600 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to bring your vision to life? Let's start a conversation.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {formSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Send className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
                <h4 className="mb-2 text-lg font-medium text-gray-800">
                  Message Sent!
                </h4>
                <p className="text-gray-600 text-sm">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors placeholder-gray-500"
                    placeholder="Your company (optional)"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors resize-none placeholder-gray-500"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Send Message
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center text-gray-700 transition-colors hover:text-blue-600 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {info.label}
                    </div>
                    <div className="text-lg font-medium">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-8 pt-6 border-t border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                We typically respond to all inquiries within 24 hours. For
                urgent projects, call us directly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
