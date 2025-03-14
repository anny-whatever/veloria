// client/src/pages/Admin/ProjectDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Clock,
  Target,
  Globe,
  Users,
  Check,
  ChevronLeft,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Edit,
  Save,
  List,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/projects/admin/${id}`);
        setProject(response.data);
        setEditedData({
          status: response.data.status || "new",
          notes: response.data.notes || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details. Please try again.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleStatusChange = (e) => {
    setEditedData({
      ...editedData,
      status: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await API.patch(`/projects/admin/${id}`, editedData);
      setProject(response.data.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/projects/admin/${id}`);
      setDeleteModalOpen(false);
      navigate("/admin/projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    }
  };

  // Format service type
  const formatServiceType = (type) => {
    switch (type) {
      case "ecommerce":
        return "E-commerce Website";
      case "blog":
        return "Blog Website";
      case "portfolio":
        return "Portfolio Website";
      case "landing":
        return "Landing Page";
      case "custom":
        return "Custom Website";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Format timeline
  const formatTimeline = (timeline) => {
    switch (timeline) {
      case "urgent":
        return "Urgent (< 2 weeks)";
      case "standard":
        return "Standard (2-4 weeks)";
      case "relaxed":
        return "Flexible (1-2 months)";
      case "not-sure":
        return "Not specified";
      default:
        return timeline;
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
          onClick={() => navigate("/admin/projects")}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Project Not Found</h3>
        </div>
        <p>
          The project you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/admin/projects"
          className="inline-block px-4 py-2 mt-4 transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700"
        >
          Go Back to Projects
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
            to="/admin/projects"
            className="p-2 mr-4 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Project Request Details</h1>
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
                className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
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
                Edit Project
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

      {/* Project Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Project Overview */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Project Overview</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start mb-6">
                <Briefcase
                  size={20}
                  className="flex-shrink-0 mt-1 mr-3 text-accent"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {project.projectName}
                  </h3>
                  <p className="text-accent">
                    {formatServiceType(project.serviceType)}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-medium text-gray-700">
                    Project Description
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {project.projectDescription}
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-medium text-gray-700">
                    Project Goals
                  </h3>
                  <ul className="pl-5 space-y-1 text-gray-600 list-disc">
                    {project.projectGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex">
                    <DollarSign
                      size={20}
                      className="flex-shrink-0 mt-1 mr-3 text-green-500"
                    />
                    <div>
                      <h3 className="font-medium text-gray-700">Budget</h3>
                      <p className="text-gray-600">{project.budget}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Clock
                      size={20}
                      className="flex-shrink-0 mt-1 mr-3 text-amber-500"
                    />
                    <div>
                      <h3 className="font-medium text-gray-700">Timeline</h3>
                      <p className="text-gray-600">
                        {formatTimeline(project.timeline)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Company Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div className="flex">
                  <Building
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Company Name</h3>
                    <p className="text-gray-600">{project.companyName}</p>
                  </div>
                </div>

                {project.companyWebsite && (
                  <div className="flex">
                    <Globe
                      size={20}
                      className="flex-shrink-0 mt-1 mr-3 text-primary"
                    />
                    <div>
                      <h3 className="font-medium text-gray-700">Website</h3>
                      <a
                        href={
                          project.companyWebsite.startsWith("http")
                            ? project.companyWebsite
                            : `https://${project.companyWebsite}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-accent hover:underline"
                      >
                        {project.companyWebsite}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex">
                  <List
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Industry</h3>
                    <p className="text-gray-600">{project.industry}</p>
                  </div>
                </div>

                <div className="flex">
                  <Target
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-primary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Target Audience
                    </h3>
                    <p className="text-gray-600">{project.targetAudience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Contact Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex">
                  <User
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Name</h3>
                    <p className="text-gray-600">{project.name}</p>
                  </div>
                </div>

                <div className="flex">
                  <Mail
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <p className="text-gray-600">{project.email}</p>
                  </div>
                </div>

                <div className="flex">
                  <Phone
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p className="text-gray-600">
                      {project.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="flex">
                  <Calendar
                    size={20}
                    className="flex-shrink-0 mt-1 mr-3 text-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">Request Date</h3>
                    <p className="text-gray-600">
                      {format(
                        new Date(project.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Status */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="quoted">Quoted</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                      ${
                        project.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        project.status === "contacted"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                      ${
                        project.status === "in-progress"
                          ? "bg-amber-100 text-amber-800"
                          : ""
                      }
                      ${
                        project.status === "quoted"
                          ? "bg-cyan-100 text-cyan-800"
                          : ""
                      }
                      ${
                        project.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        project.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                  >
                    {project.status
                      ? project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)
                      : "New"}
                  </span>
                  <span className="text-gray-500">
                    {project.status === "new" && "New project request"}
                    {project.status === "contacted" &&
                      "Client has been contacted"}
                    {project.status === "in-progress" &&
                      "Project details being discussed"}
                    {project.status === "quoted" && "Quote has been sent"}
                    {project.status === "accepted" &&
                      "Project has been accepted"}
                    {project.status === "declined" &&
                      "Project has been declined"}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700">Created</h3>
                <p className="text-gray-600">
                  {project.createdAt
                    ? format(
                        new Date(project.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )
                    : "Unknown"}
                </p>
              </div>
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
                  placeholder="Add your notes about this project..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                ></textarea>
              ) : project.notes ? (
                <p className="text-gray-600 whitespace-pre-wrap">
                  {project.notes}
                </p>
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
                className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
                onClick={() => window.open(`mailto:${project.email}`, "_blank")}
              >
                <Mail size={18} className="mr-2" />
                Email Client
              </button>

              {project.phone && (
                <button
                  className="flex items-center justify-center w-full px-4 py-2 border rounded-md border-accent text-accent hover:bg-accent/10"
                  onClick={() => window.open(`tel:${project.phone}`, "_blank")}
                >
                  <Phone size={18} className="mr-2" />
                  Call Client
                </button>
              )}

              {project.companyWebsite && (
                <button
                  className="flex items-center justify-center w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() =>
                    window.open(
                      project.companyWebsite.startsWith("http")
                        ? project.companyWebsite
                        : `https://${project.companyWebsite}`,
                      "_blank"
                    )
                  }
                >
                  <Globe size={18} className="mr-2" />
                  Visit Website
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
        title="Delete Project"
        message={`Are you sure you want to delete this project "${project.projectName}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProjectDetails;
