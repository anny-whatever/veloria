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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";
  const labelClasses = "text-gray-700 font-medium mb-1 block";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === "success" && (
        <div className="p-4 text-green-700 border border-green-200 rounded-lg bg-green-50">
          Thank you! Your message has been received. We'll get back to you
          shortly.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
          {apiError ||
            "There was a problem sending your message. Please try again or contact us directly."}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`${inputClasses} ${errors.name ? "border-red-500" : ""}`}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
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
            className={`${inputClasses} ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={inputClasses}
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
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
            className={`${inputClasses} ${
              errors.subject ? "border-red-500" : ""
            }`}
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p className={errorClasses}>{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          className={`${inputClasses} resize-none ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className={errorClasses}>{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        className="flex items-center justify-center w-full py-3 font-medium text-white rounded-lg bg-gradient-to-r from-primary to-secondary disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending Message...
          </>
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;
