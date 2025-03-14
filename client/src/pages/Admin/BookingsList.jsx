// client/src/pages/Admin/BookingsList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Filter,
  Search,
  ChevronDown,
  X,
  AlertTriangle,
  Monitor,
  Phone,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import StatusFilter from "./components/StatusFilter";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  // Status options for filter
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "scheduled", label: "Scheduled" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "rescheduled", label: "Rescheduled" },
  ];

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await API.get("/bookings/admin");
        setBookings(response.data);
        setFilteredBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings whenever search term, status filter, or sort changes
  useEffect(() => {
    let result = [...bookings];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.status === statusFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.name.toLowerCase().includes(lowerSearchTerm) ||
          booking.email.toLowerCase().includes(lowerSearchTerm) ||
          (booking.company &&
            booking.company.toLowerCase().includes(lowerSearchTerm)) ||
          booking.projectType.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "upcoming") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter, sortBy]);

  const handleDelete = (booking) => {
    setBookingToDelete(booking);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;

    try {
      await API.delete(`/bookings/admin/${bookingToDelete._id}`);

      // Remove from state
      setBookings(bookings.filter((b) => b._id !== bookingToDelete._id));
      setDeleteModalOpen(false);
      setBookingToDelete(null);
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
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">
          <div className="flex items-center">
            <Calendar size={24} className="mr-2 text-primary" />
            Discovery Call Bookings
          </div>
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm("")}
              >
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter size={18} className="mr-2" />
            Filters
            <ChevronDown size={18} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Filters section */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <StatusFilter
              options={statusOptions}
              selected={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name (A to Z)</option>
              <option value="upcoming">Upcoming calls</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSortBy("newest");
              }}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      {/* Bookings list */}
      {filteredBookings.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No bookings found
          </h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no discovery call bookings yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Call Date & Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Project Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary-100">
                          <span className="font-medium text-primary">
                            {booking.name
                              ? booking.name.charAt(0).toUpperCase()
                              : "?"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.email}
                          </div>
                          {booking.company && (
                            <div className="text-xs text-gray-400">
                              {booking.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900">
                          {format(new Date(booking.date), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" /> {booking.time}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <MapPin size={14} className="mr-1" />{" "}
                          {booking.timezone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.projectType}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        {booking.callType === "video" ? (
                          <Monitor size={14} className="mr-1 text-blue-500" />
                        ) : (
                          <Phone size={14} className="mr-1 text-green-500" />
                        )}
                        {booking.callType === "video"
                          ? "Video Call"
                          : "Phone Call"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
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
                        }`}
                      >
                        {booking.status
                          ? booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)
                          : "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/bookings/${booking._id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Booking"
        message={`Are you sure you want to delete the booking for ${bookingToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default BookingsList;
