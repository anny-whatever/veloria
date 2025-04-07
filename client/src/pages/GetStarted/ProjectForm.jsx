// src/pages/GetStarted/ProjectForm.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft, Info } from "lucide-react";

const ProjectForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    timeline: "",
    description: "",
  });

  const serviceOptions = [
    { id: "webdesign", label: "Web Design" },
    { id: "development", label: "Development" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "branding", label: "Branding" },
    { id: "marketing", label: "Marketing" },
    { id: "consulting", label: "Consulting" },
  ];

  const budgetOptions = [
    { id: "under5k", label: "Under $5,000" },
    { id: "5kto10k", label: "$5,000 - $10,000" },
    { id: "10kto25k", label: "$10,000 - $25,000" },
    { id: "25kto50k", label: "$25,000 - $50,000" },
    { id: "over50k", label: "Over $50,000" },
  ];

  const timelineOptions = [
    { id: "asap", label: "ASAP" },
    { id: "1month", label: "Within 1 month" },
    { id: "3months", label: "1-3 months" },
    { id: "flexible", label: "Flexible" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      if (prev.services.includes(serviceId)) {
        return {
          ...prev,
          services: prev.services.filter((id) => id !== serviceId),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, serviceId],
        };
      }
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Here you would normally submit the form data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted successfully!");
      // Reset form or redirect
    }, 1500);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <form className="relative max-w-4xl mx-auto p-6 bg-white dark:bg-dark-200 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= stepNumber
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white"
                    : "bg-white dark:bg-dark-200 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                }`}
              >
                {stepNumber}
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-400">
                {stepNumber === 1
                  ? "Basic Info"
                  : stepNumber === 2
                  ? "Project Type"
                  : "Details"}
              </div>
            </div>
          ))}

          {/* Connecting lines between steps */}
          <div className="absolute top-5 left-0 right-0 h-1.5 -translate-y-1/2 flex">
            <div
              className={`h-full bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 transition-all duration-300`}
              style={{ width: `${Math.max(0, (step - 1) * 50)}%` }}
            ></div>
            <div
              className="h-full bg-gray-300 dark:bg-gray-600 flex-grow transition-all duration-300"
              style={{ width: `${100 - Math.max(0, (step - 1) * 50)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Let's get to know you
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Phone Number{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    (Optional)
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Company Name{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium flex items-center gap-2"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tell us about your project
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-3 font-medium">
                What services are you interested in?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                      formData.services.includes(service.id)
                        ? "bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 dark:border-primary-400 text-primary-700 dark:text-primary-300"
                        : "bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        formData.services.includes(service.id)
                          ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-gray-500"
                      }`}
                    >
                      {formData.services.includes(service.id) && (
                        <CheckCircle size={13} className="text-white" />
                      )}
                    </div>
                    <span>{service.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>
                    Select budget range
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>
                    Select timeline
                  </option>
                  {timelineOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-full bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-300 transition-all duration-200"
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium flex items-center gap-2"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Details
            </h2>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200 min-h-[150px]"
                placeholder="Tell us about your project, goals, and specific requirements..."
                required
              ></textarea>
            </div>

            <div className="py-2">
              <div className="rounded-lg p-4 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 flex items-start gap-3">
                <Info
                  size={20}
                  className="text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm text-primary-900 dark:text-primary-300">
                  <p className="font-medium mb-1">Project Submission Tips</p>
                  <p>
                    The more details you provide, the better we can understand
                    your needs and provide an accurate estimate.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-full bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-300 transition-all duration-200"
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <button
                type="button"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ProjectForm;
