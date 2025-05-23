// client/src/pages/Admin/ProjectDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  User,
  Mail,
  Phone,
  ChevronLeft,
  Trash2,
  AlertTriangle,
  Edit,
  Save,
  ExternalLink,
  Calendar,
  Clock,
  IndianRupee,
  Tag,
  Building,
  Target,
  CheckCircle,
  Briefcase,
  Palette,
  Image,
  Server,
  Globe,
  Users,
  PlusCircle,
  X,
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
  const [activeTab, setActiveTab] = useState("overview");
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
  });

  // Additional states for expanded sections
  const [showAllGoals, setShowAllGoals] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

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
        setError(null);
        console.log(`Fetching project details for ID: ${id}`);
        const response = await API.get(`/projects/admin/${id}`);
        console.log("Project data received:", response.data);
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

  const handleUpdateMilestoneStatus = async (milestoneId, newStatus) => {
    try {
      setLoading(true);
      const response = await API.patch(
        `/projects/admin/${id}/milestones/${milestoneId}`,
        {
          status: newStatus,
          completedDate:
            newStatus === "completed" ? new Date().toISOString() : null,
        }
      );
      setProject(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error updating milestone:", err);
      alert("Failed to update milestone. Please try again.");
      setLoading(false);
    }
  };

  const handleUpdatePaymentStatus = async (paymentId, newStatus) => {
    try {
      setLoading(true);
      const response = await API.patch(
        `/projects/admin/${id}/payments/${paymentId}`,
        {
          status: newStatus,
          paidDate: newStatus === "paid" ? new Date().toISOString() : null,
        }
      );
      setProject(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error updating payment:", err);
      alert("Failed to update payment. Please try again.");
      setLoading(false);
    }
  };

  const handleUpdateWorkflowStage = async (newStage) => {
    try {
      setLoading(true);
      const response = await API.patch(`/projects/admin/${id}/workflow`, {
        workflowStage: newStage,
      });
      setProject(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error updating workflow stage:", err);
      alert("Failed to update workflow stage. Please try again.");
      setLoading(false);
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

  // Format workflow stage
  const formatWorkflowStage = (stage) => {
    if (!stage)
      return { label: "Not Started", color: "bg-gray-100 text-gray-800" };

    switch (stage) {
      case "discussion":
        return {
          label: "Discussion",
          color: "bg-blue-100 text-blue-800",
          icon: <Users size={16} />,
        };
      case "design":
        return {
          label: "Design",
          color: "bg-purple-100 text-purple-800",
          icon: <Palette size={16} />,
        };
      case "content_collection":
        return {
          label: "Content Collection",
          color: "bg-amber-100 text-amber-800",
          icon: <Image size={16} />,
        };
      case "development":
        return {
          label: "Development",
          color: "bg-cyan-100 text-cyan-800",
          icon: <Briefcase size={16} />,
        };
      case "revisions":
        return {
          label: "Revisions",
          color: "bg-pink-100 text-pink-800",
          icon: <Edit size={16} />,
        };
      case "deployment":
        return {
          label: "Deployment",
          color: "bg-indigo-100 text-indigo-800",
          icon: <Server size={16} />,
        };
      case "knowledge_sharing":
        return {
          label: "Knowledge Sharing",
          color: "bg-teal-100 text-teal-800",
          icon: <FileText size={16} />,
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle size={16} />,
        };
      default:
        return {
          label: stage,
          color: "bg-gray-100 text-gray-800",
          icon: <Tag size={16} />,
        };
    }
  };

  // Calculate project metrics
  const calculateProjectMetrics = () => {
    if (!project) return {};

    const totalMilestones = project.milestones ? project.milestones.length : 0;
    const completedMilestones = project.milestones
      ? project.milestones.filter((m) => m.status === "completed").length
      : 0;
    const milestonesProgress =
      totalMilestones > 0
        ? Math.round((completedMilestones / totalMilestones) * 100)
        : 0;

    const totalValue = project.projectValue || 0;
    const receivedPayments = project.paymentSchedule
      ? project.paymentSchedule
          .filter((p) => p.status === "paid")
          .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
      : 0;
    const paymentProgress =
      totalValue > 0 ? Math.round((receivedPayments / totalValue) * 100) : 0;

    const daysFromStart = project.startDate
      ? Math.ceil(
          (new Date() - new Date(project.startDate)) / (1000 * 60 * 60 * 24)
        )
      : 0;
    const overdueMilestones = project.milestones
      ? project.milestones.filter(
          (m) => m.status !== "completed" && new Date(m.dueDate) < new Date()
        ).length
      : 0;
    const overduePayments = project.paymentSchedule
      ? project.paymentSchedule.filter(
          (p) => p.status !== "paid" && new Date(p.dueDate) < new Date()
        ).length
      : 0;

    return {
      totalMilestones,
      completedMilestones,
      milestonesProgress,
      totalValue,
      receivedPayments,
      paymentProgress,
      daysFromStart,
      overdueMilestones,
      overduePayments,
    };
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

  const metrics = calculateProjectMetrics();
  const currentStage = formatWorkflowStage(project.workflowStage);

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
          <div>
            <h1 className="text-2xl font-bold">{project.projectName}</h1>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                  ${project.status === "new" ? "bg-blue-100 text-blue-800" : ""}
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
              <span className="flex items-center mr-4">
                <Calendar size={14} className="mr-1" />
                {project.createdAt
                  ? format(new Date(project.createdAt), "MMM d, yyyy")
                  : "Unknown"}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {project.deadline
                  ? format(new Date(project.deadline), "MMM d, yyyy")
                  : "No deadline"}
              </span>
            </div>
          </div>
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
                Edit Quick Info
              </button>
              <Link
                to={`/admin/projects/${id}/edit`}
                className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
              >
                <FileText size={18} className="mr-2" />
                Advanced Edit
              </Link>
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

      {/* Project Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500">Project Value</div>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ${metrics.totalValue.toLocaleString()}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({metrics.paymentProgress}% received)
            </span>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${metrics.paymentProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Project Progress
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900">
              {metrics.milestonesProgress}%
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({metrics.completedMilestones}/{metrics.totalMilestones}{" "}
              milestones)
            </span>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${metrics.milestonesProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500">Current Stage</div>
          <div className="flex items-center mt-1">
            <span
              className={`p-1 rounded-full mr-2 ${currentStage.color.replace(
                "text-",
                "bg-"
              )}`}
            >
              {currentStage.icon}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {currentStage.label}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {project.startDate
              ? `Day ${metrics.daysFromStart} of project`
              : "Not started yet"}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Attention Needed
          </div>
          <div className="mt-2">
            {metrics.overdueMilestones > 0 && (
              <div className="flex items-center mb-1 text-red-600">
                <AlertTriangle size={14} className="mr-1" />
                <span>
                  {metrics.overdueMilestones} overdue milestone
                  {metrics.overdueMilestones > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {metrics.overduePayments > 0 && (
              <div className="flex items-center mb-1 text-red-600">
                <AlertTriangle size={14} className="mr-1" />
                <span>
                  {metrics.overduePayments} overdue payment
                  {metrics.overduePayments > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {metrics.overdueMilestones === 0 &&
              metrics.overduePayments === 0 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle size={14} className="mr-1" />
                  <span>No overdue items</span>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="p-1 mb-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "overview"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "milestones"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Milestones & Timeline
          </button>
          <button
            onClick={() => setActiveTab("finances")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "finances"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Finances
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "workflow"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "client"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Client
          </button>
          <button
            onClick={() => setActiveTab("technical")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "technical"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Technical Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Tab: Overview */}
          {activeTab === "overview" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Project Overview</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700">Project Name</h3>
                    <p className="text-lg">{project.projectName}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Service Type</h3>
                    <p className="flex items-center">
                      <Briefcase size={16} className="mr-2 text-accent" />
                      {project.serviceType.charAt(0).toUpperCase() +
                        project.serviceType.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-700">Description</h3>
                  <p className="mt-1 text-gray-600 whitespace-pre-line">
                    {project.projectDescription}
                  </p>
                </div>

                {project.projectGoals && project.projectGoals.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700">Project Goals</h3>
                    <ul className="pl-5 mt-2 space-y-2 list-disc">
                      {project.projectGoals
                        .slice(
                          0,
                          showAllGoals ? project.projectGoals.length : 3
                        )
                        .map((goal, index) => (
                          <li key={index} className="text-gray-600">
                            {goal}
                          </li>
                        ))}
                    </ul>
                    {project.projectGoals.length > 3 && (
                      <button
                        onClick={() => setShowAllGoals(!showAllGoals)}
                        className="mt-2 text-sm text-accent hover:underline"
                      >
                        {showAllGoals
                          ? "Show less"
                          : `Show ${
                              project.projectGoals.length - 3
                            } more goals`}
                      </button>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700">Budget</h3>
                    <p className="flex items-center mt-1">
                      <IndianRupee size={16} className="mr-2 text-green-600" />
                      {project.budget}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Timeline</h3>
                    <p className="flex items-center mt-1">
                      <Clock size={16} className="mr-2 text-amber-600" />
                      {project.timeline === "urgent" && "Urgent (< 2 weeks)"}
                      {project.timeline === "standard" &&
                        "Standard (2-4 weeks)"}
                      {project.timeline === "relaxed" &&
                        "Flexible (1-2 months)"}
                      {project.timeline === "not-sure" && "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-700">Project Dates</h3>
                  <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-gray-500">Created On</div>
                      <p>
                        {project.createdAt
                          ? format(new Date(project.createdAt), "MMMM d, yyyy")
                          : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Start Date</div>
                      <p>
                        {project.startDate
                          ? format(new Date(project.startDate), "MMMM d, yyyy")
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Deadline</div>
                      <p>
                        {project.deadline
                          ? format(new Date(project.deadline), "MMMM d, yyyy")
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Updated</div>
                      <p>
                        {project.updatedAt
                          ? format(new Date(project.updatedAt), "MMMM d, yyyy")
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Milestones & Timeline */}
          {activeTab === "milestones" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">
                  Project Timeline & Milestones
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700">Key Dates</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between p-3 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">
                          Start Date
                        </span>
                        <span className="font-medium">
                          {project.startDate
                            ? format(new Date(project.startDate), "MMM d, yyyy")
                            : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">Deadline</span>
                        <span className="font-medium">
                          {project.deadline
                            ? format(new Date(project.deadline), "MMM d, yyyy")
                            : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-md bg-gray-50">
                        <span className="text-sm text-gray-600">
                          Project Duration
                        </span>
                        <span className="font-medium">
                          {project.startDate && project.deadline
                            ? `${Math.ceil(
                                (new Date(project.deadline) -
                                  new Date(project.startDate)) /
                                  (1000 * 60 * 60 * 24)
                              )} days`
                            : "Not determined"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Progress</h3>
                    <div className="p-3 mt-2 rounded-md bg-gray-50">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Milestone Completion
                        </span>
                        <span className="text-sm font-medium">
                          {metrics.completedMilestones}/
                          {metrics.totalMilestones}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${metrics.milestonesProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700">Milestones</h3>
                    <Link
                      to={`/admin/projects/${id}/edit`}
                      className="flex items-center text-sm text-accent hover:underline"
                    >
                      <PlusCircle size={14} className="mr-1" />
                      Add Milestone
                    </Link>
                  </div>

                  {project.milestones && project.milestones.length > 0 ? (
                    <div className="mt-2 space-y-3">
                      {project.milestones.map((milestone) => (
                        <div
                          key={milestone._id}
                          className={`p-4 border rounded-md ${
                            milestone.status === "completed"
                              ? "border-green-200 bg-green-50"
                              : new Date(milestone.dueDate) < new Date() &&
                                milestone.status !== "completed"
                              ? "border-red-200 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-lg font-medium">
                                {milestone.name}
                              </div>
                              {milestone.description && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {milestone.description}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center mt-2 text-sm">
                                <div className="flex items-center mr-4">
                                  <Calendar
                                    size={14}
                                    className="mr-1 text-gray-400"
                                  />
                                  <span
                                    className={
                                      new Date(milestone.dueDate) <
                                        new Date() &&
                                      milestone.status !== "completed"
                                        ? "text-red-600 font-medium"
                                        : "text-gray-500"
                                    }
                                  >
                                    Due:{" "}
                                    {format(
                                      new Date(milestone.dueDate),
                                      "MMM d, yyyy"
                                    )}
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      milestone.status === "pending"
                                        ? "bg-blue-100 text-blue-800"
                                        : milestone.status === "in_progress"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : milestone.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {milestone.status === "in_progress"
                                      ? "In Progress"
                                      : milestone.status
                                          .charAt(0)
                                          .toUpperCase() +
                                        milestone.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {milestone.status === "pending" && (
                                <button
                                  onClick={() =>
                                    handleUpdateMilestoneStatus(
                                      milestone._id,
                                      "in_progress"
                                    )
                                  }
                                  className="p-2 text-yellow-500 rounded-md bg-yellow-50 hover:bg-yellow-100"
                                  title="Mark as In Progress"
                                >
                                  <Clock size={16} />
                                </button>
                              )}
                              {milestone.status !== "completed" && (
                                <button
                                  onClick={() =>
                                    handleUpdateMilestoneStatus(
                                      milestone._id,
                                      "completed"
                                    )
                                  }
                                  className="p-2 text-green-500 rounded-md bg-green-50 hover:bg-green-100"
                                  title="Mark as Completed"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                          {milestone.completedDate && (
                            <div className="mt-2 text-xs text-gray-500">
                              Completed on:{" "}
                              {format(
                                new Date(milestone.completedDate),
                                "MMM d, yyyy"
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 mt-2 text-center border border-gray-300 border-dashed rounded-md">
                      <Clock size={24} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500">
                        No milestones have been created yet
                      </p>
                      <Link
                        to={`/admin/projects/${id}/edit`}
                        className="inline-flex items-center mt-2 text-sm text-accent hover:underline"
                      >
                        <PlusCircle size={14} className="mr-1" />
                        Add your first milestone
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Finances */}
          {activeTab === "finances" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Project Finances</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Financial Summary
                    </h3>
                    <div className="p-4 mt-2 rounded-md bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">
                          Project Value
                        </span>
                        <span className="text-lg font-medium text-gray-900">
                          $
                          {project.projectValue
                            ? project.projectValue.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">
                          Received Payments
                        </span>
                        <span className="text-lg font-medium text-green-600">
                          ${metrics.receivedPayments.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
                        <span className="text-sm text-gray-600">
                          Outstanding Amount
                        </span>
                        <span className="text-lg font-medium text-amber-600">
                          $
                          {(
                            metrics.totalValue - metrics.receivedPayments
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Payment Progress
                        </span>
                        <span className="text-sm font-medium">
                          {metrics.paymentProgress}%
                        </span>
                      </div>
                      <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${metrics.paymentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {project.referredBy && project.referredBy.name && (
                    <div>
                      <h3 className="font-medium text-gray-700">
                        Referral Information
                      </h3>
                      <div className="p-4 mt-2 border border-yellow-200 rounded-md bg-yellow-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            Referred By
                          </span>
                          <span className="font-medium">
                            {project.referredBy.name}
                          </span>
                        </div>
                        {project.referredBy.email && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Email</span>
                            <span className="font-medium">
                              {project.referredBy.email}
                            </span>
                          </div>
                        )}
                        {project.referredBy.commissionPercentage > 0 && (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">
                                Commission
                              </span>
                              <span className="font-medium">
                                {project.referredBy.commissionPercentage}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Commission Amount
                              </span>
                              <span className="font-medium text-yellow-800">
                                $
                                {(
                                  (project.projectValue *
                                    project.referredBy.commissionPercentage) /
                                  100
                                ).toLocaleString()}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700">
                      Payment Schedule
                    </h3>
                    <Link
                      to={`/admin/projects/${id}/edit`}
                      className="flex items-center text-sm text-accent hover:underline"
                    >
                      <PlusCircle size={14} className="mr-1" />
                      Add Payment
                    </Link>
                  </div>

                  {project.paymentSchedule &&
                  project.paymentSchedule.length > 0 ? (
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Payment
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Due Date
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {project.paymentSchedule.map((payment) => (
                            <tr
                              key={payment._id}
                              className={
                                payment.status === "paid"
                                  ? "bg-green-50"
                                  : new Date(payment.dueDate) < new Date() &&
                                    payment.status !== "paid"
                                  ? "bg-red-50"
                                  : ""
                              }
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {payment.name}
                                </div>
                                {payment.notes && (
                                  <div className="text-xs text-gray-500">
                                    {payment.notes}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-green-600">
                                  ${parseFloat(payment.amount).toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div
                                  className={`text-sm ${
                                    new Date(payment.dueDate) < new Date() &&
                                    payment.status !== "paid"
                                      ? "text-red-600 font-medium"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {format(
                                    new Date(payment.dueDate),
                                    "MMM d, yyyy"
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    payment.status === "pending"
                                      ? "bg-blue-100 text-blue-800"
                                      : payment.status === "paid"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {payment.status.charAt(0).toUpperCase() +
                                    payment.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                                <div className="flex justify-end space-x-1">
                                  {payment.status !== "paid" && (
                                    <button
                                      onClick={() =>
                                        handleUpdatePaymentStatus(
                                          payment._id,
                                          "paid"
                                        )
                                      }
                                      className="p-1 text-green-600 rounded-md hover:bg-green-50"
                                      title="Mark as Paid"
                                    >
                                      <CheckCircle size={16} />
                                    </button>
                                  )}
                                  {payment.status === "paid" && (
                                    <button
                                      onClick={() =>
                                        handleUpdatePaymentStatus(
                                          payment._id,
                                          "pending"
                                        )
                                      }
                                      className="p-1 text-blue-600 rounded-md hover:bg-blue-50"
                                      title="Mark as Pending"
                                    >
                                      <Clock size={16} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-6 mt-2 text-center border border-gray-300 border-dashed rounded-md">
                      <IndianRupee
                        size={24}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-gray-500">
                        No payment schedule has been created yet
                      </p>
                      <Link
                        to={`/admin/projects/${id}/edit`}
                        className="inline-flex items-center mt-2 text-sm text-accent hover:underline"
                      >
                        <PlusCircle size={14} className="mr-1" />
                        Add your first payment
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Workflow */}
          {activeTab === "workflow" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Project Workflow</h2>
              </div>
              <div className="p-6">
                <div>
                  <h3 className="mb-3 font-medium text-gray-700">
                    Current Stage
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      {
                        value: "discussion",
                        label: "Discussion",
                        icon: <Users size={16} />,
                      },
                      {
                        value: "design",
                        label: "Design",
                        icon: <Palette size={16} />,
                      },
                      {
                        value: "content_collection",
                        label: "Content Collection",
                        icon: <Image size={16} />,
                      },
                      {
                        value: "development",
                        label: "Development",
                        icon: <Briefcase size={16} />,
                      },
                      {
                        value: "revisions",
                        label: "Revisions",
                        icon: <Edit size={16} />,
                      },
                      {
                        value: "deployment",
                        label: "Deployment",
                        icon: <Server size={16} />,
                      },
                      {
                        value: "knowledge_sharing",
                        label: "Knowledge Sharing",
                        icon: <FileText size={16} />,
                      },
                      {
                        value: "completed",
                        label: "Completed",
                        icon: <CheckCircle size={16} />,
                      },
                    ].map((stage) => (
                      <button
                        key={stage.value}
                        onClick={() => handleUpdateWorkflowStage(stage.value)}
                        className={`flex items-center justify-center p-3 border rounded-md hover:bg-gray-50 ${
                          project.workflowStage === stage.value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="mr-2">{stage.icon}</span>
                        {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                {project.designChoices && (
                  <div className="p-4 mt-6 rounded-lg bg-gray-50">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Palette size={20} className="mr-2 text-accent" />
                      Design Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Color Palette
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.designChoices.colorPalette &&
                          project.designChoices.colorPalette.length > 0 ? (
                            project.designChoices.colorPalette.map(
                              (color, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-1 bg-white border border-gray-300 rounded-md"
                                >
                                  <div
                                    className="w-6 h-6 mr-2 rounded-md"
                                    style={{ backgroundColor: color }}
                                  ></div>
                                  <span className="text-xs">{color}</span>
                                </div>
                              )
                            )
                          ) : (
                            <span className="text-sm text-gray-500">
                              No colors defined
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Fonts
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.designChoices.fonts &&
                          project.designChoices.fonts.length > 0 ? (
                            project.designChoices.fonts.map((font, index) => (
                              <div
                                key={index}
                                className="flex items-center p-1 px-2 bg-white border border-gray-300 rounded-md"
                              >
                                <span className="text-sm">{font}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">
                              No fonts defined
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Design Notes
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded-md">
                          {project.designChoices.designNotes ? (
                            <p className="text-sm text-gray-600">
                              {project.designChoices.designNotes}
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-400">
                              No design notes added yet
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Approval Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.designChoices.approvalStatus === "pending"
                              ? "bg-blue-100 text-blue-800"
                              : project.designChoices.approvalStatus ===
                                "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {project.designChoices.approvalStatus ===
                          "needs_revision"
                            ? "Needs Revision"
                            : project.designChoices.approvalStatus
                                .charAt(0)
                                .toUpperCase() +
                              project.designChoices.approvalStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {project.contentStatus && (
                  <div className="p-4 mt-6 rounded-lg bg-gray-50">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Image size={20} className="mr-2 text-accent" />
                      Content Collection
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Images Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.contentStatus.images === "not_started"
                              ? "bg-gray-100 text-gray-800"
                              : project.contentStatus.images === "in_progress"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {project.contentStatus.images === "not_started"
                            ? "Not Started"
                            : project.contentStatus.images === "in_progress"
                            ? "In Progress"
                            : "Completed"}
                        </span>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Text Content Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.contentStatus.text === "not_started"
                              ? "bg-gray-100 text-gray-800"
                              : project.contentStatus.text === "in_progress"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {project.contentStatus.text === "not_started"
                            ? "Not Started"
                            : project.contentStatus.text === "in_progress"
                            ? "In Progress"
                            : "Completed"}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          Content Notes
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded-md">
                          {project.contentStatus.notes ? (
                            <p className="text-sm text-gray-600">
                              {project.contentStatus.notes}
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-400">
                              No content notes added yet
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Client */}
          {activeTab === "client" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Client Information</h2>
              </div>
              <div className="p-6">
                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-accent/10 text-accent">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {project.companyName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="flex px-6 py-4">
                      <div className="w-1/3 text-sm font-medium text-gray-500">
                        Email
                      </div>
                      <div className="w-2/3 text-sm text-gray-900">
                        <a
                          href={`mailto:${project.email}`}
                          className="flex items-center text-accent hover:underline"
                        >
                          <Mail size={14} className="mr-1" />
                          {project.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex px-6 py-4">
                      <div className="w-1/3 text-sm font-medium text-gray-500">
                        Phone
                      </div>
                      <div className="w-2/3 text-sm text-gray-900">
                        {project.phone ? (
                          <a
                            href={`tel:${project.phone}`}
                            className="flex items-center text-accent hover:underline"
                          >
                            <Phone size={14} className="mr-1" />
                            {project.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 font-medium text-gray-700">
                    Company Information
                  </h3>
                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                    <div className="divide-y divide-gray-200">
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500">
                          Company Name
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900">
                          <Building size={14} className="mr-1 text-gray-400" />
                          {project.companyName}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500">
                          Website
                        </div>
                        <div className="w-2/3 text-sm text-gray-900">
                          {project.companyWebsite ? (
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
                              <ExternalLink size={14} className="mr-1" />
                              {project.companyWebsite}
                            </a>
                          ) : (
                            <span className="text-gray-400">Not provided</span>
                          )}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500">
                          Industry
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900">
                          <Briefcase size={14} className="mr-1 text-gray-400" />
                          {project.industry}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500">
                          Target Audience
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900">
                          <Target size={14} className="mr-1 text-gray-400" />
                          {project.targetAudience}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Technical Details */}
          {activeTab === "technical" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Technical Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Hosting Information */}
                  <div>
                    <h3 className="flex items-center mb-3 font-medium text-md">
                      <Server size={18} className="mr-2 text-accent" />
                      Hosting Details
                    </h3>
                    <div className="p-4 rounded-lg bg-gray-50">
                      {project.hosting && project.hosting.provider ? (
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500">
                              Hosting Provider
                            </div>
                            <div className="text-sm font-medium">
                              {project.hosting.provider}
                            </div>
                          </div>
                          {project.hosting.account && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Account
                              </div>
                              <div className="text-sm">
                                {project.hosting.account}
                              </div>
                            </div>
                          )}
                          {project.hosting.renewalDate && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Renewal Date
                              </div>
                              <div className="text-sm">
                                {format(
                                  new Date(project.hosting.renewalDate),
                                  "MMM d, yyyy"
                                )}
                              </div>
                            </div>
                          )}
                          {project.hosting.cost > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Annual Cost
                              </div>
                              <div className="text-sm">
                                ${project.hosting.cost.toLocaleString()}
                              </div>
                            </div>
                          )}
                          {project.hosting.notes && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Notes
                              </div>
                              <div className="text-sm">
                                {project.hosting.notes}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Server
                            size={20}
                            className="mx-auto mb-2 text-gray-400"
                          />
                          <p className="text-sm text-gray-500">
                            No hosting details available
                          </p>
                          <Link
                            to={`/admin/projects/${id}/edit`}
                            className="inline-flex items-center mt-2 text-xs text-accent hover:underline"
                          >
                            <PlusCircle size={12} className="mr-1" />
                            Add hosting details
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Domain Information */}
                  <div>
                    <h3 className="flex items-center mb-3 font-medium text-md">
                      <Globe size={18} className="mr-2 text-accent" />
                      Domain Details
                    </h3>
                    <div className="p-4 rounded-lg bg-gray-50">
                      {project.domain && project.domain.name ? (
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500">
                              Domain Name
                            </div>
                            <div className="text-sm font-medium">
                              {project.domain.name.startsWith("http") ? (
                                <a
                                  href={project.domain.name}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-accent hover:underline"
                                >
                                  {project.domain.name}
                                  <ExternalLink size={12} className="ml-1" />
                                </a>
                              ) : (
                                <a
                                  href={`https://${project.domain.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-accent hover:underline"
                                >
                                  {project.domain.name}
                                  <ExternalLink size={12} className="ml-1" />
                                </a>
                              )}
                            </div>
                          </div>
                          {project.domain.registrar && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Registrar
                              </div>
                              <div className="text-sm">
                                {project.domain.registrar}
                              </div>
                            </div>
                          )}
                          {project.domain.renewalDate && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Renewal Date
                              </div>
                              <div className="text-sm">
                                {format(
                                  new Date(project.domain.renewalDate),
                                  "MMM d, yyyy"
                                )}
                              </div>
                            </div>
                          )}
                          {project.domain.cost > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Annual Cost
                              </div>
                              <div className="text-sm">
                                ${project.domain.cost.toLocaleString()}
                              </div>
                            </div>
                          )}
                          {project.domain.notes && (
                            <div>
                              <div className="text-xs font-medium text-gray-500">
                                Notes
                              </div>
                              <div className="text-sm">
                                {project.domain.notes}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Globe
                            size={20}
                            className="mx-auto mb-2 text-gray-400"
                          />
                          <p className="text-sm text-gray-500">
                            No domain details available
                          </p>
                          <Link
                            to={`/admin/projects/${id}/edit`}
                            className="inline-flex items-center mt-2 text-xs text-accent hover:underline"
                          >
                            <PlusCircle size={12} className="mr-1" />
                            Add domain details
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                {project.additionalServices &&
                  project.additionalServices.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 font-medium text-gray-700">
                        Additional Services
                      </h3>
                      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Service
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Provider
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Cost
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {project.additionalServices.map(
                              (service, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                      {service.name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {service.provider || "N/A"}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-green-600">
                                      {service.cost
                                        ? `$${service.cost.toLocaleString()}`
                                        : "N/A"}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm">
                                      {service.status || "N/A"}
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
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

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700">Last Updated</h3>
                <p className="text-gray-600">
                  {project.updatedAt
                    ? format(new Date(project.updatedAt), "MMMM d, yyyy")
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
                  rows="8"
                  placeholder="Add your notes about this project..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                ></textarea>
              ) : project.notes ? (
                <p className="text-gray-600 whitespace-pre-line">
                  {project.notes}
                </p>
              ) : (
                <p className="italic text-gray-400">No notes added yet.</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          {!editMode && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Quick Actions</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    to="/admin/projects/calendar"
                    className="flex items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Calendar size={16} className="mr-2 text-accent" />
                    View Calendar
                  </Link>
                  <button
                    onClick={() =>
                      window.open(`mailto:${project.email}`, "_blank")
                    }
                    className="flex items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Mail size={16} className="mr-2 text-accent" />
                    Email Client
                  </button>
                  {project.companyWebsite && (
                    <a
                      href={
                        project.companyWebsite.startsWith("http")
                          ? project.companyWebsite
                          : `https://${project.companyWebsite}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <ExternalLink size={16} className="mr-2 text-accent" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
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
