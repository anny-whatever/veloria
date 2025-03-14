// src/pages/GetStarted/ProjectForm.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft, Info } from "lucide-react";
import { submitProjectForm } from "../../api";

const ProjectForm = ({ setActiveSection }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Service Selection
    serviceType: "",

    // Step 2: Project Details
    projectName: "",
    projectDescription: "",
    projectGoals: [],

    // Step 3: Budget and Timeline
    budget: "",
    timeline: "",

    // Step 4: Company Information
    companyName: "",
    companyWebsite: "",
    industry: "",
    targetAudience: "",

    // Step 5: Contact Information
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  // Service definitions with minimum pricing and timelines
  const services = [
    {
      id: "ecommerce",
      title: "E-commerce Website",
      description: "From basic stores to complete shopping experiences",
      icon: "🛒",
      details:
        "Our e-commerce solutions range from a custom designed online store with content management and payment systems to a full-fledged platform with sales metrics dashboard, invoice generation, mailing system, and comprehensive inventory management.",
      minBudget: "39999", // Minimum budget for e-commerce
      minTimeline: "relaxed", // Needs at least 4 weeks
      timelineText: "4 weeks",
    },
    {
      id: "blog",
      title: "Blog Website",
      description: "Share your content with elegant blogging platforms",
      icon: "✍️",
      details:
        "Our blog websites range from simple content management systems to advanced platforms with membership areas, newsletter integration, content scheduling, SEO optimization tools, and category management.",
      minBudget: "24999", // Minimum budget for blog
      minTimeline: "standard", // Needs at least 3 weeks
      timelineText: "3 weeks",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Showcase your work with stunning portfolio sites",
      icon: "🖼️",
      details:
        "Our portfolio websites are perfect for photographers, artists, designers, and other creatives. We offer beautiful galleries, image optimization, category filtering, project case studies, and integrated contact forms.",
      minBudget: "19999", // Minimum budget for portfolio
      minTimeline: "standard", // Needs at least 2 weeks
      timelineText: "2 weeks",
    },
    {
      id: "landing",
      title: "Landing Page",
      description: "High-converting landing pages for your campaigns",
      icon: "🚀",
      details:
        "From simple one-page landing sites to multi-section pages with lead generation forms, testimonial sections, pricing tables, and conversion-optimized layouts designed to drive action.",
      minBudget: "10999", // Minimum budget for landing
      minTimeline: "urgent", // Can be done in 1 week
      timelineText: "1 week",
    },
    {
      id: "custom",
      title: "Custom Website",
      description: "Unique websites tailored to your specific needs",
      icon: "⚙️",
      details:
        "Have your own custom requirements? Our team can build bespoke web applications, membership sites, online learning platforms, or any other web-based solution you can imagine.",
      minBudget: "50000", // Minimum budget for custom
      minTimeline: "relaxed", // Needs at least 4-8 weeks
      timelineText: "4-8 weeks",
    },
  ];

  // All potential budget ranges
  const allBudgetRanges = [
    {
      id: "low1",
      label: "₹10,000 - ₹20,000",
      value: "10000-20000",
      min: 10000,
    },
    {
      id: "low2",
      label: "₹20,000 - ₹30,000",
      value: "20000-30000",
      min: 20000,
    },
    {
      id: "medium1",
      label: "₹30,000 - ₹40,000",
      value: "30000-40000",
      min: 30000,
    },
    {
      id: "medium2",
      label: "₹40,000 - ₹50,000",
      value: "40000-50000",
      min: 40000,
    },
    {
      id: "high1",
      label: "₹50,000 - ₹75,000",
      value: "50000-75000",
      min: 50000,
    },
    {
      id: "high2",
      label: "₹75,000 - ₹100,000",
      value: "75000-100000",
      min: 75000,
    },
    { id: "enterprise", label: "₹100,000+", value: "100000+", min: 100000 },
  ];

  // All timeline options with their priorities
  const allTimelineOptions = [
    { id: "urgent", label: "Urgent (< 2 weeks)", value: "urgent", priority: 1 },
    {
      id: "standard",
      label: "Standard (2-4 weeks)",
      value: "standard",
      priority: 2,
    },
    {
      id: "relaxed",
      label: "Flexible (1-2 months)",
      value: "relaxed",
      priority: 3,
    },
    { id: "not-sure", label: "Not sure yet", value: "not-sure", priority: 4 },
  ];

  const projectGoalOptions = [
    { id: "sales", label: "Increase Sales" },
    { id: "leads", label: "Generate Leads" },
    { id: "awareness", label: "Brand Awareness" },
    { id: "traffic", label: "Drive Traffic" },
    { id: "conversion", label: "Improve Conversion Rate" },
    { id: "showcase", label: "Showcase Work/Products" },
    { id: "information", label: "Share Information" },
  ];

  // Filter budget ranges based on selected service
  const getAvailableBudgetRanges = () => {
    if (!formData.serviceType) return allBudgetRanges;

    const selectedService = services.find((s) => s.id === formData.serviceType);
    if (!selectedService) return allBudgetRanges;

    const minBudget = parseInt(selectedService.minBudget);
    return allBudgetRanges.filter((range) => range.min >= minBudget);
  };

  // Filter timeline options based on selected service
  const getAvailableTimelineOptions = () => {
    if (!formData.serviceType) return allTimelineOptions;

    const selectedService = services.find((s) => s.id === formData.serviceType);
    if (!selectedService) return allTimelineOptions;

    const minTimelinePriority =
      allTimelineOptions.find((t) => t.value === selectedService.minTimeline)
        ?.priority || 1;

    // Always include "not-sure" option regardless of the service's minimum timeline
    return allTimelineOptions.filter(
      (option) =>
        option.priority >= minTimelinePriority || option.value === "not-sure"
    );
  };

  // Get formatted starting price for a service
  const getServiceBasePrice = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return "";

    const price = parseInt(service.minBudget);
    return new Intl.NumberFormat("en-IN").format(price);
  };

  // Effect to clear budget if it doesn't meet the minimum requirement when service changes
  useEffect(() => {
    if (formData.serviceType) {
      const selectedService = services.find(
        (s) => s.id === formData.serviceType
      );
      if (!selectedService) return;

      // Handle budget validation
      if (formData.budget) {
        const minBudget = parseInt(selectedService.minBudget);
        const budgetRange = formData.budget.split("-");
        const minSelectedBudget =
          budgetRange[0] === "100000+" ? 100000 : parseInt(budgetRange[0]);

        if (minSelectedBudget < minBudget) {
          // Reset budget if it's below the minimum for the selected service
          setFormData((prev) => ({
            ...prev,
            budget: "",
          }));
        }
      }

      // Handle timeline validation
      if (formData.timeline && formData.timeline !== "not-sure") {
        const selectedTimelinePriority = allTimelineOptions.find(
          (t) => t.value === formData.timeline
        )?.priority;
        const minTimelinePriority = allTimelineOptions.find(
          (t) => t.value === selectedService.minTimeline
        )?.priority;

        if (selectedTimelinePriority < minTimelinePriority) {
          // Reset timeline if it's faster than the minimum for the selected service
          setFormData((prev) => ({
            ...prev,
            timeline: "",
          }));
        }
      }
    }
  }, [formData.serviceType]);

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = "Please select a service type";
      }
    }

    if (step === 2) {
      if (!formData.projectName.trim()) {
        newErrors.projectName = "Project name is required";
      }
      if (!formData.projectDescription.trim()) {
        newErrors.projectDescription = "Please provide a brief description";
      }
      if (formData.projectGoals.length === 0) {
        newErrors.projectGoals = "Please select at least one goal";
      }
    }

    if (step === 3) {
      if (!formData.budget) {
        newErrors.budget = "Please select a budget range";
      }
      if (!formData.timeline) {
        newErrors.timeline = "Please select a timeline";
      }
    }

    if (step === 4) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
      }
      if (!formData.industry.trim()) {
        newErrors.industry = "Please specify your industry";
      }
      if (!formData.targetAudience.trim()) {
        newErrors.targetAudience = "Please describe your target audience";
      }
    }

    if (step === 5) {
      if (!formData.name.trim()) {
        newErrors.name = "Your name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleServiceSelection = (serviceId) => {
    setFormData({
      ...formData,
      serviceType: serviceId,
    });
    setErrors({
      ...errors,
      serviceType: "",
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        projectGoals: [...formData.projectGoals, value],
      });
    } else {
      setFormData({
        ...formData,
        projectGoals: formData.projectGoals.filter((goal) => goal !== value),
      });
    }

    // Clear error when field is changed
    if (errors.projectGoals) {
      setErrors({
        ...errors,
        projectGoals: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validateStep()) {
      setIsSubmitting(true);

      try {
        const response = await submitProjectForm(formData);
        console.log("Form data submitted:", response);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setApiError(
          typeof error === "string"
            ? error
            : "There was an error submitting your request. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              What type of website do you need?
            </h3>
            <p className="text-gray-600">
              Select the service that best matches your requirements:
            </p>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === service.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => handleServiceSelection(service.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start mb-3">
                    <span className="mr-3 text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-bold">{service.title}</h4>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {formData.serviceType === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-3 mt-3 text-sm text-gray-600 border-t border-gray-200"
                    >
                      <p className="mb-2">{service.details}</p>
                      <div className="flex flex-col gap-1 mt-3">
                        <p className="font-medium text-primary">
                          Starting from ₹{getServiceBasePrice(service.id)}
                        </p>
                        <p className="font-medium text-accent">
                          Delivery time: {service.timelineText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {errors.serviceType && (
              <p className="mt-2 text-red-500">{errors.serviceType}</p>
            )}
          </div>
        );

      case 2:
        const selectedService = services.find(
          (s) => s.id === formData.serviceType
        );

        return (
          <div className="space-y-6">
            <div className="flex items-center mb-2 space-x-3">
              <span className="text-2xl">{selectedService?.icon}</span>
              <h3 className="text-2xl font-bold">
                {selectedService?.title} Details
              </h3>
            </div>
            <p className="text-gray-600">
              Tell us more about your project requirements:
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., My Online Store"
                />
                {errors.projectName && (
                  <p className="mt-1 text-red-500">{errors.projectName}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="projectDescription"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Describe your project, including key features and functionality you need..."
                ></textarea>
                {errors.projectDescription && (
                  <p className="mt-1 text-red-500">
                    {errors.projectDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Project Goals (select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {projectGoalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={goal.id}
                        name="projectGoals"
                        value={goal.id}
                        checked={formData.projectGoals.includes(goal.id)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor={goal.id} className="ml-2 text-gray-700">
                        {goal.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.projectGoals && (
                  <p className="mt-1 text-red-500">{errors.projectGoals}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        // Get available budget ranges and timeline options based on selected service
        const availableBudgets = getAvailableBudgetRanges();
        const availableTimelines = getAvailableTimelineOptions();
        const selectedServiceForBudget = services.find(
          (s) => s.id === formData.serviceType
        );

        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Budget & Timeline</h3>
            <p className="text-gray-600">
              Help us understand your project constraints:
            </p>

            <div className="mt-6 space-y-8">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  What's your budget range?
                </label>
                {selectedServiceForBudget && (
                  <div className="flex items-start gap-2 p-3 mb-3 rounded-lg bg-primary/5">
                    <Info
                      size={18}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-primary">
                        {selectedServiceForBudget.title}
                      </span>{" "}
                      projects start from{" "}
                      <span className="font-medium text-primary">
                        ₹{getServiceBasePrice(formData.serviceType)}
                      </span>
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {availableBudgets.map((range) => (
                    <div
                      key={range.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.budget === range.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() =>
                        handleChange({
                          target: { name: "budget", value: range.value },
                        })
                      }
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.budget === range.value
                              ? "border-primary"
                              : "border-gray-400"
                          }`}
                        >
                          {formData.budget === range.value && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span>{range.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.budget && (
                  <p className="mt-1 text-red-500">{errors.budget}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  When do you need this project completed?
                </label>
                {selectedServiceForBudget && (
                  <div className="flex items-start gap-2 p-3 mb-3 rounded-lg bg-accent/5">
                    <Info
                      size={18}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-accent">
                        {selectedServiceForBudget.title}
                      </span>{" "}
                      projects require at least{" "}
                      <span className="font-medium text-accent">
                        {selectedServiceForBudget.timelineText}
                      </span>{" "}
                      to complete
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {availableTimelines.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.timeline === option.value
                          ? "border-accent bg-accent/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        handleChange({
                          target: { name: "timeline", value: option.value },
                        })
                      }
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.timeline === option.value
                              ? "border-accent"
                              : "border-gray-400"
                          }`}
                        >
                          {formData.timeline === option.value && (
                            <div className="w-3 h-3 rounded-full bg-accent"></div>
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.timeline && (
                  <p className="mt-1 text-red-500">{errors.timeline}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Company/Brand Information</h3>
            <p className="text-gray-600">Tell us about your business:</p>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="companyName"
                >
                  Company/Brand Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your company or brand name"
                />
                {errors.companyName && (
                  <p className="mt-1 text-red-500">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="companyWebsite"
                >
                  Existing Website (if any)
                </label>
                <input
                  type="text"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="industry"
                >
                  Industry/Sector
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Fashion, Technology, Education"
                />
                {errors.industry && (
                  <p className="mt-1 text-red-500">{errors.industry}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="targetAudience"
                >
                  Target Audience
                </label>
                <textarea
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Describe your target audience (age, interests, demographics)"
                ></textarea>
                {errors.targetAudience && (
                  <p className="mt-1 text-red-500">{errors.targetAudience}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-gray-600">How can we reach you?</p>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your contact number"
                />
              </div>

              <div className="p-4 mt-6 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">
                  By submitting this form, you agree to our privacy policy and
                  terms of service. We'll use your information to respond to
                  your inquiry and may contact you about our services.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">
          Request Submitted Successfully!
        </h3>
        <p className="mb-6 text-gray-600">
          Thank you for your interest. We've received your project details and
          will get back to you within 24 hours.
        </p>
        <p className="mb-8 text-gray-600">
          Meanwhile, you might want to check our process or book a discovery
          call with our team.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setActiveSection("process")}
            className="px-6 py-3 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
          >
            View Our Process
          </button>
          <button
            onClick={() => setActiveSection("booking")}
            className="px-6 py-3 transition-colors border rounded-lg border-primary text-primary hover:bg-primary/10"
          >
            Book a Discovery Call
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Step {step} of 5</span>
          <span className="text-sm font-medium">
            {(step / 5) * 100}% Complete
          </span>
        </div>
        <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
          {apiError}
        </div>
      )}

      {/* Form content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <button
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
        ) : (
          <div></div>
        )}

        {step < 5 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 text-white transition-opacity rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-6 py-3 text-white transition-opacity rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-70"
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
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <ChevronRight size={20} className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
