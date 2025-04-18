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
      return {
        label: "Not Started",
        color: "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
      };

    switch (stage) {
      case "discussion":
        return {
          label: "Discussion",
          color:
            "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
          icon: <Users size={16} />,
        };
      case "design":
        return {
          label: "Design",
          color:
            "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
          icon: <Palette size={16} />,
        };
      case "content_collection":
        return {
          label: "Content Collection",
          color:
            "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
          icon: <Image size={16} />,
        };
      case "development":
        return {
          label: "Development",
          color:
            "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200",
          icon: <Briefcase size={16} />,
        };
      case "revisions":
        return {
          label: "Revisions",
          color:
            "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200",
          icon: <Edit size={16} />,
        };
      case "deployment":
        return {
          label: "Deployment",
          color:
            "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200",
          icon: <Server size={16} />,
        };
      case "knowledge_sharing":
        return {
          label: "Knowledge Sharing",
          color:
            "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200",
          icon: <FileText size={16} />,
        };
      case "completed":
        return {
          label: "Completed",
          color:
            "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
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

  // Format service type for display
  const formatServiceType = (serviceType) => {
    if (!serviceType) return "Unknown";

    // Map service types to readable format
    const serviceTypeMap = {
      "ui-ux-design": "UI/UX Design",
      "web-development": "Web Development",
      "mobile-app-development": "Mobile App Development",
      "custom-software-development": "Custom Software Development",
      "ecommerce-development": "E-commerce Development",
      "database-solutions": "Database Solutions",
      "hotel-management": "Hotel Management Systems",
      "school-management": "School Management Systems",
      "hospital-management": "Hospital Management Systems",
      "payroll-management": "Payroll Management Systems",
      "erp-system": "Enterprise Resource Planning (ERP)",
      ecommerce: "E-commerce Website",
      blog: "Blog Website",
      portfolio: "Portfolio Website",
      landing: "Landing Page",
      custom: "Custom Solution",
    };

    return (
      serviceTypeMap[serviceType] ||
      serviceType.charAt(0).toUpperCase() +
        serviceType.slice(1).replace(/-/g, " ")
    );
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
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-700/40 dark:text-red-300">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <div className="flex mt-4 space-x-3">
          <button
            onClick={retry}
            className="px-4 py-2 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-800/50 dark:text-red-200 dark:hover:bg-red-700/60"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
      <div className="p-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700/40 dark:text-amber-300">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Project Not Found</h3>
        </div>
        <p>
          The project you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/admin/projects"
          className="inline-block px-4 py-2 mt-4 transition-colors rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700 dark:bg-amber-800/50 dark:text-amber-200 dark:hover:bg-amber-700/60"
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
            className="p-2 mr-4 text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
              {project.projectName}
            </h1>
            <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 dark:text-zinc-400">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                  ${
                    project.status === "new"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                      : ""
                  }
                  ${
                    project.status === "contacted"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                      : ""
                  }
                  ${
                    project.status === "in-progress"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                      : ""
                  }
                  ${
                    project.status === "quoted"
                      ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200"
                      : ""
                  }
                  ${
                    project.status === "accepted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : ""
                  }
                  ${
                    project.status === "declined"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
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
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
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
                className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                <Edit size={18} className="mr-2" />
                Edit Project
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
        <div className="p-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-zinc-400">
            Project Value
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
              ₹{metrics.totalValue.toLocaleString()}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-zinc-400">
              ({metrics.paymentProgress}% received)
            </span>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-200 dark:bg-zinc-700 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${metrics.paymentProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-zinc-400">
            Project Progress
          </div>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
              {metrics.milestonesProgress}%
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-zinc-400">
              ({metrics.completedMilestones}/{metrics.totalMilestones}{" "}
              milestones)
            </span>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-200 dark:bg-zinc-700 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${metrics.milestonesProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-zinc-400">
            Current Stage
          </div>
          <div className="flex items-center mt-1">
            <span className={`p-1 rounded-full mr-2 ${currentStage.color}`}>
              {currentStage.icon}
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-zinc-100">
              {currentStage.label}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            {project.startDate
              ? `Day ${metrics.daysFromStart} of project`
              : "Not started yet"}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-zinc-400">
            Attention Needed
          </div>
          <div className="mt-2">
            {metrics.overdueMilestones > 0 && (
              <div className="flex items-center mb-1 text-red-600 dark:text-red-400">
                <AlertTriangle size={14} className="mr-1" />
                <span>
                  {metrics.overdueMilestones} overdue milestone
                  {metrics.overdueMilestones > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {metrics.overduePayments > 0 && (
              <div className="flex items-center mb-1 text-red-600 dark:text-red-400">
                <AlertTriangle size={14} className="mr-1" />
                <span>
                  {metrics.overduePayments} overdue payment
                  {metrics.overduePayments > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {metrics.overdueMilestones === 0 &&
              metrics.overduePayments === 0 && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle size={14} className="mr-1" />
                  <span>No overdue items</span>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="p-1 mb-6 overflow-x-auto bg-white rounded-lg shadow-sm dark:bg-zinc-900">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "overview"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "milestones"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Milestones & Timeline
          </button>
          <button
            onClick={() => setActiveTab("finances")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "finances"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Finances
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "workflow"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Workflow
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "client"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Client
          </button>
          <button
            onClick={() => setActiveTab("technical")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "technical"
                ? "bg-accent text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Project Overview
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Project Name
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-zinc-100">
                      {project.projectName}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Service Type
                    </h3>
                    <p className="flex items-center text-gray-900 dark:text-zinc-100">
                      <Briefcase size={16} className="mr-2 text-accent" />
                      {formatServiceType(project.serviceType)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                    Description
                  </h3>
                  <p className="mt-1 text-gray-600 whitespace-pre-line dark:text-zinc-400">
                    {project.projectDescription}
                  </p>
                </div>

                {project.projectGoals && project.projectGoals.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Project Goals
                    </h3>
                    <ul className="pl-5 mt-2 space-y-2 list-disc">
                      {project.projectGoals
                        .slice(
                          0,
                          showAllGoals ? project.projectGoals.length : 3
                        )
                        .map((goal, index) => (
                          <li
                            key={index}
                            className="text-gray-600 dark:text-zinc-400"
                          >
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
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Budget
                    </h3>
                    <p className="flex items-center mt-1 text-gray-900 dark:text-zinc-100">
                      <IndianRupee size={16} className="mr-2 text-green-600" />
                      {project.budget}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Timeline
                    </h3>
                    <p className="flex items-center mt-1 text-gray-900 dark:text-zinc-100">
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
                  <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                    Project Dates
                  </h3>
                  <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-zinc-400">
                        Created On
                      </div>
                      <p className="text-gray-900 dark:text-zinc-100">
                        {project.createdAt
                          ? format(new Date(project.createdAt), "MMMM d, yyyy")
                          : "Unknown"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-zinc-400">
                        Start Date
                      </div>
                      <p className="text-gray-900 dark:text-zinc-100">
                        {project.startDate
                          ? format(new Date(project.startDate), "MMMM d, yyyy")
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-zinc-400">
                        Deadline
                      </div>
                      <p className="text-gray-900 dark:text-zinc-100">
                        {project.deadline
                          ? format(new Date(project.deadline), "MMMM d, yyyy")
                          : "Not set"}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-zinc-400">
                        Last Updated
                      </div>
                      <p className="text-gray-900 dark:text-zinc-100">
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Project Timeline & Milestones
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Key Dates
                    </h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex justify-between p-3 rounded-md bg-gray-50 dark:bg-zinc-800">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Start Date
                        </span>
                        <span className="font-medium text-gray-900 dark:text-zinc-100">
                          {project.startDate
                            ? format(new Date(project.startDate), "MMM d, yyyy")
                            : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-md bg-gray-50 dark:bg-zinc-800">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Deadline
                        </span>
                        <span className="font-medium text-gray-900 dark:text-zinc-100">
                          {project.deadline
                            ? format(new Date(project.deadline), "MMM d, yyyy")
                            : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 rounded-md bg-gray-50 dark:bg-zinc-800">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Project Duration
                        </span>
                        <span className="font-medium text-gray-900 dark:text-zinc-100">
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
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Progress
                    </h3>
                    <div className="p-3 mt-2 rounded-md bg-gray-50 dark:bg-zinc-800">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Milestone Completion
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                          {metrics.completedMilestones}/
                          {metrics.totalMilestones}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-zinc-700">
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
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Milestones
                    </h3>
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
                              ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700/40"
                              : new Date(milestone.dueDate) < new Date() &&
                                milestone.status !== "completed"
                              ? "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700/40"
                              : "border-gray-200 dark:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                                {milestone.name}
                              </div>
                              {milestone.description && (
                                <div className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
                                  {milestone.description}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center mt-2 text-sm">
                                <div className="flex items-center mr-4">
                                  <Calendar
                                    size={14}
                                    className="mr-1 text-gray-400 dark:text-zinc-500"
                                  />
                                  <span
                                    className={
                                      new Date(milestone.dueDate) <
                                        new Date() &&
                                      milestone.status !== "completed"
                                        ? "text-red-600 font-medium dark:text-red-400"
                                        : "text-gray-500 dark:text-zinc-400"
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
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                                        : milestone.status === "in_progress"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                                        : milestone.status === "completed"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
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
                                  className="p-2 text-yellow-500 rounded-md bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-800/40"
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
                                  className="p-2 text-green-500 rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                                  title="Mark as Completed"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                          {milestone.completedDate && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-zinc-400">
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
                    <div className="p-6 mt-2 text-center border border-gray-300 border-dashed rounded-md dark:border-zinc-700">
                      <Clock
                        size={24}
                        className="mx-auto mb-2 text-gray-400 dark:text-zinc-500"
                      />
                      <p className="text-gray-500 dark:text-zinc-400">
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Project Finances
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                      Financial Summary
                    </h3>
                    <div className="p-4 mt-2 rounded-md bg-gray-50 dark:bg-zinc-800">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Project Value
                        </span>
                        <span className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                          ₹
                          {project.projectValue
                            ? project.projectValue.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Received Payments
                        </span>
                        <span className="text-lg font-medium text-green-600 dark:text-green-400">
                          ₹{metrics.receivedPayments.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-700">
                        <span className="text-sm text-gray-600 dark:text-zinc-400">
                          Outstanding Amount
                        </span>
                        <span className="text-lg font-medium text-amber-600 dark:text-amber-400">
                          ₹
                          {(
                            metrics.totalValue - metrics.receivedPayments
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-zinc-300">
                          Payment Progress
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                          {metrics.paymentProgress}%
                        </span>
                      </div>
                      <div className="w-full h-2 mt-2 bg-gray-200 rounded-full dark:bg-zinc-700">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${metrics.paymentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {project.referredBy && project.referredBy.name && (
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-zinc-300">
                        Referral Information
                      </h3>
                      <div className="p-4 mt-2 border border-yellow-200 rounded-md bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-zinc-400">
                            Referred By
                          </span>
                          <span className="font-medium text-gray-900 dark:text-zinc-100">
                            {project.referredBy.name}
                          </span>
                        </div>
                        {project.referredBy.email && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-zinc-400">
                              Email
                            </span>
                            <span className="font-medium text-gray-900 dark:text-zinc-100">
                              {project.referredBy.email}
                            </span>
                          </div>
                        )}
                        {project.referredBy.commissionPercentage > 0 && (
                          <>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-zinc-400">
                                Commission
                              </span>
                              <span className="font-medium text-gray-900 dark:text-zinc-100">
                                {project.referredBy.commissionPercentage}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-zinc-400">
                                Commission Amount
                              </span>
                              <span className="font-medium text-yellow-800 dark:text-yellow-300">
                                ₹
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
                    <h3 className="font-medium text-gray-700 dark:text-zinc-300">
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
                    <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-zinc-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                        <thead className="bg-gray-50 dark:bg-zinc-800">
                          <tr>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                              Payment
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                              Due Date
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                              Status
                            </th>
                            <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase dark:text-zinc-400">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                          {project.paymentSchedule.map((payment) => (
                            <tr
                              key={payment._id}
                              className={`dark:bg-zinc-900`}
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                                  {payment.name}
                                </div>
                                {payment.notes && (
                                  <div className="text-xs text-gray-500 dark:text-zinc-400">
                                    {payment.notes}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                  ₹{parseFloat(payment.amount).toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div
                                  className={`text-sm ${
                                    new Date(payment.dueDate) < new Date() &&
                                    payment.status !== "paid"
                                      ? "text-red-600 font-medium dark:text-red-400"
                                      : "text-gray-900 dark:text-zinc-100"
                                  }`}
                                >
                                  {format(
                                    new Date(payment.dueDate),
                                    "MMM d, yyyy"
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-zinc-100">
                                  {payment.status.charAt(0).toUpperCase() +
                                    payment.status.slice(1)}
                                </div>
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
                                      className="p-1 text-green-600 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 dark:text-green-400"
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
                                      className="p-1 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:text-blue-400"
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
                    <div className="p-6 mt-2 text-center border border-gray-300 border-dashed rounded-md dark:border-zinc-700">
                      <IndianRupee
                        size={24}
                        className="mx-auto mb-2 text-gray-400 dark:text-zinc-500"
                      />
                      <p className="text-gray-500 dark:text-zinc-400">
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Project Workflow
                </h2>
              </div>
              <div className="p-6">
                <div>
                  <h3 className="mb-3 font-medium text-gray-700 dark:text-zinc-300">
                    Current Stage
                  </h3>
                  <div className="p-4 mb-4 border rounded-md border-accent/20 bg-accent/5 dark:border-accent/40 dark:bg-accent/10">
                    <div className="flex items-center">
                      <span
                        className={`p-2 rounded-full mr-3 ${currentStage.color}`}
                      >
                        {currentStage.icon}
                      </span>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                          {currentStage.label}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                          {project.startDate
                            ? `Day ${metrics.daysFromStart} of project`
                            : "Project not started yet"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 mb-3 font-medium text-gray-700 dark:text-zinc-300">
                    Workflow Stages
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
                      <div
                        key={stage.value}
                        className={`flex items-center p-3 border rounded-md ${
                          project.workflowStage === stage.value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-gray-300 text-gray-500 dark:border-zinc-700 dark:text-zinc-400"
                        }`}
                      >
                        <span className="mr-2">{stage.icon}</span>
                        {stage.label}
                      </div>
                    ))}
                  </div>
                </div>

                {project.designChoices && (
                  <div className="p-4 mt-6 rounded-lg bg-gray-50 dark:bg-zinc-800">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Palette size={20} className="mr-2 text-accent" />
                      Design Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                                    style={{
                                      backgroundColor:
                                        typeof color === "string"
                                          ? color
                                          : color.color ||
                                            color.value ||
                                            "#cccccc",
                                    }}
                                  ></div>
                                  <span className="text-xs">
                                    {typeof color === "string"
                                      ? color
                                      : color.color ||
                                        color.value ||
                                        color.value ||
                                        "Color"}
                                  </span>
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
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                                <span className="text-sm">
                                  {typeof font === "string"
                                    ? font
                                    : font.family || font.name || "Font"}
                                </span>
                                {typeof font !== "string" && font.category && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    ({font.category})
                                  </span>
                                )}
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
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Design Notes
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded-md">
                          {project.designChoices.designNotes ? (
                            <p className="text-sm text-gray-600 dark:text-zinc-400">
                              {project.designChoices.designNotes}
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-400 dark:text-zinc-500">
                              No design notes added yet
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Approval Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.designChoices.approvalStatus === "pending"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                              : project.designChoices.approvalStatus ===
                                "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
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
                  <div className="p-4 mt-6 rounded-lg bg-gray-50 dark:bg-zinc-800">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Image size={20} className="mr-2 text-accent" />
                      Content Collection
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Images Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.contentStatus.images === "not_started"
                              ? "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200"
                              : project.contentStatus.images === "in_progress"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
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
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Text Content Status
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.contentStatus.text === "not_started"
                              ? "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200"
                              : project.contentStatus.text === "in_progress"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
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
                        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Content Notes
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded-md">
                          {project.contentStatus.notes ? (
                            <p className="text-sm text-gray-600 dark:text-zinc-400">
                              {project.contentStatus.notes}
                            </p>
                          ) : (
                            <p className="text-sm italic text-gray-400 dark:text-zinc-500">
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Client Information
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
                  <div className="divide-y divide-gray-200 dark:divide-zinc-700">
                    <div className="flex px-6 py-4">
                      <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                        Email
                      </div>
                      <div className="w-2/3 text-sm text-gray-900 dark:text-zinc-100">
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
                      <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                        Phone
                      </div>
                      <div className="w-2/3 text-sm text-gray-900 dark:text-zinc-100">
                        {project.phone ? (
                          <a
                            href={`tel:${project.phone}`}
                            className="flex items-center text-accent hover:underline"
                          >
                            <Phone size={14} className="mr-1" />
                            {project.phone}
                          </a>
                        ) : (
                          <span className="text-gray-400 dark:text-zinc-500">
                            Not provided
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 font-medium text-gray-700 dark:text-zinc-300">
                    Company Information
                  </h3>
                  <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
                    <div className="divide-y divide-gray-200 dark:divide-zinc-700">
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                          Company Name
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900 dark:text-zinc-100">
                          <Building
                            size={14}
                            className="mr-1 text-gray-400 dark:text-zinc-500"
                          />
                          {project.companyName}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                          Website
                        </div>
                        <div className="w-2/3 text-sm text-gray-900 dark:text-zinc-100">
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
                            <span className="text-gray-400 dark:text-zinc-500">
                              Not provided
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                          Industry
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900 dark:text-zinc-100">
                          <Briefcase
                            size={14}
                            className="mr-1 text-gray-400 dark:text-zinc-500"
                          />
                          {project.industry}
                        </div>
                      </div>
                      <div className="flex px-6 py-4">
                        <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-zinc-400">
                          Target Audience
                        </div>
                        <div className="flex items-center w-2/3 text-sm text-gray-900 dark:text-zinc-100">
                          <Target
                            size={14}
                            className="mr-1 text-gray-400 dark:text-zinc-500"
                          />
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
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Technical Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Hosting Information */}
                  <div>
                    <h3 className="flex items-center mb-3 font-medium text-md text-gray-900 dark:text-zinc-100">
                      <Server size={18} className="mr-2 text-accent" />
                      Hosting Details
                    </h3>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
                      {project.hosting && project.hosting.provider ? (
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                              Hosting Provider
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                              {project.hosting.provider}
                            </div>
                          </div>
                          {project.hosting.account && (
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                                Account
                              </div>
                              <div className="text-sm text-gray-900 dark:text-zinc-100">
                                {project.hosting.account}
                              </div>
                            </div>
                          )}
                          {project.hosting.renewalDate && (
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                                Renewal Date
                              </div>
                              <div className="text-sm text-gray-900 dark:text-zinc-100">
                                {format(
                                  new Date(project.hosting.renewalDate),
                                  "MMM d, yyyy"
                                )}
                              </div>
                            </div>
                          )}
                          {project.hosting.cost > 0 && (
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                                Annual Cost
                              </div>
                              <div className="text-sm text-gray-900 dark:text-zinc-100">
                                ₹{project.hosting.cost.toLocaleString()}
                              </div>
                            </div>
                          )}
                          {project.hosting.notes && (
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                                Notes
                              </div>
                              <div className="text-sm text-gray-900 dark:text-zinc-100">
                                {project.hosting.notes}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Server
                            size={20}
                            className="mx-auto mb-2 text-gray-400 dark:text-zinc-500"
                          />
                          <p className="text-sm text-gray-500 dark:text-zinc-400">
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
                    <h3 className="flex items-center mb-3 font-medium text-md text-gray-900 dark:text-zinc-100">
                      <Globe size={18} className="mr-2 text-accent" />
                      Domain Details
                    </h3>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800">
                      {project.domain && project.domain.name ? (
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                              Domain Name
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
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
                              <div className="text-xs font-medium text-gray-600 dark:text-zinc-400">
                                Registrar
                              </div>
                              <div className="text-sm text-gray-900 dark:text-zinc-100">
                                {project.domain.registrar}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <Globe
                            size={20}
                            className="mx-auto mb-2 text-gray-400 dark:text-zinc-500"
                          />
                          <p className="text-sm text-gray-500 dark:text-zinc-400">
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
                      <h3 className="mb-3 font-medium text-gray-700 dark:text-zinc-300">
                        Additional Services
                      </h3>
                      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                          <thead className="bg-gray-50 dark:bg-zinc-800">
                            <tr>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                                Service
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                                Provider
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                                Cost
                              </th>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
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
                                    <div className="text-sm text-green-600 dark:text-green-400">
                                      {service.cost
                                        ? `₹${service.cost.toLocaleString()}`
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
          <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
            <div className="px-6 py-4 border-b dark:border-zinc-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                Status
              </h2>
            </div>
            <div className="p-6">
              {editMode ? (
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300">
                    Update Status
                  </label>
                  <select
                    value={editedData.status}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70"
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
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
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
                <h3 className="mb-2 font-medium text-gray-700 dark:text-zinc-300">
                  Created
                </h3>
                <p className="text-gray-600 dark:text-zinc-400">
                  {project.createdAt
                    ? format(new Date(project.createdAt), "MMMM d, yyyy")
                    : "Unknown"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700 dark:text-zinc-300">
                  Last Updated
                </h3>
                <p className="text-gray-600 dark:text-zinc-400">
                  {project.updatedAt
                    ? format(new Date(project.updatedAt), "MMMM d, yyyy")
                    : "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
            <div className="px-6 py-4 border-b dark:border-zinc-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                Notes
              </h2>
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
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:ring-accent/70"
                ></textarea>
              ) : project.notes ? (
                <p className="text-gray-600 whitespace-pre-line dark:text-zinc-400">
                  {project.notes}
                </p>
              ) : (
                <p className="italic text-gray-400 dark:text-zinc-500">
                  No notes added yet.
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          {!editMode && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-zinc-900">
              <div className="px-6 py-4 border-b dark:border-zinc-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
                  Quick Actions
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    to="/admin/projects/calendar"
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <Calendar size={16} className="mr-2 text-accent" />
                    View Calendar
                  </Link>
                  <button
                    onClick={() =>
                      window.open(`mailto:${project.email}`, "_blank")
                    }
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
