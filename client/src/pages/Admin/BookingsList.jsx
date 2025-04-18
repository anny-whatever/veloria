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
          <h1 className="text-2xl font-bold text-zinc-100">Bookings</h1>
          <p className="text-zinc-400">
            Manage discovery calls and consultations
          </p>
        </div>

        <div className="flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0">
          <Link
            to="/admin/bookings/calendar"
            className="flex items-center px-4 py-2 text-sm rounded-md bg-zinc-900 text-zinc-200 hover:bg-zinc-800/80 transition-colors"
          >
            <Calendar size={16} className="mr-2" />
            <span>View Calendar</span>
          </Link>

          <Link
            to="/admin/bookings/new"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            <span>New Booking</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-zinc-950 border border-zinc-800/80 rounded-lg shadow-sm md:grid-cols-3">
        <div>
          <label
            className="block mb-1 text-sm font-medium text-zinc-400"
            htmlFor="search"
          >
            Search
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-zinc-500" />
            </span>
            <input
              type="text"
              id="search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1.5 pl-10 pr-4 text-sm bg-zinc-900/50 text-zinc-200 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            className="block mb-1 text-sm font-medium text-zinc-400"
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
            className="block mb-1 text-sm font-medium text-zinc-400"
            htmlFor="projectType"
          >
            Project Type
          </label>
          <select
            id="projectType"
            value={projectTypeFilter}
            onChange={(e) => setProjectTypeFilter(e.target.value)}
            className="w-full py-1.5 pl-3 pr-10 text-sm bg-zinc-900/50 text-zinc-200 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="all" className="bg-zinc-900 text-zinc-200">
              All Projects
            </option>
            <option
              value="Website Development"
              className="bg-zinc-900 text-zinc-200"
            >
              Website Development
            </option>
            <option value="Mobile App" className="bg-zinc-900 text-zinc-200">
              Mobile App
            </option>
            <option
              value="Custom Software"
              className="bg-zinc-900 text-zinc-200"
            >
              Custom Software
            </option>
            <option value="UI/UX Design" className="bg-zinc-900 text-zinc-200">
              UI/UX Design
            </option>
            <option
              value="Digital Marketing"
              className="bg-zinc-900 text-zinc-200"
            >
              Digital Marketing
            </option>
            <option value="E-commerce" className="bg-zinc-900 text-zinc-200">
              E-commerce
            </option>
            <option value="Other" className="bg-zinc-900 text-zinc-200">
              Other
            </option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label
            className="block mb-1 text-sm font-medium text-zinc-400"
            htmlFor="sortBy"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-1.5 pl-3 pr-10 text-sm bg-zinc-900/50 text-zinc-200 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="newest" className="bg-zinc-900 text-zinc-200">
              Newest First
            </option>
            <option value="oldest" className="bg-zinc-900 text-zinc-200">
              Oldest First
            </option>
            <option value="name" className="bg-zinc-900 text-zinc-200">
              Name (A-Z)
            </option>
            <option value="upcoming" className="bg-zinc-900 text-zinc-200">
              Upcoming Date
            </option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-zinc-400">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      {/* Bookings list */}
      {filteredBookings.length === 0 ? (
        <div className="p-8 text-center bg-zinc-950 rounded-lg shadow-sm">
          <Calendar size={48} className="mx-auto mb-4 text-zinc-300" />
          <h3 className="mb-2 text-lg font-medium text-zinc-100">
            No bookings found
          </h3>
          <p className="text-zinc-500">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no discovery call bookings yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-zinc-800/80 rounded-lg shadow-sm bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-zinc-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase"
                  >
                    Project Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase"
                  >
                    Location/Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="transition-colors hover:bg-zinc-900/60"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <div className="flex items-center justify-center w-full h-full text-sm font-medium text-white rounded-full bg-gradient-to-br from-primary-500 to-secondary-600">
                            {booking.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-zinc-100">
                            {booking.name}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {booking.email}
                          </div>
                          {booking.company && (
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {booking.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300 whitespace-nowrap">
                      {booking.projectType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-zinc-300">
                        <Clock size={14} className="mr-1.5 text-zinc-500" />
                        {
                          format(
                            new Date(booking.date),
                            "EEE, MMM d, yyyy 'at' h:mm a"
                          ) // Example: Tue, Jun 25, 2024 at 10:00 AM
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-zinc-300">
                        {booking.locationType === "virtual" && (
                          <Monitor size={14} className="mr-1.5 text-zinc-500" />
                        )}
                        {booking.locationType === "phone" && (
                          <Phone size={14} className="mr-1.5 text-zinc-500" />
                        )}
                        {booking.locationType === "in-person" && (
                          <MapPin size={14} className="mr-1.5 text-zinc-500" />
                        )}
                        <span>
                          {booking.locationType === "virtual"
                            ? "Virtual Meeting"
                            : booking.locationType === "phone"
                            ? "Phone Call"
                            : booking.locationType === "in-person"
                            ? "In-Person Meeting"
                            : booking.locationType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/bookings/${booking._id}`}
                          className="p-1.5 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-primary-400 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="p-1.5 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-sm text-center text-zinc-500"
                    >
                      No bookings found matching your criteria.
                    </td>
                  </tr>
                )}
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
        itemName={bookingToDelete?.name || "this booking"}
      />
    </div>
  );
};

// Helper function for status colors (example)
const getStatusColor = (status) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300/30";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300/30";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300/30";
    case "rescheduled":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-300/30";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-700/50";
  }
};

export default BookingsList;
