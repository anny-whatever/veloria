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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create New Booking
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Schedule a new discovery call or consultation
          </p>
        </div>
        <Link
          to="/admin/bookings"
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Client Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Client Information
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Briefcase
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  placeholder="Company Name (Optional)"
                />
              </div>
            </div>
          </div>

          {/* Call Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Call Information
            </h2>

            <div>
              <label
                htmlFor="date"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Call Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Call Time*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timezone"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Timezone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin
                    size={16}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                  placeholder="GMT+0530 (India Standard Time)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="callType"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Call Type*
              </label>
              <select
                id="callType"
                name="callType"
                value={formData.callType}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
              >
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Project Information
          </h2>

          <div>
            <label
              htmlFor="projectType"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Project Type*
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
            >
              <option value="Website Development">Website Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Custom Software">Custom Software</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="additionalInfo"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Additional Information
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <MessageSquare
                  size={16}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                placeholder="Any specific requirements or questions..."
              ></textarea>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Admin Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
              placeholder="Internal notes about this booking..."
            ></textarea>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3">
          <Link
            to="/admin/bookings"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookingForm;
