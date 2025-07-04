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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-600">
          <CheckCircle size={32} className="text-white" />
        </div>
        <h3 className="mb-3 text-xl font-light text-white">
          Discovery Call Scheduled
        </h3>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-6" />
        <p className="max-w-lg mx-auto mb-8 text-gray-400 font-light leading-relaxed">
          Your discovery call has been scheduled for{" "}
          {new Date(formData.date).toLocaleDateString()} at {formData.time}.
          You'll receive a confirmation email with the call details shortly.
        </p>
        <div className="max-w-md p-6 mx-auto mb-8 border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar
                size={18}
                className="flex-shrink-0 mt-1 text-gray-400"
              />
              <div>
                <p className="font-light text-white">Date</p>
                <p className="text-sm text-gray-400">
                  {new Date(formData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="flex-shrink-0 mt-1 text-gray-400" />
              <div>
                <p className="font-light text-white">Time</p>
                <p className="text-sm text-gray-400">
                  {formData.time} ({formData.timezone})
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <VideoIcon
                size={18}
                className="flex-shrink-0 mt-1 text-gray-400"
              />
              <div>
                <p className="font-light text-white">Call Type</p>
                <p className="text-sm text-gray-400">
                  {formData.callType === "video"
                    ? "Video Call (Zoom)"
                    : "Phone Call"}
                </p>
              </div>
            </div>

            {bookingDetails?.meetingDetails?.link && (
              <div className="pt-4 mt-4 border-t border-gray-800">
                <a
                  href={bookingDetails.meetingDetails.link}
                  className="font-light text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Zoom Meeting
                </a>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-white text-black font-light transition-all duration-300 hover:bg-gray-100"
        >
          Return to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* API Error Message */}
      {apiError && (
        <div className="p-4 mb-6 text-red-300 border border-red-800/50 bg-red-900/20">
          {apiError}
        </div>
      )}

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-light text-gray-300">
            Step {currentStep} of 2
          </span>
          <span className="text-sm font-light text-gray-300">
            {currentStep === 1 ? "50%" : "100%"} Complete
          </span>
        </div>
        <div className="w-full h-2 bg-gray-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-600 to-gray-500"
            initial={{ width: "0%" }}
            animate={{ width: currentStep === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={currentStep}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentStep === 1 ? (
          <div className="space-y-8">
            <div className="mb-6">
              <h4 className="text-lg font-light text-white mb-2">
                Select Date & Time
              </h4>
              <div className="w-8 h-px bg-gray-600" />
            </div>

            {/* Calendar */}
            <div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-light text-white">
                    {currentDate.toLocaleString("default", { month: "long" })}{" "}
                    {currentDate.getFullYear()}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-gray-800 transition-colors"
                    >
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-800 transition-colors"
                    >
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="h-8 flex items-center justify-center text-sm font-light text-gray-400"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center text-sm cursor-pointer transition-all duration-300 ${
                        day.isDisabled
                          ? "text-gray-600 cursor-not-allowed"
                          : day.isToday
                          ? "bg-gray-600 text-white font-light"
                          : selectedDate &&
                            day.date &&
                            day.date.toDateString() ===
                              selectedDate.toDateString()
                          ? "bg-white text-black font-light"
                          : "hover:bg-gray-800 text-gray-300"
                      }`}
                      onClick={() => {
                        if (!day.isDisabled && day.date) {
                          handleDateSelect(day.date);
                        }
                      }}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              </div>
              {errors.date && (
                <p className="mt-2 text-sm text-red-400 font-light">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time slots */}
            <div>
              <label className="block mb-3 font-light text-gray-300">
                Select a Time
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`p-3 text-center cursor-pointer border transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-white text-black border-white"
                        : "border-gray-800 hover:bg-gray-800 text-gray-300 hover:border-gray-700"
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <span className="text-sm font-light">{time}</span>
                  </div>
                ))}
              </div>
              {errors.time && (
                <p className="mt-2 text-sm text-red-400 font-light">
                  {errors.time}
                </p>
              )}
            </div>

            {/* Timezone */}
            <div>
              <label
                className="block mb-3 font-light text-gray-300"
                htmlFor="timezone"
              >
                Your Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="w-full px-0 py-4 border-0 border-b border-gray-800 focus:outline-none focus:border-gray-600 bg-transparent text-white font-light [&>option]:bg-gray-800 [&>option]:text-white"
                style={{ colorScheme: "dark" }}
              >
                {timezones.map((tz) => (
                  <option
                    key={tz.value}
                    value={tz.value}
                    className="bg-gray-800 text-white"
                  >
                    {tz.label}
                  </option>
                ))}
              </select>
              {errors.timezone && (
                <p className="mt-2 text-sm text-red-400 font-light">
                  {errors.timezone}
                </p>
              )}
            </div>

            {/* Call Type */}
            <div>
              <label className="block mb-3 font-light text-gray-300">
                Call Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {callTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 cursor-pointer border transition-all duration-300 ${
                      formData.callType === type.id
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                    }`}
                    onClick={() =>
                      handleChange({
                        target: { name: "callType", value: type.id },
                      })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 flex items-center justify-center ${
                          formData.callType === type.id
                            ? "bg-gray-600 text-white"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {type.icon}
                      </div>
                      <span className="font-light text-white">
                        {type.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.callType && (
                <p className="mt-2 text-sm text-red-400 font-light">
                  {errors.callType}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-6">
              <h4 className="text-lg font-light text-white mb-2">
                Your Information
              </h4>
              <div className="w-8 h-px bg-gray-600" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  className="block mb-3 font-light text-gray-300"
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
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 font-light">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block mb-3 font-light text-gray-300"
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
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 font-light">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  className="block mb-3 font-light text-gray-300"
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
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
                  placeholder="Your contact number"
                />
              </div>

              <div>
                <label
                  className="block mb-3 font-light text-gray-300"
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
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300"
                  placeholder="Your company or brand name"
                />
              </div>
            </div>

            <div>
              <label
                className="block mb-3 font-light text-gray-300"
                htmlFor="projectType"
              >
                What type of project are you interested in?
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-0 py-4 border-0 border-b border-gray-800 focus:outline-none focus:border-gray-600 bg-transparent text-white font-light [&>option]:bg-gray-800 [&>option]:text-white"
                style={{ colorScheme: "dark" }}
              >
                <option value="" className="bg-gray-800 text-white">
                  Select project type
                </option>
                {projectTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-gray-800 text-white"
                  >
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-2 text-sm text-red-400 font-light">
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-3 font-light text-gray-300"
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
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-800 text-white placeholder-gray-400 font-light focus:outline-none focus:border-gray-600 transition-all duration-300 resize-none"
                placeholder="Share any specific topics or questions you'd like to discuss during the call..."
              />
            </div>

            <div className="p-6 border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} className="text-gray-400" />
                <h5 className="font-light text-white">
                  Your Discovery Call Details
                </h5>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-light text-gray-300">Date:</span>
                  <span className="text-gray-400">
                    {selectedDate &&
                      new Date(formData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-light text-gray-300">Time:</span>
                  <span className="text-gray-400">
                    {formData.time} ({formData.timezone})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-light text-gray-300">Call Type:</span>
                  <span className="text-gray-400">
                    {formData.callType === "video"
                      ? "Video Call (Zoom)"
                      : "Phone Call"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-12">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="px-6 py-3 flex items-center gap-2 text-gray-400 bg-gray-900/50 hover:bg-gray-800 transition-colors font-light"
          >
            <ChevronLeft size={18} />
            Back
          </button>
        )}

        {currentStep < 2 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 flex items-center gap-2 text-black bg-white hover:bg-gray-100 transition-colors ml-auto font-light"
          >
            Continue
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 flex items-center gap-2 text-black bg-white hover:bg-gray-100 transition-colors ml-auto font-light disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                Schedule Call
                <ChevronRight size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarBooking;
