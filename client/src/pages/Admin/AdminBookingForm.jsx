import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  ChevronLeft,
  Save,
  Video,
  MessageSquare,
} from "lucide-react";
import API from "../../api";

const AdminBookingForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
    time: "10:00",
    timezone: "GMT+0530 (India Standard Time)",
    callType: "video",
    projectType: "Website Development",
    additionalInfo: "",
    status: "scheduled",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Create new booking
      const response = await API.post("/bookings/admin", formData);

      // Redirect to the newly created booking
      navigate(`/admin/bookings/${response.data._id}`);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(
        "Failed to create booking. Please check the form and try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Create New Booking
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Schedule a new discovery call or consultation
          </p>
        </div>
        <Link
          to="/admin/bookings"
          className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Bookings
        </Link>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-sm space-y-6 border dark:border-zinc-800"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Client Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Client Information
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Full Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="Company Name (Optional)"
                />
              </div>
            </div>
          </div>

          {/* Call Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Call Information
            </h2>

            <div>
              <label
                htmlFor="date"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Call Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Call Time*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Clock
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timezone"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Timezone*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="callType"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Call Type*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Video
                    size={16}
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                </div>
                <select
                  id="callType"
                  name="callType"
                  value={formData.callType}
                  onChange={handleInputChange}
                  required
                  className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option
                    value="video"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Video Call
                  </option>
                  <option
                    value="phone"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Phone Call
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Project Information
          </h2>

          <div>
            <label
              htmlFor="projectType"
              className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Project Type*
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              required
              className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option
                value="Website Development"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                Website Development
              </option>
              <option
                value="Mobile App"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                Mobile App
              </option>
              <option
                value="Custom Software"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                Custom Software
              </option>
              <option
                value="UI/UX Design"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                UI/UX Design
              </option>
              <option
                value="Digital Marketing"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                Digital Marketing
              </option>
              <option
                value="E-commerce"
                className="bg-zinc-100 dark:bg-zinc-900"
              >
                E-commerce
              </option>
              <option value="Other" className="bg-zinc-100 dark:bg-zinc-900">
                Other
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="additionalInfo"
              className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
              placeholder="Any extra details about the project or call..."
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Admin Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
              placeholder="Internal notes about this booking..."
            ></textarea>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-6 border-t dark:border-zinc-700">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full px-6 py-2.5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
          >
            {loading ? (
              <svg
                className="w-5 h-5 text-white animate-spin"
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
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Create Booking
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookingForm;
