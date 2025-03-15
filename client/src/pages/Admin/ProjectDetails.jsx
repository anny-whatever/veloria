// client/src/pages/Admin/ProjectDetails.jsx - Fixed infinite loop issue
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  User,
  Mail,
  ChevronLeft,
  Trash2,
  AlertTriangle,
  Edit,
  Save,
  // ...other imports
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
  });

  // One-time data fetch on component mount
  useEffect(() => {
    // Check if id is valid
    if (!id || id === "new" || id === "undefined" || id === "null") {
      navigate("/admin/projects");
      return;
    }

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
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]); // Only re-run if id or navigate changes

  const handleStatusChange = (e) => {
    setEditedData({
      ...editedData,
      status: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await API.patch(`/projects/admin/${id}`, editedData);
      setProject(response.data.data);
      setEditMode(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project. Please try again.");
      setLoading(false);
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

  const retry = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/projects/admin/${id}`);
      setProject(response.data);
      setEditedData({
        status: response.data.status || "new",
        notes: response.data.notes || "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Error retrying project fetch:", err);
      setError("Failed to load project details. Please try again.");
      setLoading(false);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <div className="flex mt-4 space-x-3">
          <button
            onClick={retry}
            className="px-4 py-2 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Handle case where project is not found
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

  // The rest of your component rendering
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
          <h1 className="text-2xl font-bold">Project Details</h1>
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

      {/* Basic Project Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Project Overview</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Project Name</h3>
                <p className="text-lg">{project.projectName}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Service Type</h3>
                <p>{project.serviceType}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Description</h3>
                <p className="text-gray-600">{project.projectDescription}</p>
              </div>

              {project.projectGoals && project.projectGoals.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700">Project Goals</h3>
                  <ul className="pl-5 mt-2 list-disc">
                    {project.projectGoals.map((goal, index) => (
                      <li key={index} className="text-gray-600">
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700">Created</h3>
                <p className="text-gray-600">
                  {project.createdAt
                    ? format(new Date(project.createdAt), "MMMM d, yyyy")
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
                <p className="text-gray-600">{project.notes}</p>
              ) : (
                <p className="italic text-gray-400">No notes added yet.</p>
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
