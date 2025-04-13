// src/pages/GetStarted/ProjectForm.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft, Info } from "lucide-react";
import axios from "axios";

const ProjectForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    serviceType: "",
    projectName: "",
    projectDescription: "",
    projectGoals: [],
    budget: "",
    timeline: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    targetAudience: "",
    name: "",
    email: "",
    phone: "",
    goal: "", // Temporary field for handling project goals input
  });

  const serviceOptions = [
    { id: "ui-ux-design", label: "UI/UX Design" },
    { id: "web-development", label: "Web Development" },
    { id: "mobile-app-development", label: "Mobile App Development" },
    { id: "custom-software-development", label: "Custom Software Development" },
    { id: "ecommerce-development", label: "E-commerce Development" },
    { id: "database-solutions", label: "Database Solutions" },
    { id: "hotel-management", label: "Hotel Management Systems" },
    { id: "school-management", label: "School Management Systems" },
    { id: "hospital-management", label: "Hospital Management Systems" },
    { id: "payroll-management", label: "Payroll Management Systems" },
    { id: "erp-system", label: "Enterprise Resource Planning (ERP)" },
  ];

  const budgetOptions = [
    { id: "under5k", label: "Under $5,000" },
    { id: "5kto10k", label: "$5,000 - $10,000" },
    { id: "10kto25k", label: "$10,000 - $25,000" },
    { id: "25kto50k", label: "$25,000 - $50,000" },
    { id: "over50k", label: "Over $50,000" },
  ];

  const timelineOptions = [
    { id: "urgent", label: "Urgent (ASAP)" },
    { id: "standard", label: "Standard (1-3 months)" },
    { id: "relaxed", label: "Relaxed (3+ months)" },
    { id: "not-sure", label: "Not Sure" },
  ];

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Retail",
    "Food & Beverage",
    "Entertainment",
    "Real Estate",
    "Travel",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: serviceId,
    }));
  };

  const handleAddGoal = () => {
    if (formData.goal.trim()) {
      setFormData((prev) => ({
        ...prev,
        projectGoals: [...prev.projectGoals, prev.goal.trim()],
        goal: "",
      }));
    }
  };

  const handleRemoveGoal = (index) => {
    setFormData((prev) => ({
      ...prev,
      projectGoals: prev.projectGoals.filter((_, i) => i !== index),
    }));
  };

  const handleGoalKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddGoal();
    }
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.serviceType && formData.budget && formData.timeline;
      case 3:
        return (
          formData.projectName &&
          formData.projectDescription &&
          formData.projectGoals.length > 0 &&
          formData.companyName &&
          formData.industry &&
          formData.targetAudience
        );
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Format data for the backend - no mapping needed now that the server accepts all service types
      const formattedData = {
        ...formData,
        // Send the actual selected service type directly
        serviceType: formData.serviceType,
      };

      // Use the environment variable for the API URL
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/projects`, formattedData);

      setSubmitSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to submit your project. Please try again or contact us directly."
      );
      console.error("Form submission error:", error);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    } else {
      alert("Please fill all required fields before proceeding.");
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const getServiceLabel = (serviceId) => {
    const service = serviceOptions.find((s) => s.id === serviceId);
    return service ? service.label : "Custom Solution";
  };

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-dark-200 rounded-xl shadow-lg dark:border-gray-700 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle
            size={40}
            className="text-green-600 dark:text-green-400"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your Project Request Has Been Received!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Thank you for choosing Veloria for your{" "}
          {getServiceLabel(formData.serviceType)} project.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Our expert team will review your requirements and get back to you
          within 24-48 hours with a personalized solution and quote.
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <CheckCircle size={16} className="text-green-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Expert Consultation
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={16} className="text-green-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Custom Quote
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle size={16} className="text-green-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tailored Solution
            </span>
          </div>
        </div>
        <a
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium inline-block"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <form
      className="relative max-w-4xl mx-auto p-6 bg-white dark:bg-dark-200 rounded-xl shadow-lg dark:border-gray-700"
      itemScope
      itemType="https://schema.org/ContactForm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-2 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Request Your Free Project Consultation
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Complete this form to get a custom quote for your project needs
        </p>
      </div>

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
                  : "Project Details"}
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
                  Your Name <span className="text-red-500">*</span>
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
                  Email Address <span className="text-red-500">*</span>
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
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your company or organization"
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
                What type of service are you looking for?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {serviceOptions.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                      formData.serviceType === service.id
                        ? "bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 dark:border-primary-400 text-primary-700 dark:text-primary-300"
                        : "bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border ${
                        formData.serviceType === service.id
                          ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400"
                          : "border-gray-300 dark:border-gray-500"
                      }`}
                    >
                      {formData.serviceType === service.id && (
                        <CheckCircle size={13} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Budget Range <span className="text-red-500">*</span>
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
                  Timeline <span className="text-red-500">*</span>
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
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                placeholder="Give your project a name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200 min-h-[120px]"
                placeholder="Describe your project in detail..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Project Goals <span className="text-red-500">*</span>
                <span className="ml-1 text-sm text-gray-500">
                  (add at least one)
                </span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  onKeyPress={handleGoalKeyPress}
                  className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Add a project goal"
                />
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="px-4 py-3 rounded-r-lg bg-primary-500 dark:bg-primary-600 text-white font-medium"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.projectGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                  >
                    {goal}
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="" disabled>
                    Select industry
                  </option>
                  {industryOptions.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Company Website{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    (Optional)
                  </span>
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="https://your-company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all duration-200 min-h-[80px]"
                placeholder="Describe your target audience..."
                required
              ></textarea>
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {submitError}
              </div>
            )}

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
                disabled={isSubmitting}
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

      {/* Hidden schema.org metadata for better SEO */}
      <div style={{ display: "none" }}>
        <span
          itemProp="provider"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="Veloria" />
          <meta itemProp="url" content="https://veloria.in" />
          <meta itemProp="email" content="info@veloria.in" />
          <meta itemProp="telephone" content="+91 9315360595" />
        </span>
        <meta itemProp="availableLanguage" content="en" />
      </div>
    </form>
  );
};

export default ProjectForm;
