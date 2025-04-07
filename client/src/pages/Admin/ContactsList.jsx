// client/src/pages/Admin/ContactsList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Filter,
  Search,
  ChevronDown,
  X,
  AlertTriangle,
  Mail,
  Phone,
  Clock,
  Trash2,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import API from "../../api";
import StatusFilter from "./components/StatusFilter";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Status options for filter
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "read", label: "Read" },
    { value: "replied", label: "Replied" },
    { value: "archived", label: "Archived" },
  ];

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/contact/admin");
        setContacts(response.data);
        setFilteredContacts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to fetch contacts. Please try again.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts whenever search term, status filter, or sort changes
  useEffect(() => {
    let result = [...contacts];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((contact) => contact.status === statusFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerSearchTerm) ||
          contact.email.toLowerCase().includes(lowerSearchTerm) ||
          (contact.subject &&
            contact.subject.toLowerCase().includes(lowerSearchTerm)) ||
          contact.message.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredContacts(result);
  }, [contacts, searchTerm, statusFilter, sortBy]);

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      await API.delete(`/contact/admin/${contactToDelete._id}`);

      // Remove from state
      setContacts(contacts.filter((c) => c._id !== contactToDelete._id));
      setDeleteModalOpen(false);
      setContactToDelete(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact. Please try again.");
    }
  };

  // Function to truncate text to specified length
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
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
            Contact Messages
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage customer inquiries and messages
          </p>
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
              { value: "new", label: "New" },
              { value: "read", label: "Read" },
              { value: "replied", label: "Replied" },
              { value: "archived", label: "Archived" },
            ]}
          />
        </div>

        <div>
          <label
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="sortBy"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <MessageCircle
            size={48}
            className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
          />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No contact messages found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no customer contact messages yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 dark:text-gray-400 uppercase">
                    Date
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
                {/* Map over contacts and render rows */}
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {/* Contact sender information */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30">
                          <span className="font-medium text-secondary dark:text-secondary-400">
                            {contact.name
                              ? contact.name.charAt(0).toUpperCase()
                              : "?"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                              <Phone size={14} className="mr-1" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Subject column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {contact.subject || "No Subject"}
                      </div>
                      <div className="max-w-xs overflow-hidden text-xs text-gray-500 dark:text-gray-400 truncate">
                        {contact.message.substring(0, 60)}
                        {contact.message.length > 60 ? "..." : ""}
                      </div>
                    </td>

                    {/* Date column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {format(new Date(contact.createdAt), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(contact.createdAt), "h:mm a")}
                      </div>
                    </td>

                    {/* Status column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          contact.status === "new"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : ""
                        } 
                        ${
                          contact.status === "read"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            : ""
                        } 
                        ${
                          contact.status === "replied"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : ""
                        } 
                        ${
                          contact.status === "archived"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            : ""
                        }`}
                      >
                        {contact.status
                          ? contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)
                          : "New"}
                      </span>
                    </td>

                    {/* Actions column */}
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/contacts/${contact._id}`}
                          className="text-secondary dark:text-secondary-400 hover:text-secondary-dark dark:hover:text-secondary-300"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(contact)}
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
        title="Delete Contact"
        message={`Are you sure you want to delete the message from ${contactToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ContactsList;
