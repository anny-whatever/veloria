// client/src/pages/Admin/BookingDetails.jsx
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

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
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
  }, [id]);

  const handleStatusChange = (e) => {
    setEditedData({
      ...editedData,
      status: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
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
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Booking Not Found</h3>
        </div>
        <p>
          The booking you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/admin/bookings"
          className="inline-block px-4 py-2 mt-4 transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700"
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
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/admin/bookings"
            className="p-2 mr-4 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Booking Details</h1>
        </div>

        <div className="flex space-x-3">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex items-center px-4 py-2 text-white rounded-md bg-primary hover:bg-primary/90"
              >
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Edit size={18} className="mr-2" />
                Edit Booking
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                <Trash2 size={18} className="mr-2" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Booking Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Booking Overview */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Booking Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex">
                  <Calendar
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Date</h3>
                    <p>{formattedDate}</p>
                  </div>
                </div>

                <div className="flex">
                  <Clock
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Time</h3>
                    <p>
                      {booking.time} ({booking.timezone})
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <Video
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Call Type</h3>
                    <p>
                      {booking.callType === "video"
                        ? "Video Call"
                        : "Phone Call"}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <MessageSquare
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Project Type</h3>
                    <p>{booking.projectType}</p>
                  </div>
                </div>
              </div>

              {booking.additionalInfo && (
                <div className="pt-6 mt-6 border-t">
                  <h3 className="mb-2 font-medium text-gray-700">
                    Additional Information
                  </h3>
                  <p className="text-gray-600">{booking.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Contact Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex">
                  <User
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Name</h3>
                    <p>{booking.name}</p>
                  </div>
                </div>

                <div className="flex">
                  <Mail
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <p className="max-w-xs truncate">{booking.email}</p>
                  </div>
                </div>

                <div className="flex">
                  <Phone
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p>{booking.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex">
                  <Briefcase
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Company</h3>
                    <p>{booking.company || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Status */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Status</h2>
            </div>
            <div className="p-6">
              {editMode ? (
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Update Status
                  </label>
                  <select
                    value={editedData.status}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                      ${
                        booking.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                      ${
                        booking.status === "rescheduled"
                          ? "bg-amber-100 text-amber-800"
                          : ""
                      }
                    `}
                  >
                    {booking.status
                      ? booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)
                      : "Unknown"}
                  </span>
                  <span className="text-gray-500">
                    {booking.status === "scheduled" && "Waiting for the call"}
                    {booking.status === "completed" &&
                      "Call has been completed"}
                    {booking.status === "cancelled" &&
                      "Client cancelled the call"}
                    {booking.status === "rescheduled" &&
                      "Call has been rescheduled"}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700">Created</h3>
                <p className="text-gray-600">
                  {booking.createdAt
                    ? format(
                        new Date(booking.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )
                    : "Unknown"}
                </p>
              </div>

              {editMode ? (
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Meeting Link
                  </label>
                  <input
                    type="text"
                    value={editedData.meetingLink}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        meetingLink: e.target.value,
                      })
                    }
                    placeholder="Add meeting link here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ) : (
                booking.meetingLink && (
                  <div className="mb-4">
                    <h3 className="mb-2 font-medium text-gray-700">
                      Meeting Link
                    </h3>
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <LinkIcon size={16} className="mr-1" />
                      Open Link
                    </a>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Notes</h2>
            </div>
            <div className="p-6">
              {editMode ? (
                <textarea
                  value={editedData.notes}
                  onChange={(e) =>
                    setEditedData({ ...editedData, notes: e.target.value })
                  }
                  rows="5"
                  placeholder="Add your notes about this booking..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                ></textarea>
              ) : booking.notes ? (
                <p className="text-gray-600">{booking.notes}</p>
              ) : (
                <p className="italic text-gray-400">No notes added yet.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-primary hover:bg-primary/90"
                onClick={() => window.open(`mailto:${booking.email}`, "_blank")}
              >
                <Mail size={18} className="mr-2" />
                Email Client
              </button>

              {booking.phone && (
                <button
                  className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open(`tel:${booking.phone}`, "_blank")}
                >
                  <Phone size={18} className="mr-2" />
                  Call Client
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Booking"
        message={`Are you sure you want to delete this booking from ${booking.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default BookingDetails;
