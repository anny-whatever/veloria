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
  Send,
  AlertTriangle,
  Edit,
  Save,
  Archive,
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
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/contact/admin/${id}`);
        setContact(response.data);

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

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      alert("Please enter a reply message");
      return;
    }

    try {
      // This would typically call an API endpoint to send an email
      // For now, we'll just update the status to "replied"
      const response = await API.patch(`/contact/admin/${id}`, {
        status: "replied",
      });

      setContact(response.data.data);
      setReplyMode(false);
      setReplyText("");

      // Show success message (in a real implementation, you might use a toast notification)
      alert("Reply sent successfully!");
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply. Please try again.");
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
          onClick={() => navigate("/admin/contacts")}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700">
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
          className="inline-block px-4 py-2 mt-4 transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700"
        >
          Go Back to Contacts
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/admin/contacts"
            className="p-2 mr-4 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Contact Message</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
              ${contact.status === "new" ? "bg-blue-100 text-blue-800" : ""} 
              ${
                contact.status === "read" ? "bg-purple-100 text-purple-800" : ""
              } 
              ${
                contact.status === "replied"
                  ? "bg-green-100 text-green-800"
                  : ""
              } 
              ${
                contact.status === "archived" ? "bg-gray-100 text-gray-800" : ""
              }`}
            >
              {contact.status
                ? contact.status.charAt(0).toUpperCase() +
                  contact.status.slice(1)
                : "New"}
            </span>
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <Trash2 size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Message Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Message */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Message</h2>
              <div className="text-sm text-gray-500">
                {format(
                  new Date(contact.createdAt),
                  "MMMM d, yyyy 'at' h:mm a"
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="mb-2 font-medium text-gray-700">Subject</h3>
                <p className="text-lg">{contact.subject || "No Subject"}</p>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-gray-700">Message</h3>
                <div className="p-4 whitespace-pre-wrap rounded-lg bg-gray-50">
                  {contact.message}
                </div>
              </div>
            </div>
          </div>

          {/* Reply Section */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Reply to Message</h2>
            </div>
            <div className="p-6">
              {replyMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Compose Reply
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      rows="6"
                      placeholder="Type your reply here..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setReplyMode(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendReply}
                      className="px-4 py-2 text-white rounded-md bg-secondary hover:bg-secondary/90"
                    >
                      <Send size={18} className="inline-block mr-2" />
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  {contact.status === "replied" ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 text-green-600 bg-green-100 rounded-full">
                        <Check size={24} />
                      </div>
                      <h3 className="mb-1 text-lg font-medium text-gray-900">
                        Reply Sent
                      </h3>
                      <p className="mb-4 text-gray-500">
                        You have already replied to this message
                      </p>
                      <button
                        onClick={() => setReplyMode(true)}
                        className="text-secondary hover:underline"
                      >
                        Send another reply
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 mb-4 text-gray-500 bg-gray-100 rounded-full">
                        <Send size={24} />
                      </div>
                      <h3 className="mb-1 text-lg font-medium text-gray-900">
                        Send a Reply
                      </h3>
                      <p className="mb-4 text-gray-500">
                        Compose a response to this message
                      </p>
                      <button
                        onClick={() => setReplyMode(true)}
                        className="px-4 py-2 text-white rounded-md bg-secondary hover:bg-secondary/90"
                      >
                        Compose Reply
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sender Information */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Sender Information</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center text-xl font-bold rounded-full h-14 w-14 bg-secondary/10 text-secondary">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(contact.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex">
                  <Mail
                    size={20}
                    className="text-secondary mt-0.5 mr-3 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <p className="text-gray-600">{contact.email}</p>
                  </div>
                </div>

                {contact.phone && (
                  <div className="flex">
                    <Phone
                      size={20}
                      className="text-secondary mt-0.5 mr-3 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-gray-700">Phone</h3>
                      <p className="text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex">
                  <Calendar
                    size={20}
                    className="text-secondary mt-0.5 mr-3 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Submitted</h3>
                    <p className="text-gray-600">
                      {format(new Date(contact.createdAt), "MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(contact.createdAt), "h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-secondary hover:bg-secondary/90"
                onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
              >
                <Mail size={18} className="mr-2" />
                Email Sender
              </button>

              {contact.phone && (
                <button
                  className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-secondary text-secondary hover:bg-secondary/10"
                  onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                >
                  <Phone size={18} className="mr-2" />
                  Call Sender
                </button>
              )}

              <div className="pt-3 border-t border-gray-200">
                <p className="mb-2 text-sm text-gray-500">Update Status:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={contact.status === "read" || statusUpdating}
                    onClick={() => handleStatusChange("read")}
                    className={`py-2 px-3 rounded-md text-sm flex items-center justify-center ${
                      contact.status === "read"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                    }`}
                  >
                    <Check size={16} className="mr-1" />
                    Mark as Read
                  </button>

                  <button
                    disabled={contact.status === "archived" || statusUpdating}
                    onClick={() => handleStatusChange("archived")}
                    className={`py-2 px-3 rounded-md text-sm flex items-center justify-center ${
                      contact.status === "archived"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Archive size={16} className="mr-1" />
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete this message from ${contact.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ContactDetails;
