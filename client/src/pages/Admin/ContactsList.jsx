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
        <div className="w-12 h-12 border-4 border-zinc-300 rounded-full border-t-primary-600 animate-spin"></div>
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
          <h1 className="text-2xl font-bold text-zinc-100">Contact Messages</h1>
          <p className="text-zinc-400">
            Manage customer inquiries and messages
          </p>
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
              { value: "new", label: "New" },
              { value: "read", label: "Read" },
              { value: "replied", label: "Replied" },
              { value: "archived", label: "Archived" },
            ]}
          />
        </div>

        <div>
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
              Newest first
            </option>
            <option value="oldest" className="bg-zinc-900 text-zinc-200">
              Oldest first
            </option>
            <option value="name" className="bg-zinc-900 text-zinc-200">
              Name (A-Z)
            </option>
          </select>
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="p-8 text-center bg-zinc-950 border border-zinc-800/80 rounded-lg shadow-sm">
          <MessageCircle size={48} className="mx-auto mb-4 text-zinc-700" />
          <h3 className="mb-2 text-lg font-medium text-zinc-100">
            No contact messages found
          </h3>
          <p className="text-zinc-500">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no customer contact messages yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-zinc-800/80 rounded-lg shadow-sm bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase">
                    Message Snippet
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase">
                    Received
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-400 uppercase">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="transition-colors hover:bg-zinc-900/60"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <div className="flex items-center justify-center w-full h-full text-sm font-medium text-white rounded-full bg-gradient-to-br from-primary-500 to-secondary-600">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-zinc-100">
                            {contact.name}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center mt-1 text-xs text-zinc-500">
                              <Phone size={12} className="mr-1" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-300 whitespace-nowrap">
                      {truncateText(contact.subject, 40) || "(No Subject)"}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {truncateText(contact.message, 60)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-zinc-300">
                        <Clock size={14} className="mr-1.5 text-zinc-500" />
                        {formatDistanceToNow(new Date(contact.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/contacts/${contact._id}`}
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
                          onClick={() => handleDelete(contact)}
                          className="p-1.5 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
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
        itemName={contactToDelete?.name || "this contact"}
      />
    </div>
  );
};

// Helper function for status colors (example)
const getStatusColor = (status) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300/30";
    case "read":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300/30";
    case "replied":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300/30";
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-700/50";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-700/50";
  }
};

export default ContactsList;
