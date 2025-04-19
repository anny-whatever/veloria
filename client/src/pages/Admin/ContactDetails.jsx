// client/src/pages/Admin/ContactDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Check,
  ChevronLeft,
  Trash2,
  AlertTriangle,
  Edit,
  Save,
  Archive,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notesMode, setNotesMode] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/contact/admin/${id}`);
        setContact(response.data);
        setNotesText(response.data.notes || "");
        setEditedData({
          status: response.data.status || "new",
          notes: response.data.notes || "",
        });

        // If this is the first time viewing and status is "new", update to "read"
        if (response.data.status === "new") {
          updateStatusToRead(response.data._id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact details:", err);
        setError("Failed to load contact details. Please try again.");
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const updateStatusToRead = async (contactId) => {
    try {
      const response = await API.patch(`/contact/admin/${contactId}`, {
        status: "read",
      });

      setContact(response.data.data);
    } catch (err) {
      console.error("Error updating contact status:", err);
      // Don't show error to user as this is a background operation
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      const response = await API.patch(`/contact/admin/${id}`, {
        status: newStatus,
      });

      setContact(response.data.data);
      setStatusUpdating(false);
    } catch (err) {
      console.error("Error updating contact status:", err);
      alert("Failed to update status. Please try again.");
      setStatusUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      const response = await API.patch(`/contact/admin/${id}`, {
        notes: notesText,
      });

      setContact(response.data.data);
      setNotesMode(false);
    } catch (err) {
      console.error("Error saving notes:", err);
      alert("Failed to save notes. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await API.patch(`/contact/admin/${id}`, editedData);
      setContact(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating contact:", err);
      alert("Failed to update contact. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/contact/admin/${id}`);
      setDeleteModalOpen(false);
      navigate("/admin/contacts");
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact. Please try again.");
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
          onClick={() => navigate("/admin/contacts")}
          className="px-4 py-2 mt-4 text-sm text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:text-red-300 dark:bg-red-900/30 dark:hover:bg-red-900/50"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Contact Not Found</h3>
        </div>
        <p>
          The contact message you are looking for does not exist or has been
          deleted.
        </p>
        <Link
          to="/admin/contacts"
          className="inline-block px-4 py-2 mt-4 text-sm transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700 dark:text-amber-300 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
        >
          Go Back to Contacts
        </Link>
      </div>
    );
  }

  return (
    <div className="text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/admin/contacts"
            className="p-2 mr-4 transition-colors rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Contact Message</h1>
        </div>

        <div className="flex space-x-3">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex items-center px-4 py-2 text-sm text-white rounded-md bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                <Save size={16} className="mr-1.5" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <Edit size={16} className="mr-1.5" />
                Edit Contact
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

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Message Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Message */}
          <div className="overflow-hidden border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-medium">Message</h2>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {format(
                  new Date(contact.createdAt),
                  "MMMM d, yyyy 'at' h:mm a"
                )}
              </div>
            </div>
            <div className="p-6">
              {editMode ? (
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contact.subject || ""}
                    disabled
                    className="w-full p-2 text-sm border rounded-md bg-zinc-100 dark:bg-zinc-800/30 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 cursor-not-allowed"
                  />
                </div>
              ) : (
                <h3 className="mb-2 text-xl font-semibold">
                  {contact.subject || "(No Subject)"}
                </h3>
              )}
              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>

          {/* Sender Information */}
          <div className="overflow-hidden border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-medium">Sender Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem icon={User} label="Name" value={contact.name} />
                <DetailItem icon={Mail} label="Email" value={contact.email} />
                {contact.phone && (
                  <DetailItem
                    icon={Phone}
                    label="Phone"
                    value={contact.phone}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Status & Notes */}
        <div className="space-y-6 lg:col-span-1">
          <div className="p-6 border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="mb-4 text-xl font-semibold">Status & Notes</h2>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Message Status
              </label>
              {editMode ? (
                <select
                  id="status"
                  name="status"
                  value={editedData.status}
                  onChange={(e) =>
                    setEditedData({ ...editedData, status: e.target.value })
                  }
                  className="w-full p-2 text-sm border rounded-md bg-white dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="new" className="bg-zinc-100 dark:bg-zinc-900">
                    New
                  </option>
                  <option value="read" className="bg-zinc-100 dark:bg-zinc-900">
                    Read
                  </option>
                  <option
                    value="replied"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Replied
                  </option>
                  <option
                    value="archived"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Archived
                  </option>
                </select>
              ) : (
                <StatusBadge status={contact.status} />
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
                  {contact.notes || "No notes added."}
                </p>
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
        itemName={`message from ${contact.name}`}
      />
    </div>
  );
};

// Helper component for Detail Items
const DetailItem = ({ icon: Icon, label, value }) => (
  <div>
    <dt className="flex items-center mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
      <Icon size={14} className="mr-1.5" />
      <span>{label}</span>
    </dt>
    <dd className="text-sm text-zinc-900 dark:text-zinc-100">{value}</dd>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300/30",
    read: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300/30",
    replied:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300/30",
    archived:
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-700/50",
  };

  const statusText = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
        colors[status] ||
        "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-700/50"
      }`}
    >
      {statusText}
    </span>
  );
};

export default ContactDetails;
