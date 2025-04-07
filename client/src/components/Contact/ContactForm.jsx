// src/components/Contact/ContactForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { submitContactForm } from "../../api";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setApiError("");

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // API call to backend
        const response = await submitContactForm(formData);

        // Call the parent component's onSubmit handler if provided
        if (onSubmit) {
          onSubmit(formData);
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setSubmitStatus("success");
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
        setApiError(
          typeof error === "string"
            ? error
            : "There was an error sending your message. Please try again or contact us directly."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-400 transition-colors duration-200";
  const labelClasses =
    "block text-gray-700 dark:text-gray-300 mb-2 font-medium";
  const errorClasses = "text-red-500 dark:text-red-400 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === "success" && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg p-3">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg p-3">
          {apiError ||
            "There was a problem sending your message. Please try again or contact us directly."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
          {errors.name && <p className={errorClasses}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={inputClasses}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          placeholder="Tell us about your project..."
          className={inputClasses}
        ></textarea>
        {errors.message && <p className={errorClasses}>{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary px-8 py-3 rounded-full text-white dark:text-white font-medium inline-flex items-center justify-center gap-2 w-full md:w-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <span>Sending...</span>
        ) : (
          <>
            <span>Send Message</span>
            <Send size={16} />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;
