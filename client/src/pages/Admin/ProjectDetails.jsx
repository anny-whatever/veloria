// Example implementation in ProjectDetails.jsx
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
import useFetchData from "../../hooks/useFetchData";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import ErrorDisplay from "./components/ErrorDisplay"; // Create this component
import LoadingSpinner from "./components/LoadingSpinner"; // Create this component

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
  });

  // Data transformer function to format dates or handle other transformations
  const projectDataTransformer = (data) => {
    // You can transform dates, ensure arrays exist, etc. here
    return data;
  };

  // Use the custom hook for fetching project data
  const {
    data: project,
    loading,
    error,
    setData: setProject,
    retry,
  } = useFetchData({
    endpoint: "/projects/admin",
    id,
    initialData: null,
    dataTransformer: projectDataTransformer,
  });

  // Update edited data when project data is loaded
  useEffect(() => {
    if (project) {
      setEditedData({
        status: project.status || "new",
        notes: project.notes || "",
      });
    }
  }, [project]);

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

  // Handle loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={retry}
        onGoBack={() => navigate("/admin/projects")}
      />
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

      {/* Project content - rest of your component */}
      {/* ... */}

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
