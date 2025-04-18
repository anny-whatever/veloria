// client/src/pages/Admin/EditProjectForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FileText,
  ChevronLeft,
  Save,
  Trash2,
  Calendar,
  IndianRupee,
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
        <div className="w-12 h-12 border-4 border-zinc-300 rounded-full border-t-primary-500 animate-spin dark:border-zinc-700 dark:border-t-primary-400"></div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => navigate(`/admin/projects/${id}`)}
          className="px-4 py-2 mt-4 text-sm text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:text-red-300 dark:bg-red-900/30 dark:hover:bg-red-900/50"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!project) {
    return <div>Project not found.</div>; // Or redirect
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to={`/admin/projects/${id}`}
            className="p-2 mr-4 transition-colors rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Edit Project
          </h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 size={16} className="mr-1.5" />
            Delete Project
          </button>
          <button
            onClick={saveProject}
            disabled={saving}
            className="flex items-center px-4 py-2 text-sm text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-70 transition-colors"
          >
            {saving ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Save size={16} className="mr-1.5" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Project Form - using a single container */}
      <div className="p-6 border rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
        <form onSubmit={saveProject} className="space-y-8">
          {/* Section 1: Project Overview */}
          <section>
            <h2 className="mb-4 text-xl font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200 dark:border-zinc-700">
              Project Overview
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Project Name */}
              <div>
                <label
                  htmlFor="projectName"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Project Name*
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={project.projectName}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="e.g., E-commerce Platform Redesign"
                />
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="serviceType"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Service Type*
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={project.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option
                    value="custom"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Custom Development
                  </option>
                  <option
                    value="package"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Package Deal
                  </option>
                  <option
                    value="consulting"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Consulting
                  </option>
                  <option
                    value="retainer"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Retainer
                  </option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-6">
              <label
                htmlFor="projectDescription"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Project Description*
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={project.projectDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                placeholder="Briefly describe the project and its main objectives."
              ></textarea>
            </div>

            {/* Project Goals */}
            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Project Goals*
              </label>
              {project.projectGoals.map((goal, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    className="w-full py-1.5 px-3 mr-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                    placeholder={`Goal ${index + 1}`}
                  />
                  {project.projectGoals.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGoal(index)}
                      className="p-1.5 text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30"
                      aria-label="Remove goal"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addGoal}
                className="flex items-center mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Goal
              </button>
            </div>
          </section>

          {/* Section 2: Client Information */}
          <section>
            <h2 className="mb-4 text-xl font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200 dark:border-zinc-700">
              Client Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Client Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Contact Person Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="Primary contact"
                />
              </div>

              {/* Client Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Contact Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={project.email}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="contact@example.com"
                />
              </div>

              {/* Client Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={project.phone}
                  onChange={handleChange}
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="+1 555 123 4567"
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Company Name*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={project.companyName}
                  onChange={handleChange}
                  required
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="Client Inc."
                />
              </div>

              {/* Company Website */}
              <div>
                <label
                  htmlFor="companyWebsite"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={project.companyWebsite}
                  onChange={handleChange}
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="https://www.example.com"
                />
              </div>

              {/* Industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={project.industry}
                  onChange={handleChange}
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                  placeholder="e.g., E-commerce, SaaS, Education"
                />
              </div>
            </div>

            {/* Target Audience */}
            <div className="mt-6">
              <label
                htmlFor="targetAudience"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Target Audience
              </label>
              <textarea
                id="targetAudience"
                name="targetAudience"
                value={project.targetAudience}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                placeholder="Describe the intended users or customers."
              ></textarea>
            </div>
          </section>

          {/* Section 3: Financial & Timeline */}
          <section>
            <h2 className="mb-4 text-xl font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200 dark:border-zinc-700">
              Financial & Timeline
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Project Value/Budget */}
              <div>
                <label
                  htmlFor="projectValue"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Project Value (INR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IndianRupee
                      size={16}
                      className="text-zinc-400 dark:text-zinc-500"
                    />
                  </div>
                  <input
                    type="number"
                    id="projectValue"
                    name="projectValue"
                    value={project.projectValue}
                    onChange={handleChange}
                    className="w-full py-1.5 pl-10 pr-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label
                  htmlFor="timeline"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Timeline Preference
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={project.timeline}
                  onChange={handleChange}
                  className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option
                    value="standard"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Standard
                  </option>
                  <option
                    value="expedited"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Expedited
                  </option>
                  <option
                    value="flexible"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Flexible
                  </option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Estimated Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                />
              </div>

              {/* Deadline */}
              <div>
                <label
                  htmlFor="deadline"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Estimated Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={project.deadline}
                  onChange={handleChange}
                  className="w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Payment Schedule Button */}
            <div className="mt-6">
              <PaymentScheduleModal
                schedule={project.paymentSchedule}
                setSchedule={(newSchedule) =>
                  handleNestedChange("paymentSchedule", null, newSchedule)
                }
              />
            </div>

            {/* Milestones Button */}
            <div className="mt-4">
              <MilestoneModal
                milestones={project.milestones}
                setMilestones={(newMilestones) =>
                  handleNestedChange("milestones", null, newMilestones)
                }
              />
            </div>
          </section>

          {/* Section 4: Admin Fields */}
          <section>
            <h2 className="mb-4 text-xl font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200 dark:border-zinc-700">
              Admin Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Project Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                  className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="new" className="bg-zinc-100 dark:bg-zinc-900">
                    New Lead
                  </option>
                  <option
                    value="discussion"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Discussion
                  </option>
                  <option
                    value="proposal"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Proposal Sent
                  </option>
                  <option
                    value="active"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Active
                  </option>
                  <option
                    value="on_hold"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    On Hold
                  </option>
                  <option
                    value="completed"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Completed
                  </option>
                  <option
                    value="cancelled"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Cancelled
                  </option>
                </select>
              </div>

              {/* Workflow Stage */}
              <div>
                <label
                  htmlFor="workflowStage"
                  className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Current Workflow Stage
                </label>
                <select
                  id="workflowStage"
                  name="workflowStage"
                  value={project.workflowStage}
                  onChange={handleChange}
                  className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option
                    value="discovery"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Discovery Call
                  </option>
                  <option
                    value="proposal"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Proposal
                  </option>
                  <option
                    value="contract"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Contract
                  </option>
                  <option
                    value="design"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Design
                  </option>
                  <option
                    value="development"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Development
                  </option>
                  <option
                    value="testing"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Testing
                  </option>
                  <option
                    value="launch"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Launch
                  </option>
                  <option
                    value="post_launch"
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    Post-Launch
                  </option>
                </select>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="mt-6">
              <label
                htmlFor="notes"
                className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Admin Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={project.notes}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                placeholder="Internal notes about this project..."
              ></textarea>
            </div>

            {/* Referral Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                Referral Information
              </h3>
              {project.referredBy && project.referredBy.name ? (
                <div className="p-4 mt-2 border rounded-md bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                  <p className="text-sm">
                    Referred by: {project.referredBy.name}
                  </p>
                  {project.referredBy.email && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {project.referredBy.email}
                    </p>
                  )}
                  {project.referredBy.phone && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {project.referredBy.phone}
                    </p>
                  )}
                  {project.referredBy.commissionPercentage > 0 && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Commission: {project.referredBy.commissionPercentage}%
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setReferralInput(project.referredBy);
                      setShowReferralModal(true);
                    }}
                    className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Edit Referral Info
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setReferralInput({
                      name: "",
                      email: "",
                      phone: "",
                      commissionPercentage: 0,
                      notes: "",
                    });
                    setShowReferralModal(true);
                  }}
                  className="inline-flex items-center px-3 py-1.5 mt-2 text-sm border rounded-md border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <User size={14} className="mr-1.5" /> Add Referral
                </button>
              )}
            </div>
          </section>

          {/* Section 5: Design, Content, Technical */}
          <section>
            <h2 className="mb-4 text-xl font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200 dark:border-zinc-700">
              Design, Content & Technical
            </h2>

            {/* Design Choices */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                Design Choices
              </h3>
              <div className="p-4 space-y-4 border rounded-md bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                <div className="flex items-center space-x-4">
                  <ColorPaletteModal
                    project={project}
                    handleNestedChange={handleNestedChange}
                  />
                  <FontSelectionModal
                    fonts={project.designChoices?.fonts || []}
                    setFonts={(newFonts) =>
                      handleNestedChange("designChoices", "fonts", newFonts)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="designNotes"
                    className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Design Notes
                  </label>
                  <textarea
                    id="designNotes"
                    name="designNotes"
                    value={project.designChoices?.designNotes || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "designChoices",
                        "designNotes",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                    placeholder="Specific design preferences, inspirations, etc."
                  ></textarea>
                </div>
                {/* Approval Status (Example) */}
                <div>
                  <label
                    htmlFor="designApprovalStatus"
                    className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Design Approval Status
                  </label>
                  <select
                    id="designApprovalStatus"
                    value={project.designChoices?.approvalStatus || "pending"}
                    onChange={(e) =>
                      handleNestedChange(
                        "designChoices",
                        "approvalStatus",
                        e.target.value
                      )
                    }
                    className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option
                      value="pending"
                      className="bg-zinc-100 dark:bg-zinc-900"
                    >
                      Pending
                    </option>
                    <option
                      value="approved"
                      className="bg-zinc-100 dark:bg-zinc-900"
                    >
                      Approved
                    </option>
                    <option
                      value="needs_revision"
                      className="bg-zinc-100 dark:bg-zinc-900"
                    >
                      Needs Revision
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Status */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                Content Status
              </h3>
              <div className="p-4 space-y-4 border rounded-md bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contentImages"
                      className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Image Content
                    </label>
                    <select
                      id="contentImages"
                      value={project.contentStatus?.images || "not_started"}
                      onChange={(e) =>
                        handleNestedChange(
                          "contentStatus",
                          "images",
                          e.target.value
                        )
                      }
                      className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option
                        value="not_started"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Not Started
                      </option>
                      <option
                        value="provided"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Client Provided
                      </option>
                      <option
                        value="in_progress"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        In Progress
                      </option>
                      <option
                        value="completed"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Completed
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="contentText"
                      className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      Text Content
                    </label>
                    <select
                      id="contentText"
                      value={project.contentStatus?.text || "not_started"}
                      onChange={(e) =>
                        handleNestedChange(
                          "contentStatus",
                          "text",
                          e.target.value
                        )
                      }
                      className="w-full py-1.5 pl-3 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option
                        value="not_started"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Not Started
                      </option>
                      <option
                        value="provided"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Client Provided
                      </option>
                      <option
                        value="in_progress"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        In Progress
                      </option>
                      <option
                        value="completed"
                        className="bg-zinc-100 dark:bg-zinc-900"
                      >
                        Completed
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contentNotes"
                    className="block mt-4 mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Content Notes
                  </label>
                  <textarea
                    id="contentNotes"
                    value={project.contentStatus?.notes || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        "contentStatus",
                        "notes",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                    placeholder="Notes about content collection, creation, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Technical Details (Hosting & Domain) */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                Technical Details
              </h3>
              <div className="p-4 space-y-4 border rounded-md bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Hosting Details */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300">
                      Hosting
                    </h4>
                    <InputWithLabel
                      id="hostingProvider"
                      label="Provider"
                      value={project.hosting?.provider || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "hosting",
                          "provider",
                          e.target.value
                        )
                      }
                      placeholder="e.g., GoDaddy, AWS"
                    />
                    <InputWithLabel
                      id="hostingAccount"
                      label="Account/Username"
                      value={project.hosting?.account || ""}
                      onChange={(e) =>
                        handleNestedChange("hosting", "account", e.target.value)
                      }
                    />
                    <InputWithLabel
                      id="hostingRenewalDate"
                      label="Renewal Date"
                      type="date"
                      value={project.hosting?.renewalDate || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "hosting",
                          "renewalDate",
                          e.target.value
                        )
                      }
                    />
                    <InputWithLabel
                      id="hostingCost"
                      label="Annual Cost (INR)"
                      type="number"
                      value={project.hosting?.cost || 0}
                      onChange={(e) =>
                        handleNestedChange("hosting", "cost", e.target.value)
                      }
                      placeholder="0"
                      min="0"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <TextAreaWithLabel
                      id="hostingLoginInfo"
                      label="Login Info/Access"
                      value={project.hosting?.loginInfo || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "hosting",
                          "loginInfo",
                          e.target.value
                        )
                      }
                      rows={2}
                      placeholder="URL, username, password (store securely)"
                    />
                    <TextAreaWithLabel
                      id="hostingNotes"
                      label="Hosting Notes"
                      value={project.hosting?.notes || ""}
                      onChange={(e) =>
                        handleNestedChange("hosting", "notes", e.target.value)
                      }
                      rows={2}
                      placeholder="Any additional notes about hosting..."
                    />
                  </div>

                  {/* Domain Details */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300">
                      Domain
                    </h4>
                    <InputWithLabel
                      id="domainName"
                      label="Domain Name"
                      value={project.domain?.name || ""}
                      onChange={(e) =>
                        handleNestedChange("domain", "name", e.target.value)
                      }
                      placeholder="example.com"
                    />
                    <InputWithLabel
                      id="domainRegistrar"
                      label="Registrar"
                      value={project.domain?.registrar || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "domain",
                          "registrar",
                          e.target.value
                        )
                      }
                      placeholder="e.g., GoDaddy, Namecheap"
                    />
                    <InputWithLabel
                      id="domainRenewalDate"
                      label="Renewal Date"
                      type="date"
                      value={project.domain?.renewalDate || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "domain",
                          "renewalDate",
                          e.target.value
                        )
                      }
                    />
                    <InputWithLabel
                      id="domainCost"
                      label="Annual Cost (INR)"
                      type="number"
                      value={project.domain?.cost || 0}
                      onChange={(e) =>
                        handleNestedChange("domain", "cost", e.target.value)
                      }
                      placeholder="0"
                      min="0"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <TextAreaWithLabel
                      id="domainLoginInfo"
                      label="Login Info/Access"
                      value={project.domain?.loginInfo || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "domain",
                          "loginInfo",
                          e.target.value
                        )
                      }
                      rows={2}
                      placeholder="URL, username, password (store securely)"
                    />
                    <TextAreaWithLabel
                      id="domainNotes"
                      label="Domain Notes"
                      value={project.domain?.notes || ""}
                      onChange={(e) =>
                        handleNestedChange("domain", "notes", e.target.value)
                      }
                      rows={2}
                      placeholder="Any additional notes about the domain..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services Button */}
            <div className="mt-6">
              <AdditionalServicesModal
                services={project.additionalServices || []}
                setServices={(newServices) =>
                  handleNestedChange("additionalServices", null, newServices)
                }
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-700">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center w-full px-6 py-2.5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-900 focus:ring-primary-500 disabled:opacity-70 transition-colors"
            >
              {saving ? (
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <Save size={16} className="mr-1.5" />
              )}
              {saving ? "Saving Changes..." : "Save Project Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <InputModal
          isOpen={showReferralModal}
          onClose={() => setShowReferralModal(false)}
          title="Referral Information"
          fields={[
            {
              id: "name",
              label: "Referrer Name*",
              type: "text",
              value: referralInput.name,
              required: true,
            },
            {
              id: "email",
              label: "Referrer Email",
              type: "email",
              value: referralInput.email,
            },
            {
              id: "phone",
              label: "Referrer Phone",
              type: "tel",
              value: referralInput.phone,
            },
            {
              id: "commissionPercentage",
              label: "Commission (%) (0 if none)",
              type: "number",
              value: referralInput.commissionPercentage,
              min: 0,
            },
            {
              id: "notes",
              label: "Referral Notes",
              type: "textarea",
              value: referralInput.notes,
              rows: 3,
            },
          ]}
          formData={referralInput}
          setFormData={setReferralInput}
          onSubmit={handleReferralSubmit}
          submitButtonText="Save Referral Info"
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteProject}
        itemName={project.projectName || "this project"}
      />
    </div>
  );
};

// Helper components for labeled inputs/textareas (Make sure these match CreateProjectForm)
const InputWithLabel = ({ id, label, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      {...props}
      className={`w-full py-1.5 px-3 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors ${
        props.className || ""
      }`}
    />
  </div>
);

const TextAreaWithLabel = ({ id, label, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      {...props}
      className={`w-full p-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors ${
        props.className || ""
      }`}
    ></textarea>
  </div>
);

export default EditProjectForm;
