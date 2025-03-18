// client/src/pages/Admin/EditProjectForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  ChevronLeft,
  Save,
  Trash2,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Briefcase,
  PlusCircle,
  AlertTriangle,
  Tag,
  Palette,
  Image,
  FileType,
  Layers,
  Server,
  Globe,
  User,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import ColorPaletteModal from "./components/ColorPaletteModal";
import FontSelectionModal from "./components/FontSelectionModal";
import MilestoneModal from "./components/MilestoneModal";
import PaymentScheduleModal from "./components/PaymentScheduleModal";
import AdditionalServicesModal from "./components/AdditionalServicesModal";
import InputModal from "./components/InputModal";

const EditProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Project state
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    projectGoals: [""],
    serviceType: "custom",
    budget: "",
    timeline: "standard",
    companyName: "",
    companyWebsite: "",
    industry: "",
    targetAudience: "",
    name: "",
    email: "",
    phone: "",
    status: "",
    notes: "",
    workflowStage: "discussion",
    projectValue: 0,
    paymentSchedule: [],
    milestones: [],
    startDate: "",
    deadline: "",
    designChoices: {
      colorPalette: [],
      fonts: [],
      designNotes: "",
      approvalStatus: "pending",
    },
    contentStatus: {
      images: "not_started",
      text: "not_started",
      notes: "",
    },
    hosting: {
      provider: "",
      account: "",
      renewalDate: "",
      cost: 0,
      loginInfo: "",
      notes: "",
    },
    domain: {
      name: "",
      registrar: "",
      renewalDate: "",
      cost: 0,
      loginInfo: "",
      notes: "",
    },
    referredBy: {
      name: "",
      email: "",
      phone: "",
      commissionPercentage: 0,
      notes: "",
    },
    additionalServices: [],
  });

  // UI state
  const [activeTab, setActiveTab] = useState("overview");

  // New state for referral modal
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralInput, setReferralInput] = useState({
    name: "",
    email: "",
    phone: "",
    commissionPercentage: 0,
    notes: "",
  });

  // Fetch project data on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        // Safety check for invalid ID
        if (!id) {
          throw new Error("Invalid project ID");
        }

        console.log(`Fetching project details for ID: ${id}`);
        const response = await API.get(`/projects/admin/${id}`);
        console.log("Project data fetched:", response.data);

        // Format dates for form inputs
        const projectData = response.data;
        if (projectData.startDate) {
          projectData.startDate = format(
            new Date(projectData.startDate),
            "yyyy-MM-dd"
          );
        }
        if (projectData.deadline) {
          projectData.deadline = format(
            new Date(projectData.deadline),
            "yyyy-MM-dd"
          );
        }

        // Format dates for nested objects
        if (projectData.hosting && projectData.hosting.renewalDate) {
          projectData.hosting.renewalDate = format(
            new Date(projectData.hosting.renewalDate),
            "yyyy-MM-dd"
          );
        }
        if (projectData.domain && projectData.domain.renewalDate) {
          projectData.domain.renewalDate = format(
            new Date(projectData.domain.renewalDate),
            "yyyy-MM-dd"
          );
        }

        // Make sure arrays are initialized
        if (!projectData.paymentSchedule) projectData.paymentSchedule = [];
        if (!projectData.milestones) projectData.milestones = [];
        if (!projectData.projectGoals) projectData.projectGoals = [""];
        if (!projectData.additionalServices)
          projectData.additionalServices = [];

        // Initialize other objects if not present
        if (!projectData.designChoices) {
          projectData.designChoices = {
            colorPalette: [],
            fonts: [],
            designNotes: "",
            approvalStatus: "pending",
          };
        }
        if (!projectData.contentStatus) {
          projectData.contentStatus = {
            images: "not_started",
            text: "not_started",
            notes: "",
          };
        }

        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load project. Please try again."
        );
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested object changes
  const handleNestedChange = (objName, field, value) => {
    setProject((prev) => ({
      ...prev,
      [objName]: {
        ...prev[objName],
        [field]: value,
      },
    }));
  };

  // Handle referral modal submissions
  const handleReferralSubmit = (e) => {
    e.preventDefault();

    if (!referralInput.name || referralInput.name.trim() === "") {
      return; // We should show an error but we'll keep it simple
    }

    // Update referral information in project state
    setProject((prev) => ({
      ...prev,
      referredBy: {
        ...referralInput,
        commissionPercentage:
          parseFloat(referralInput.commissionPercentage) || 0,
      },
    }));

    // Close modal
    setShowReferralModal(false);
  };

  // Handle project goals (array of strings)
  const handleGoalChange = (index, value) => {
    const updatedGoals = [...project.projectGoals];
    updatedGoals[index] = value;
    setProject((prev) => ({ ...prev, projectGoals: updatedGoals }));
  };

  const addGoal = () => {
    setProject((prev) => ({
      ...prev,
      projectGoals: [...prev.projectGoals, ""],
    }));
  };

  const removeGoal = (index) => {
    const updatedGoals = [...project.projectGoals];
    updatedGoals.splice(index, 1);
    setProject((prev) => ({ ...prev, projectGoals: updatedGoals }));
  };

  // Update status of payment or milestone
  const updateItemStatus = async (itemType, itemId, newStatus) => {
    try {
      let response;
      if (itemType === "payment") {
        response = await API.patch(`/projects/admin/${id}/payments/${itemId}`, {
          status: newStatus,
          paidDate: newStatus === "paid" ? new Date().toISOString() : null,
        });
      } else if (itemType === "milestone") {
        response = await API.patch(
          `/projects/admin/${id}/milestones/${itemId}`,
          {
            status: newStatus,
            completedDate:
              newStatus === "completed" ? new Date().toISOString() : null,
          }
        );
      }

      setProject(response.data.data);
    } catch (err) {
      console.error(`Error updating ${itemType} status:`, err);
      alert(`Failed to update ${itemType} status. Please try again.`);
    }
  };

  // Save the project
  const saveProject = async (e) => {
    e.preventDefault();
    console.log("saveProject called for existing project:", id);

    // Validate required fields
    if (
      !project.projectName ||
      !project.projectDescription ||
      !project.serviceType ||
      !project.companyName ||
      !project.name ||
      !project.email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Remove empty goals
    const validGoals = project.projectGoals.filter(
      (goal) => goal.trim() !== ""
    );
    if (validGoals.length === 0) {
      alert("Please add at least one project goal");
      return;
    }

    // Prepare project data
    const projectData = {
      ...project,
      projectGoals: validGoals,
    };

    try {
      setSaving(true);
      setError(null);

      console.log(
        `About to update project with PATCH to /projects/admin/${id}`
      );
      const response = await API.patch(`/projects/admin/${id}`, projectData);
      console.log("Update project response:", response.data);

      setProject(response.data.data);
      setSaving(false);
      alert("Project updated successfully!");
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project. Please try again.");
      setSaving(false);

      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      }
    }
  };

  // Delete the project
  const deleteProject = async () => {
    try {
      await API.delete(`/projects/admin/${id}`);
      setDeleteModalOpen(false);
      navigate("/admin/projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    }
  };

  // Update workflow stage
  const updateWorkflowStage = async (stage) => {
    try {
      const response = await API.patch(`/projects/admin/${id}/workflow`, {
        workflowStage: stage,
      });
      setProject(response.data.data);
    } catch (err) {
      console.error("Error updating workflow stage:", err);
      alert("Failed to update workflow stage. Please try again.");
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  // Show error message
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
          <h1 className="text-2xl font-bold">Edit Project</h1>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={saveProject}
            disabled={saving}
            className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90 disabled:opacity-70"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <Trash2 size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Project Form */}
      <form onSubmit={saveProject}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Tabs Navigation */}
            <div className="p-1 mb-6 overflow-x-auto bg-white rounded-lg shadow-sm">
              <div className="flex space-x-1">
                <button
                  type="button"
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
                  type="button"
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
                  type="button"
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
                  type="button"
                  onClick={() => setActiveTab("timeline")}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === "timeline"
                      ? "bg-accent text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Timeline
                </button>
                <button
                  type="button"
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
                  type="button"
                  onClick={() => setActiveTab("hosting")}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === "hosting"
                      ? "bg-accent text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Hosting & Domain
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">
                    Project Information
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={project.projectName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Service Type *
                      </label>
                      <select
                        name="serviceType"
                        value={project.serviceType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      >
                        <option value="ecommerce">E-commerce Website</option>
                        <option value="blog">Blog Website</option>
                        <option value="portfolio">Portfolio Website</option>
                        <option value="landing">Landing Page</option>
                        <option value="custom">Custom Website</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={project.projectDescription}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      required
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Project Goals *
                    </label>
                    {project.projectGoals.map((goal, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={goal}
                          onChange={(e) =>
                            handleGoalChange(index, e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder={`Goal ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeGoal(index)}
                          className="p-2 ml-2 text-red-600 bg-white border border-gray-300 rounded-md hover:bg-red-50"
                          disabled={project.projectGoals.length <= 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addGoal}
                      className="flex items-center px-3 py-2 mt-2 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
                    >
                      <PlusCircle size={16} className="mr-1" />
                      Add Goal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Budget *
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={project.budget}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Timeline *
                      </label>
                      <select
                        name="timeline"
                        value={project.timeline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      >
                        <option value="urgent">Urgent (2 weeks)</option>
                        <option value="standard">Standard (2-4 weeks)</option>
                        <option value="relaxed">Flexible (1-2 months)</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <h2 className="mt-8 mb-4 text-lg font-medium">
                    Company Information
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={project.companyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Company Website
                      </label>
                      <input
                        type="text"
                        name="companyWebsite"
                        value={project.companyWebsite}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Industry *
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={project.industry}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Target Audience *
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={project.targetAudience}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Workflow Tab */}
              {activeTab === "workflow" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">Project Workflow</h2>

                  {/* Workflow Stage Selector */}
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Stage
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
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
                          icon: <FileType size={16} />,
                        },
                        {
                          value: "development",
                          label: "Development",
                          icon: <Layers size={16} />,
                        },
                        {
                          value: "revisions",
                          label: "Revisions",
                          icon: <FileText size={16} />,
                        },
                        {
                          value: "deployment",
                          label: "Deployment",
                          icon: <Server size={16} />,
                        },
                        {
                          value: "knowledge_sharing",
                          label: "Knowledge Sharing",
                          icon: <User size={16} />,
                        },
                        {
                          value: "completed",
                          label: "Completed",
                          icon: <div className="w-4 h-4">✓</div>,
                        },
                      ].map((stage) => (
                        <button
                          key={stage.value}
                          type="button"
                          onClick={() => updateWorkflowStage(stage.value)}
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

                  {/* Design Section */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Palette size={20} className="mr-2 text-secondary" />
                      Design Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Color Palette - Using ColorPaletteModal */}
                      <div>
                        <ColorPaletteModal
                          project={project}
                          handleNestedChange={handleNestedChange}
                        />
                      </div>

                      {/* Fonts - Using FontSelectionModal */}
                      <div>
                        <FontSelectionModal
                          project={project}
                          handleNestedChange={handleNestedChange}
                        />
                      </div>

                      {/* Design Notes */}
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Design Notes
                        </label>
                        <textarea
                          value={project.designChoices.designNotes}
                          onChange={(e) =>
                            handleNestedChange(
                              "designChoices",
                              "designNotes",
                              e.target.value
                            )
                          }
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        ></textarea>
                      </div>

                      {/* Approval Status */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Design Approval Status
                        </label>
                        <select
                          value={project.designChoices.approvalStatus}
                          onChange={(e) =>
                            handleNestedChange(
                              "designChoices",
                              "approvalStatus",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="needs_revision">Needs Revision</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Content Collection */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <h3 className="flex items-center mb-4 text-lg font-medium">
                      <Image size={20} className="mr-2 text-secondary" />
                      Content Collection
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Images Status
                        </label>
                        <select
                          value={project.contentStatus.images}
                          onChange={(e) =>
                            handleNestedChange(
                              "contentStatus",
                              "images",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Text Content Status
                        </label>
                        <select
                          value={project.contentStatus.text}
                          onChange={(e) =>
                            handleNestedChange(
                              "contentStatus",
                              "text",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Content Notes
                        </label>
                        <textarea
                          value={project.contentStatus.notes}
                          onChange={(e) =>
                            handleNestedChange(
                              "contentStatus",
                              "notes",
                              e.target.value
                            )
                          }
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Finances Tab */}
              {activeTab === "finances" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">Project Finances</h2>

                  <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Project Value ($)
                      </label>
                      <input
                        type="number"
                        name="projectValue"
                        value={project.projectValue}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div className="flex items-end">
                      <div className="p-2 text-green-700 bg-green-100 rounded-md">
                        <div className="text-sm">Received Payments</div>
                        <div className="text-xl font-bold">
                          $
                          {project.paymentSchedule
                            .filter((p) => p.status === "paid")
                            .reduce(
                              (sum, p) => sum + (parseFloat(p.amount) || 0),
                              0
                            )
                            .toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Schedule - Using PaymentScheduleModal component */}
                  <PaymentScheduleModal
                    project={project}
                    setProject={setProject}
                    updateItemStatus={updateItemStatus}
                    isNewProject={false}
                  />

                  {/* Referral Information */}
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      Referral Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg bg-gray-50 md:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Referred By
                        </label>
                        <input
                          type="text"
                          value={project.referredBy?.name}
                          onChange={(e) =>
                            handleNestedChange(
                              "referredBy",
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Referrer's name"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Commission Percentage
                        </label>
                        <input
                          type="number"
                          value={project.referredBy.commissionPercentage}
                          onChange={(e) =>
                            handleNestedChange(
                              "referredBy",
                              "commissionPercentage",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="e.g. 10"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          value={project.referredBy.email}
                          onChange={(e) =>
                            handleNestedChange(
                              "referredBy",
                              "email",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Referrer's email"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={project.referredBy.phone}
                          onChange={(e) =>
                            handleNestedChange(
                              "referredBy",
                              "phone",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Referrer's phone"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          value={project.referredBy.notes}
                          onChange={(e) =>
                            handleNestedChange(
                              "referredBy",
                              "notes",
                              e.target.value
                            )
                          }
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Additional notes about referral"
                        ></textarea>
                      </div>

                      {project.projectValue > 0 &&
                        project.referredBy.commissionPercentage > 0 && (
                          <div className="p-3 border border-yellow-200 rounded-md md:col-span-2 bg-yellow-50">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-yellow-800">
                                Commission Amount:
                              </span>
                              <span className="text-lg font-bold text-yellow-800">
                                $
                                {(
                                  (project.projectValue *
                                    project.referredBy.commissionPercentage) /
                                  100
                                ).toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-yellow-800">
                                Commission Status:
                              </span>
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  project.referredBy.commissionPaid
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {project.referredBy.commissionPaid
                                  ? "Paid"
                                  : "Unpaid"}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === "timeline" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">Project Timeline</h2>

                  <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={project.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={project.deadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={project.status}
                        onChange={handleChange}
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
                  </div>

                  {/* Milestones - Using MilestoneModal component */}
                  <MilestoneModal
                    project={project}
                    setProject={setProject}
                    updateItemStatus={updateItemStatus}
                    isNewProject={false}
                  />
                </div>
              )}

              {/* Client Tab */}
              {activeTab === "client" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">
                    Client Information
                  </h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={project.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={project.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hosting & Domain Tab */}
              {activeTab === "hosting" && (
                <div className="p-6">
                  <h2 className="mb-4 text-lg font-medium">
                    Hosting & Domain Information
                  </h2>

                  <div className="mb-6">
                    <h3 className="flex items-center mb-3 font-medium text-md">
                      <Server size={18} className="mr-2 text-accent" />
                      Hosting Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg bg-gray-50 md:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Hosting Provider
                        </label>
                        <input
                          type="text"
                          value={project?.hosting?.provider}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "provider",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="e.g. DigitalOcean, AWS"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Account Name
                        </label>
                        <input
                          type="text"
                          value={project?.hosting?.account}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "account",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Account name or ID"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Renewal Date
                        </label>
                        <input
                          type="date"
                          value={project?.hosting?.renewalDate}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "renewalDate",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Annual Cost ($)
                        </label>
                        <input
                          type="number"
                          value={project?.hosting?.cost}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "cost",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Login Information
                        </label>
                        <input
                          type="text"
                          value={project?.hosting?.loginInfo}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "loginInfo",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Username/password (be careful!)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          value={project?.hosting?.notes}
                          onChange={(e) =>
                            handleNestedChange(
                              "hosting",
                              "notes",
                              e.target.value
                            )
                          }
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Additional hosting notes"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center mb-3 font-medium text-md">
                      <Globe size={18} className="mr-2 text-accent" />
                      Domain Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg bg-gray-50 md:grid-cols-2">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Domain Name
                        </label>
                        <input
                          type="text"
                          value={project?.domain?.name}
                          onChange={(e) =>
                            handleNestedChange("domain", "name", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="e.g. example.com"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Registrar
                        </label>
                        <input
                          type="text"
                          value={project?.domain?.registrar}
                          onChange={(e) =>
                            handleNestedChange(
                              "domain",
                              "registrar",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="e.g. GoDaddy, Namecheap"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Renewal Date
                        </label>
                        <input
                          type="date"
                          value={project?.domain?.renewalDate}
                          onChange={(e) =>
                            handleNestedChange(
                              "domain",
                              "renewalDate",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Annual Cost ($)
                        </label>
                        <input
                          type="number"
                          value={project?.domain?.cost}
                          onChange={(e) =>
                            handleNestedChange("domain", "cost", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Login Information
                        </label>
                        <input
                          type="text"
                          value={project?.domain?.loginInfo}
                          onChange={(e) =>
                            handleNestedChange(
                              "domain",
                              "loginInfo",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Username/password (be careful!)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          value={project?.domain?.notes}
                          onChange={(e) =>
                            handleNestedChange(
                              "domain",
                              "notes",
                              e.target.value
                            )
                          }
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Additional domain notes"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="mt-6">
                    <AdditionalServicesModal
                      project={project}
                      setProject={setProject}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Project Notes</h2>
              </div>
              <div className="p-6">
                <textarea
                  name="notes"
                  value={project.notes}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Add any notes about this project..."
                ></textarea>

                <div className="mt-4 text-sm text-gray-500">
                  These notes are for internal use only.
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Upcoming Deadlines</h2>
              </div>
              <div className="p-6">
                {project.milestones && project.milestones.length === 0 ? (
                  <p className="text-gray-500">No upcoming milestones</p>
                ) : (
                  <div className="space-y-4">
                    {project.milestones
                      .filter((m) => m.status !== "completed")
                      .slice(0, 3)
                      .map((milestone, index) => (
                        <div
                          key={milestone._id || index}
                          className="flex justify-between p-3 rounded-md bg-gray-50"
                        >
                          <div>
                            <div className="font-medium text-gray-800">
                              {milestone.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Due:{" "}
                              {milestone.dueDate &&
                                format(
                                  new Date(milestone.dueDate),
                                  "MMM d, yyyy"
                                )}
                            </div>
                          </div>
                          <span
                            className={`self-center px-2 py-1 text-xs font-medium rounded-full ${
                              milestone.status === "pending"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {milestone.status === "pending"
                              ? "Pending"
                              : "In Progress"}
                          </span>
                        </div>
                      ))}

                    {project.milestones.filter((m) => m.status !== "completed")
                      .length > 3 && (
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setActiveTab("timeline")}
                          className="text-sm text-accent hover:underline"
                        >
                          View all milestones
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete this project? This action cannot be undone.`}
      />

      {/* Referral Modal - if needed */}
      <InputModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        onSubmit={handleReferralSubmit}
        title="Add Referral Information"
        submitText="Save Referral"
        icon={<User size={20} className="text-accent" />}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Referrer Name
            </label>
            <input
              type="text"
              value={referralInput.name}
              onChange={(e) =>
                setReferralInput({ ...referralInput, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={referralInput.email}
              onChange={(e) =>
                setReferralInput({ ...referralInput, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Commission (%)
            </label>
            <input
              type="number"
              value={referralInput.commissionPercentage}
              onChange={(e) =>
                setReferralInput({
                  ...referralInput,
                  commissionPercentage: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default EditProjectForm;
