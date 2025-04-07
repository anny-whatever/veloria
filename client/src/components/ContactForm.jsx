import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - could be enhanced
    if (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.message.trim()
    ) {
      onSubmit(formData);
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-gray-50 dark:bg-dark-200 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:focus:ring-primary-400/50 dark:focus:border-primary-400 transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500";
  const labelClasses =
    "text-gray-700 dark:text-gray-300 font-medium mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={inputClasses}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={inputClasses}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClasses}>
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className={inputClasses}
          placeholder="What is this regarding?"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          className={inputClasses}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <motion.button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white rounded-lg shadow-md flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Send Message</span>
        <Send size={18} className="ml-2" />
      </motion.button>
    </form>
  );
};

export default ContactForm;
