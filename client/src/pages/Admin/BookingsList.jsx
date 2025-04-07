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
  PlusCircle,
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
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
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

    // Apply project type filter
    if (projectTypeFilter !== "all") {
      result = result.filter(
        (booking) => booking.projectType === projectTypeFilter
      );
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
  }, [bookings, searchTerm, statusFilter, projectTypeFilter, sortBy]);

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage discovery calls and consultations
          </p>
        </div>

        <div className="flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0">
          <Link
            to="/admin/bookings/calendar"
            className="flex items-center px-4 py-2 text-sm rounded-md bg-accent/10 text-accent dark:text-accent-400"
          >
            <Calendar size={16} className="mr-2" />
            <span>View Calendar</span>
          </Link>

          <Link
            to="/admin/bookings/new"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            <PlusCircle size={16} className="mr-2" />
            <span>New Booking</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm md:grid-cols-3">
        <div>
          <label
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="search"
          >
            Search
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-gray-400 dark:text-gray-500" />
            </span>
            <input
              type="text"
              id="search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="statusFilter"
          >
            Status
          </label>
          <StatusFilter
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "scheduled", label: "Scheduled" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
              { value: "rescheduled", label: "Rescheduled" },
            ]}
          />
        </div>

        <div>
          <label
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="projectType"
          >
            Project Type
          </label>
          <select
            id="projectType"
            value={projectTypeFilter}
            onChange={(e) => setProjectTypeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Projects</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Custom Software">Custom Software</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      {/* Bookings list */}
      {filteredBookings.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Calendar
            size={48}
            className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
          />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No bookings found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no discovery call bookings yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Call Date & Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Project Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30">
                          <span className="font-medium text-primary dark:text-primary-400">
                            {booking.name
                              ? booking.name.charAt(0).toUpperCase()
                              : "?"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {booking.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.email}
                          </div>
                          {booking.company && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              {booking.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {format(new Date(booking.date), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} className="mr-1" /> {booking.time}
                        </div>
                        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                          <MapPin size={14} className="mr-1" />{" "}
                          {booking.timezone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {booking.projectType}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {booking.callType === "video" ? (
                          <Monitor
                            size={14}
                            className="mr-1 text-blue-500 dark:text-blue-400"
                          />
                        ) : (
                          <Phone
                            size={14}
                            className="mr-1 text-green-500 dark:text-green-400"
                          />
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
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : ""
                        } 
                        ${
                          booking.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : ""
                        } 
                        ${
                          booking.status === "cancelled"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ""
                        } 
                        ${
                          booking.status === "rescheduled"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
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
                          className="text-primary dark:text-primary-400 hover:text-primary-dark dark:hover:text-primary-300"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
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
