// client/src/pages/Admin/BookingDetails.jsx - With improved error handling
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Video,
  MessageSquare,
  Check,
  ChevronLeft,
  Trash2,
  Link as LinkIcon,
  AlertTriangle,
  Edit,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
    meetingLink: "",
  });

  // Check if this is a new booking form or if id is undefined/invalid
  const isNewBooking = id === "new";
  const isValidId = id && id !== "undefined" && id !== "null";

  useEffect(() => {
    const fetchBooking = async () => {
      // If we don't have a valid ID and it's not explicitly a new booking,
      // navigate to the bookings list
      if (!isValidId && !isNewBooking) {
        console.log("Invalid booking ID detected:", id);
        navigate("/admin/bookings");
        return;
      }

      // If it's a new booking, initialize with default values instead of fetching
      if (isNewBooking) {
        const defaultBooking = {
          name: "",
          email: "",
          phone: "",
          company: "",
          date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
          time: "10:00",
          timezone: "GMT+0530 (India Standard Time)",
          callType: "video",
          projectType: "Website",
          additionalInfo: "",
          status: "scheduled",
          notes: "",
        };
        setBooking(defaultBooking);
        setEditedData({
          status: defaultBooking.status,
          notes: defaultBooking.notes,
          meetingLink: "",
        });
        setEditMode(true); // Automatically enter edit mode for new bookings
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching booking with ID:", id);
        const response = await API.get(`/bookings/admin/${id}`);
        setBooking(response.data);
        setEditedData({
          status: response.data.status || "scheduled",
          notes: response.data.notes || "",
          meetingLink: response.data.meetingLink || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("Failed to load booking details. Please try again.");
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, isNewBooking, navigate, isValidId]);

  const handleStatusChange = (e) => {
    setEditedData({
      ...editedData,
      status: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // For new bookings, create a new record
      if (isNewBooking) {
        // Create new booking
        const response = await API.post("/bookings/admin", booking);
        // Redirect to the newly created booking
        navigate(`/admin/bookings/${response.data._id}`);
        return;
      }

      // For existing bookings, update
      const response = await API.patch(`/bookings/admin/${id}`, editedData);
      setBooking(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/bookings/admin/${id}`);
      setDeleteModalOpen(false);
      navigate("/admin/bookings");
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-zinc-300 rounded-full border-t-primary-500 animate-spin dark:border-zinc-700 dark:border-t-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-4 py-2 mt-4 text-sm text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:text-red-300 dark:bg-red-900/30 dark:hover:bg-red-900/50"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!booking && !isNewBooking) {
    return (
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Booking Not Found</h3>
        </div>
        <p>
          The booking you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/admin/bookings"
          className="inline-block px-4 py-2 mt-4 text-sm transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700 dark:text-amber-300 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
        >
          Go Back to Bookings
        </Link>
      </div>
    );
  }

  // Format the booking date
  const formattedDate = booking.date
    ? format(new Date(booking.date), "MMMM d, yyyy")
    : "Unknown date";

  return (
    <div className="text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/admin/bookings"
            className="p-2 mr-4 transition-colors rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">
            {isNewBooking ? "New Booking" : "Booking Details"}
          </h1>
        </div>

        <div className="flex space-x-3">
          {editMode ? (
            <>
              <button
                onClick={() =>
                  isNewBooking
                    ? navigate("/admin/bookings")
                    : setEditMode(false)
                }
                className="px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex items-center px-4 py-2 text-sm text-white rounded-md bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                <Save size={16} className="mr-1.5" />
                {isNewBooking ? "Create Booking" : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <Edit size={16} className="mr-1.5" />
                Edit Booking
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} className="mr-1.5" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="mb-4 text-xl font-semibold">Client Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem icon={User} label="Name" value={booking.name} />
              <DetailItem icon={Mail} label="Email" value={booking.email} />
              {booking.phone && (
                <DetailItem icon={Phone} label="Phone" value={booking.phone} />
              )}
              {booking.company && (
                <DetailItem
                  icon={Briefcase}
                  label="Company"
                  value={booking.company}
                />
              )}
            </div>
          </div>

          <div className="p-6 border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="mb-4 text-xl font-semibold">Booking Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem icon={Calendar} label="Date" value={formattedDate} />
              <DetailItem icon={Clock} label="Time" value={booking.time} />
              <DetailItem
                icon={MapPin}
                label="Timezone"
                value={booking.timezone}
              />
              <DetailItem
                icon={Video}
                label="Call Type"
                value={
                  booking.callType === "video" ? "Video Call" : "Phone Call"
                }
              />
              <DetailItem
                icon={Check}
                label="Project Type"
                value={booking.projectType}
              />
            </div>
            {booking.meetingLink && (
              <div className="mt-4">
                <DetailItem
                  icon={LinkIcon}
                  label="Meeting Link"
                  value={booking.meetingLink}
                  isLink={true}
                />
              </div>
            )}
            {booking.additionalInfo && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Additional Information
                </h3>
                <p className="text-sm whitespace-pre-wrap">
                  {booking.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Status & Notes */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="mb-4 text-xl font-semibold">Status & Notes</h2>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Booking Status
              </label>
              {editMode ? (
                <select
                  id="status"
                  name="status"
                  value={editedData.status}
                  onChange={handleStatusChange}
                  className="w-full p-2 text-sm border rounded-md bg-white dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option
                    value="scheduled"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Scheduled
                  </option>
                  <option
                    value="completed"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Completed
                  </option>
                  <option
                    value="cancelled"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Cancelled
                  </option>
                  <option
                    value="rescheduled"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Rescheduled
                  </option>
                </select>
              ) : (
                <StatusBadge status={booking.status} />
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Admin Notes
              </label>
              {editMode ? (
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={editedData.notes}
                  onChange={(e) =>
                    setEditedData({ ...editedData, notes: e.target.value })
                  }
                  className="w-full p-2 text-sm border rounded-md bg-white dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="Add internal notes here..."
                />
              ) : (
                <p className="text-sm whitespace-pre-wrap">
                  {booking.notes || "No notes added."}
                </p>
              )}
            </div>

            {editMode && (
              <div>
                <label
                  htmlFor="meetingLink"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Meeting Link (Optional)
                </label>
                <input
                  type="url"
                  id="meetingLink"
                  name="meetingLink"
                  value={editedData.meetingLink}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      meetingLink: e.target.value,
                    })
                  }
                  className="w-full p-2 text-sm border rounded-md bg-white dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="e.g., https://meet.google.com/xyz-abc-def"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={booking.name || "this booking"}
      />
    </div>
  );
};

// Helper component for Detail Items
const DetailItem = ({ icon: Icon, label, value, isLink = false }) => (
  <div>
    <dt className="flex items-center mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
      <Icon size={14} className="mr-1.5" />
      <span>{label}</span>
    </dt>
    <dd className="text-sm">
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </dd>
  </div>
);

// Helper component for Status Badge
const StatusBadge = ({ status }) => {
  const colors = {
    scheduled:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300/30",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300/30",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300/30",
    rescheduled:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-300/30",
  };

  const statusText = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
        colors[status] ||
        "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-300/30"
      }`}
    >
      {statusText}
    </span>
  );
};

export default BookingDetails;
