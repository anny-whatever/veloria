// src/components/Contact/ContactForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
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

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-600 rounded-full">
          <CheckCircle size={32} className="text-white" />
        </div>
        <h3 className="mb-3 text-xl font-light text-white">
          Message Sent Successfully
        </h3>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-6" />
        <p className="text-gray-400 font-light leading-relaxed max-w-md mx-auto">
          Thank you for your message! We'll get back to you within 24 hours with
          a detailed response.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Status Messages */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-900/20 border border-red-800/50 rounded-lg flex items-start gap-3"
        >
          <AlertCircle
            size={20}
            className="text-red-400 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-red-300 font-light text-sm">
              {apiError ||
                "There was a problem sending your message. Please try again or contact us directly."}
            </p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-3 font-light text-gray-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400 font-light">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-3 font-light text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400 font-light">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block mb-3 font-light text-gray-300"
            >
              Phone Number
              <span className="text-gray-500 text-sm ml-1">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-3 font-light text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block mb-3 font-light text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project, goals, and how we can help you..."
            rows="5"
            className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300 resize-none"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-400 font-light">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full px-6 py-4 font-light transition-all duration-300 flex items-center justify-center gap-3 ${
              isSubmitting
                ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Info Text */}
        <div className="pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 font-light leading-relaxed text-center">
            We typically respond to all inquiries within 24 hours. For urgent
            projects, feel free to call us directly at{" "}
            <span className="text-gray-300">+91 9315 360 595</span>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
