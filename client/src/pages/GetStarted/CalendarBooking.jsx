// src/pages/GetStarted/CalendarBooking.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Monitor,
  Phone,
  VideoIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { scheduleDiscoveryCall } from "../../api";

const CalendarBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    timezone: "Asia/Kolkata",
    callType: "video",
    projectType: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  // Current date for the calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  const timezones = [
    { value: "Asia/Kolkata", label: "Indian Standard Time (IST)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Asia/Singapore", label: "Singapore Time (SGT)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  ];

  const callTypes = [
    { id: "video", label: "Video Call", icon: <VideoIcon size={20} /> },
    { id: "phone", label: "Phone Call", icon: <Phone size={20} /> },
  ];

  const projectTypes = [
    "E-commerce Website",
    "Blog/Content Website",
    "Portfolio Website",
    "Landing Page",
    "Custom Website",
    "Website Redesign",
    "Not sure yet",
  ];

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1).getDay();

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get today's date
    const today = new Date();

    // Create array for days
    const days = [];

    // Add empty days for beginning of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, date: null });
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      // Check if date is in the past
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));

      // Check if it's a weekend
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push({
        day,
        date,
        isDisabled: isPast || isWeekend,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setFormData({
      ...formData,
      date: date.toISOString().split("T")[0],
      time: "",
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      time,
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setSelectedTime(null);
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

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!selectedDate) {
        newErrors.date = "Please select a date";
      }
      if (!selectedTime) {
        newErrors.time = "Please select a time slot";
      }
      if (!formData.timezone) {
        newErrors.timezone = "Please select your timezone";
      }
      if (!formData.callType) {
        newErrors.callType = "Please select call type";
      }
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.projectType) {
        newErrors.projectType = "Please select a project type";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validateStep()) {
      setIsSubmitting(true);

      try {
        // Call API to schedule the call
        const response = await scheduleDiscoveryCall(formData);
        console.log("Booking submitted:", response);

        // Set booking details from response
        setBookingDetails(response.booking);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error scheduling call:", error);
        setApiError(
          typeof error === "string"
            ? error
            : "There was an error scheduling your call. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
        <h3 className="mb-2 text-2xl font-bold">Discovery Call Scheduled!</h3>
        <p className="max-w-lg mx-auto mb-8 text-gray-600">
          Your discovery call has been scheduled for{" "}
          {new Date(formData.date).toLocaleDateString()} at {formData.time}.
          You'll receive a confirmation email with the call details shortly.
        </p>
        <div className="max-w-md p-6 mx-auto mb-8 border border-gray-200 bg-gray-50 rounded-xl">
          <div className="flex items-start mb-4">
            <Calendar
              size={20}
              className="flex-shrink-0 mt-1 mr-3 text-primary"
            />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-gray-600">
                {new Date(formData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <Clock size={20} className="flex-shrink-0 mt-1 mr-3 text-primary" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-gray-600">
                {formData.time} ({formData.timezone})
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <VideoIcon
              size={20}
              className="flex-shrink-0 mt-1 mr-3 text-primary"
            />
            <div>
              <p className="font-medium">Call Type</p>
              <p className="text-gray-600">
                {formData.callType === "video"
                  ? "Video Call (Zoom)"
                  : "Phone Call"}
              </p>
            </div>
          </div>

          {bookingDetails?.meetingDetails?.link && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <a
                href={bookingDetails.meetingDetails.link}
                className="font-medium text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Zoom Meeting
              </a>
            </div>
          )}
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 text-white rounded-lg bg-gradient-to-r from-primary to-secondary"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold">Book a Discovery Call</h3>
        <p className="text-gray-600">
          Schedule a free 30-minute consultation to discuss your project needs.
        </p>
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
          {apiError}
        </div>
      )}

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of 2</span>
          <span className="text-sm font-medium">
            {currentStep === 1 ? "50%" : "100%"} Complete
          </span>
        </div>
        <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: currentStep === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      <motion.div
        key={currentStep}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentStep === 1 ? (
          <div>
            <h4 className="mb-6 text-xl font-semibold">Select Date & Time</h4>

            {/* Calendar */}
            <div className="mb-8">
              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h5 className="font-medium">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h5>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="py-2 text-sm font-medium text-center text-gray-600"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center h-12"
                      >
                        {day.day && (
                          <button
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              day.isDisabled
                                ? "text-gray-300 cursor-not-allowed"
                                : selectedDate &&
                                  selectedDate.getTime() === day.date.getTime()
                                ? "bg-primary text-white"
                                : day.isToday
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-gray-100"
                            }`}
                            disabled={day.isDisabled}
                            onClick={() =>
                              !day.isDisabled && handleDateSelect(day.date)
                            }
                          >
                            {day.day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {errors.date && (
                <p className="mt-1 text-red-500">{errors.date}</p>
              )}
            </div>

            {/* Time slots */}
            <div className="mb-8">
              <label className="block mb-2 font-medium text-gray-700">
                Select a Time
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-4 rounded-lg border transition-colors ${
                      selectedTime === time
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-red-500">{errors.time}</p>
              )}
            </div>

            {/* Timezone */}
            <div className="mb-8">
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="timezone"
              >
                Your Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              {errors.timezone && (
                <p className="mt-1 text-red-500">{errors.timezone}</p>
              )}
            </div>

            {/* Call Type */}
            <div className="mb-8">
              <label className="block mb-2 font-medium text-gray-700">
                Call Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {callTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.callType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "callType", value: type.id },
                      })
                    }
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          formData.callType === type.id
                            ? "bg-primary/20 text-primary"
                            : "bg-gray-100 text-gray-500"
                        } flex items-center justify-center mr-3`}
                      >
                        {type.icon}
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.callType && (
                <p className="mt-1 text-red-500">{errors.callType}</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-6 text-xl font-semibold">Your Information</h4>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                <div>
                  <label
                    className="block mb-2 font-medium text-gray-700"
                    htmlFor="company"
                  >
                    Company/Brand (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your company or brand name"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="projectType"
                >
                  What type of project are you interested in?
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-red-500">{errors.projectType}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="additionalInfo"
                >
                  Anything specific you'd like to discuss? (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Share any specific topics or questions you'd like to discuss during the call..."
                ></textarea>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center mb-3">
                  <Users size={20} className="mr-3 text-primary" />
                  <h5 className="font-medium">Your Discovery Call Details</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-600 pl-9">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedDate &&
                      new Date(formData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {formData.time} (
                    {formData.timezone})
                  </p>
                  <p>
                    <span className="font-medium">Call Type:</span>{" "}
                    {formData.callType === "video"
                      ? "Video Call (Zoom)"
                      : "Phone Call"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-10">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < 2 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 text-white transition-opacity rounded-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Continue
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
                Scheduling...
              </>
            ) : (
              <>
                Schedule Call
                <Calendar size={20} className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarBooking;
