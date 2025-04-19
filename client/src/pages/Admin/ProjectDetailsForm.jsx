// client/src/pages/Admin/ProjectDetailsForm.jsx - Enhanced with modals
import { useState, useEffect, useRef, useCallback } from "react";
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
  Check,
  X,
  Palette,
  Image,
  FileType,
  Layers,
  Server,
  Globe,
  User,
} from "lucide-react";
import { format, parseISO, addDays } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import ColorPaletteModal from "./components/ColorPaletteModal";
import FontSelectionModal from "./components/FontSelectionModal";
import MilestoneModal from "./components/MilestoneModal";
import PaymentScheduleModal from "./components/PaymentScheduleModal";
import AdditionalServicesModal from "./components/AdditionalServicesModal";
import InputModal from "./components/InputModal";

const ProjectDetailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewProject = id === "new";

  const [loading, setLoading] = useState(!isNewProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

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
    status: isNewProject ? "new" : "",
    notes: "",
    workflowStage: "discussion",
    projectValue: 0,
    paymentSchedule: [],
    milestones: [],
    startDate: new Date().toISOString().substring(0, 10),
    deadline: addDays(new Date(), 30).toISOString().substring(0, 10),
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

  // Fetch project data if editing
  useEffect(() => {
    if (!isNewProject) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          // Check if id is defined before making the API call
          if (id) {
            const response = await API.get(`/projects/admin/${id}`);

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
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching project:", err);
          setError("Failed to load project. Please try again.");
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, isNewProject]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested object changes with added safety
  const handleNestedChange = (objName, field, value) => {
    console.log(`handleNestedChange called: ${objName}.${field}`, value);

    try {
      // Make a safe copy of the value to avoid mutation problems
      const safeValue = Array.isArray(value)
        ? [...value]
        : typeof value === "object" && value !== null
        ? { ...value }
        : value;

      // Log the type of value we're dealing with
      console.log(
        `Value type: ${
          Array.isArray(value) ? "array" : typeof value
        }, length: ${Array.isArray(value) ? value.length : "n/a"}`
      );

      setProject((prev) => {
        // Create a deep clone of the nested object to avoid mutation
        const updatedNestedObj = {
          ...(prev[objName] || {}),
          [field]: safeValue,
        };

        // Create a new object with the updated nested object
        const updated = {
          ...prev,
          [objName]: updatedNestedObj,
        };

        console.log(
          `Updated project ${objName}.${field}:`,
          updated[objName][field]
        );

        // For colorPalette specifically, force a re-render to ensure UI updates
        if (objName === "designChoices" && field === "colorPalette") {
          setTimeout(() => setForceUpdate((f) => f + 1), 0);
        }

        return updated;
      });
    } catch (err) {
      console.error(
        `Error in handleNestedChange for ${objName}.${field}:`,
        err
      );
    }
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
    if (isNewProject) return; // Can't update status for new projects

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
  // Updated saveProject function for ProjectDetailsForm.jsx

  const saveProject = async (e) => {
    e.preventDefault();
    console.log("saveProject called, isNewProject:", isNewProject);

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

      // Log the exact API call we're about to make
      if (isNewProject) {
        console.log("About to create new project with POST to /projects");
      } else {
        console.log(
          `About to update project with PATCH to /projects/admin/${id}`
        );
      }

      let response;
      if (isNewProject) {
        // For new projects - use POST to /projects (public endpoint)
        response = await API.post("/projects", projectData);
        console.log("Create project response:", response.data);

        // Navigate to the new project details page
        const newId = response.data.id || response.data._id;
        if (newId) {
          navigate(`/admin/projects/${newId}`);
        } else {
          console.warn("No project ID in response:", response.data);
          navigate("/admin/projects");
        }
      } else {
        // For existing projects - use PATCH to /projects/admin/:id
        response = await API.patch(`/projects/admin/${id}`, projectData);
        console.log("Update project response:", response.data);
        setProject(response.data.data);
      }

      setSaving(false);
      alert(
        isNewProject
          ? "Project created successfully!"
          : "Project updated successfully!"
      );
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project. Please try again.");
      setSaving(false);

      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      }
    }
  };

  // Delete the project
  const deleteProject = async () => {
    if (isNewProject) {
      navigate("/admin/projects");
      return;
    }

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
    if (isNewProject) {
      setProject((prev) => ({ ...prev, workflowStage: stage }));
    } else {
      try {
        const response = await API.patch(`/projects/admin/${id}/workflow`, {
          workflowStage: stage,
        });
        setProject(response.data.data);
      } catch (err) {
        console.error("Error updating workflow stage:", err);
        alert("Failed to update workflow stage. Please try again.");
      }
    }
  };

  // Add a direct color display function for debugging - UPDATED VERSION WITH BETTER LOGGING
  const renderColorChips = useCallback(() => {
    console.log(
      "Rendering color chips with palette:",
      project?.designChoices?.colorPalette
    );

    // If no colors, return the empty state
    if (
      !project?.designChoices?.colorPalette ||
      project.designChoices.colorPalette.length === 0
    ) {
      console.log("No colors in palette, showing empty state");
      return (
        <div className="flex flex-col items-center justify-center p-3 mb-4 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No colors selected yet. Click "Manage Colors" to add.
          </p>
        </div>
      );
    }

    console.log(
      `Found ${project.designChoices.colorPalette.length} colors to render`
    );

    // SIMPLIFIED DISPLAY: Just show all colors in a simple flat layout
    return (
      <div className="mb-4 space-y-3">
        <div
          className="flex flex-wrap gap-2"
          data-colors-count={project.designChoices.colorPalette.length}
        >
          {project.designChoices.colorPalette.map((color, index) => {
            // Handle both string colors and color objects
            const colorValue = typeof color === "string" ? color : color.color;
            const colorName =
              typeof color === "object" && color.name
                ? color.name
                : `Color ${index + 1}`;
            const category =
              typeof color === "object" && color.category
                ? color.category
                : "primary";

            console.log(
              `Rendering color ${index}: ${colorValue}, ${colorName}, ${category}`
            );

            return (
              <div
                key={`color-${index}-${colorValue}`}
                className="flex items-center px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm"
                title={colorValue}
              >
                <div
                  className="w-4 h-4 mr-1.5 rounded-sm border border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: colorValue }}
                ></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {colorName}{" "}
                  <span className="text-gray-400">({category})</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [project?.designChoices?.colorPalette, forceUpdate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full dark:border-gray-600 border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700/50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => navigate("/admin/projects")}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Separate color palette modal from the form
  const renderColorPaletteModal = () => {
    return (
      <ColorPaletteModal
        project={project}
        handleNestedChange={handleNestedChange}
        buttonClassName="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white rounded-full bg-accent hover:bg-accent/90 shadow-sm w-[120px] justify-center"
        iconSize={14}
      />
    );
  };

  // Separate font selection modal from the form
  const renderFontSelectionModal = () => {
    return (
      <FontSelectionModal
        project={project}
        handleNestedChange={handleNestedChange}
        buttonClassName="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white rounded-full bg-accent hover:bg-accent/90 shadow-sm w-[120px] justify-center"
        iconSize={14}
      />
    );
  };

  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/admin/projects"
            className="p-2 mr-4 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">
            {isNewProject ? "New Project" : "Edit Project"}
          </h1>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={saveProject}
            disabled={saving}
            className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90 disabled:opacity-70 dark:hover:bg-accent/80"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Project"}
          </button>

          {!isNewProject && (
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 dark:hover:bg-red-500"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>
      {/* Project Form */}
      <form onSubmit={saveProject} id="projectForm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main content area (lg:col-span-3) */}
          <div className="lg:col-span-3">
            {/* Mobile Navigation: Horizontal Scrollable Tabs */}
            <div className="block p-1 mb-6 overflow-x-auto bg-white rounded-lg shadow-sm md:hidden dark:bg-gray-800 whitespace-nowrap">
              <nav className="flex space-x-1">
                {[
                  {
                    id: "overview",
                    label: "Overview",
                    icon: <FileText size={16} />,
                  },
                  {
                    id: "workflow",
                    label: "Workflow",
                    icon: <Layers size={16} />,
                  },
                  {
                    id: "design",
                    label: "Design",
                    icon: <Palette size={16} />,
                  },
                  {
                    id: "finances",
                    label: "Finances",
                    icon: <IndianRupee size={16} />,
                  },
                  {
                    id: "timeline",
                    label: "Timeline",
                    icon: <Calendar size={16} />,
                  },
                  { id: "client", label: "Client", icon: <User size={16} /> },
                  {
                    id: "hosting",
                    label: "Hosting & Domain",
                    icon: <Server size={16} />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === item.id
                        ? "bg-accent text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            {/* Desktop Layout: Sidebar + Content */}
            <div className="hidden gap-6 md:flex md:flex-row">
              {" "}
              {/* Hidden on mobile, flex row on desktop */}
              {/* Vertical Sidebar (Desktop) */}
              <div className="w-full md:w-56 lg:w-64 md:sticky md:top-20 md:self-start flex-shrink-0">
                <div className="p-2 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                  <nav className="flex flex-col space-y-1">
                    {[
                      {
                        id: "overview",
                        label: "Overview",
                        icon: <FileText size={16} />,
                      },
                      {
                        id: "workflow",
                        label: "Workflow",
                        icon: <Layers size={16} />,
                      },
                      {
                        id: "design",
                        label: "Design",
                        icon: <Palette size={16} />,
                      },
                      {
                        id: "finances",
                        label: "Finances",
                        icon: <IndianRupee size={16} />,
                      },
                      {
                        id: "timeline",
                        label: "Timeline",
                        icon: <Calendar size={16} />,
                      },
                      {
                        id: "client",
                        label: "Client",
                        icon: <User size={16} />,
                      },
                      {
                        id: "hosting",
                        label: "Hosting & Domain",
                        icon: <Server size={16} />,
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center w-full px-3 py-2.5 text-sm font-medium text-left rounded-md transition-colors ${
                          activeTab === item.id
                            ? "bg-accent text-white shadow-sm"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              {/* Main Content Area (Desktop) */}
              <div className="flex-1 min-w-0">
                {" "}
                {/* Takes remaining space */}
                <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800">
                  {/* Tab Content - Conditionally Rendered */}
                  {/* Overview Tab - Redesigned */}
                  {activeTab === "overview" && (
                    <div className="p-6 space-y-6">
                      {/* Project Information Card */}
                      <div className="p-5 border border-gray-200 rounded-lg dark:border-gray-700">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Project Information
                        </h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {/* Project Name */}
                          <div>
                            <label
                              htmlFor="projectName"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Project Name *
                            </label>
                            <input
                              id="projectName"
                              type="text"
                              name="projectName"
                              value={project.projectName}
                              onChange={handleChange}
                              className="form-input"
                              required
                            />
                          </div>
                          {/* Service Type */}
                          <div>
                            <label
                              htmlFor="serviceType"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Service Type *
                            </label>
                            <select
                              id="serviceType"
                              name="serviceType"
                              value={project.serviceType}
                              onChange={handleChange}
                              className="form-select"
                              required
                            >
                              <option value="ecommerce">
                                E-commerce Website
                              </option>
                              <option value="blog">Blog Website</option>
                              <option value="portfolio">
                                Portfolio Website
                              </option>
                              <option value="landing">Landing Page</option>
                              <option value="custom">Custom Website</option>
                            </select>
                          </div>
                          {/* Project Description */}
                          <div className="md:col-span-2">
                            <label
                              htmlFor="projectDescription"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Project Description *
                            </label>
                            <textarea
                              id="projectDescription"
                              name="projectDescription"
                              value={project.projectDescription}
                              onChange={handleChange}
                              rows="4"
                              className="form-textarea"
                              required
                            ></textarea>
                          </div>
                          {/* Project Goals */}
                          <div className="md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Project Goals *
                            </label>
                            <div className="space-y-2">
                              {project.projectGoals.map((goal, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="text"
                                    value={goal}
                                    onChange={(e) =>
                                      handleGoalChange(index, e.target.value)
                                    }
                                    className="form-input flex-1"
                                    placeholder={`Goal ${index + 1}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeGoal(index)}
                                    className="p-2 text-gray-500 rounded-md hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none flex-shrink-0"
                                    disabled={project.projectGoals.length <= 1}
                                    aria-label="Remove Goal"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={addGoal}
                              className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-white rounded-md bg-accent hover:bg-accent/90 dark:hover:bg-accent/80"
                            >
                              <PlusCircle size={16} className="mr-1.5" />
                              Add Goal
                            </button>
                          </div>
                          {/* Budget */}
                          <div>
                            <label
                              htmlFor="budget"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Budget *
                            </label>
                            <input
                              id="budget"
                              type="text"
                              name="budget"
                              value={project.budget}
                              onChange={handleChange}
                              className="form-input"
                              required
                              placeholder="e.g., $5000 - $10000"
                            />
                          </div>
                          {/* Timeline */}
                          <div>
                            <label
                              htmlFor="timeline"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Timeline *
                            </label>
                            <select
                              id="timeline"
                              name="timeline"
                              value={project.timeline}
                              onChange={handleChange}
                              className="form-select"
                              required
                            >
                              <option value="urgent">
                                Urgent (Approx. 2 weeks)
                              </option>
                              <option value="standard">
                                Standard (Approx. 2-4 weeks)
                              </option>
                              <option value="relaxed">
                                Flexible (Approx. 1-2 months)
                              </option>
                              <option value="not-sure">Not sure yet</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Company Information Card */}
                      <div className="p-5 border border-gray-200 rounded-lg dark:border-gray-700">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Company Information
                        </h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {/* Company Name */}
                          <div>
                            <label
                              htmlFor="companyName"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Company Name *
                            </label>
                            <input
                              id="companyName"
                              type="text"
                              name="companyName"
                              value={project.companyName}
                              onChange={handleChange}
                              className="form-input"
                              required
                            />
                          </div>
                          {/* Company Website */}
                          <div>
                            <label
                              htmlFor="companyWebsite"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Company Website
                            </label>
                            <input
                              id="companyWebsite"
                              type="url"
                              name="companyWebsite"
                              value={project.companyWebsite}
                              onChange={handleChange}
                              className="form-input"
                              placeholder="https://example.com"
                            />
                          </div>
                          {/* Industry */}
                          <div>
                            <label
                              htmlFor="industry"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Industry *
                            </label>
                            <input
                              id="industry"
                              type="text"
                              name="industry"
                              value={project.industry}
                              onChange={handleChange}
                              className="form-input"
                              required
                            />
                          </div>
                          {/* Target Audience */}
                          <div>
                            <label
                              htmlFor="targetAudience"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Target Audience *
                            </label>
                            <input
                              id="targetAudience"
                              type="text"
                              name="targetAudience"
                              value={project.targetAudience}
                              onChange={handleChange}
                              className="form-input"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Design Tab - Redesigned */}
                  {activeTab === "design" && (
                    <div className="p-6 space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Design, Content & Technical
                      </h2>

                      {/* Design Choices Card - COMPLETELY REDESIGNED */}
                      <div className="overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                            <Palette className="mr-3 text-accent" size={20} />
                            Design Choices
                          </h3>
                        </div>

                        <div className="p-6">
                          {/* Color Palette Section - Redesigned */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
                                Color Palette
                              </h4>
                              <div className="flex flex-col items-end">
                                {/* Render color palette modal outside the form context */}
                                {renderColorPaletteModal()}

                                {/* Simple status text below button - matches pattern with fonts */}
                                {project?.designChoices?.colorPalette?.length >
                                0 ? (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {project.designChoices.colorPalette
                                      .slice(0, 3)
                                      .map((colorItem, idx) => {
                                        const colorHex =
                                          typeof colorItem === "string"
                                            ? colorItem
                                            : colorItem.color;
                                        const category =
                                          typeof colorItem === "object" &&
                                          colorItem.category
                                            ? colorItem.category
                                            : "primary";

                                        return (
                                          <div
                                            key={`preview-mini-${idx}`}
                                            className="flex items-center text-xs"
                                          >
                                            <div
                                              className="w-3 h-3 mr-1 rounded-sm border border-gray-300 dark:border-gray-600"
                                              style={{
                                                backgroundColor: colorHex,
                                              }}
                                            />
                                            <span className="capitalize text-gray-500 dark:text-gray-400">
                                              {category}
                                              {idx < 2 &&
                                              project.designChoices.colorPalette
                                                .length > 3 &&
                                              idx === 2
                                                ? "..."
                                                : ""}
                                            </span>
                                            {idx < 2 &&
                                              idx !==
                                                project.designChoices
                                                  .colorPalette.length -
                                                  1 &&
                                              ", "}
                                          </div>
                                        );
                                      })}
                                    {project.designChoices.colorPalette.length >
                                      3 && (
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        +
                                        {project.designChoices.colorPalette
                                          .length - 3}{" "}
                                        more
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    No colors added yet.
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Detailed color preview is now moved/removed since we have the compact version above */}
                          </div>

                          {/* Font Selection Section - Redesigned */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
                                Typography
                              </h4>
                              <div>{renderFontSelectionModal()}</div>
                            </div>

                            {project?.designChoices?.fonts?.length > 0 ? (
                              <div className="space-y-3">
                                {project?.designChoices?.fonts.map(
                                  (font, index) => {
                                    const fontFamily =
                                      typeof font === "string"
                                        ? font
                                        : font.family;
                                    const category =
                                      typeof font === "object" && font.category
                                        ? font.category
                                        : "serif";

                                    return (
                                      <div
                                        key={index}
                                        className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between"
                                      >
                                        <div className="mb-2 md:mb-0">
                                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {fontFamily}
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {category} •{" "}
                                            {index === 0
                                              ? "Primary"
                                              : index === 1
                                              ? "Secondary"
                                              : "Accent"}
                                          </div>
                                        </div>
                                        <div
                                          className="text-base text-gray-800 dark:text-gray-200 overflow-hidden overflow-ellipsis"
                                          style={{
                                            fontFamily: `"${fontFamily}", ${category}`,
                                          }}
                                        >
                                          The quick brown fox jumps over the
                                          lazy dog
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                                <FileType
                                  size={32}
                                  className="text-gray-300 dark:text-gray-600 mb-2"
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  No fonts selected yet
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  Click 'Manage Fonts' to add typography to your
                                  project
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Design Notes - Redesigned */}
                          <div className="mb-8">
                            <label
                              htmlFor="designNotes"
                              className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-200"
                            >
                              Design Notes & Specifications
                            </label>
                            <textarea
                              id="designNotes"
                              value={project.designChoices.designNotes}
                              onChange={(e) =>
                                handleNestedChange(
                                  "designChoices",
                                  "designNotes",
                                  e.target.value
                                )
                              }
                              rows="4"
                              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-transparent dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              placeholder="Specific design preferences, inspirations, brand guidelines, or other important design notes..."
                            ></textarea>
                          </div>

                          {/* Design Approval Status - Redesigned */}
                          <div>
                            <h4 className="mb-4 text-base font-medium text-gray-800 dark:text-gray-200">
                              Design Approval Status
                            </h4>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                              <button
                                type="button"
                                onClick={() =>
                                  handleNestedChange(
                                    "designChoices",
                                    "approvalStatus",
                                    "pending"
                                  )
                                }
                                className={`relative overflow-hidden p-4 rounded-lg border-2 transition-all ${
                                  project.designChoices.approvalStatus ===
                                  "pending"
                                    ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-md"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-200 dark:hover:border-amber-700"
                                }`}
                              >
                                <div className="flex items-center">
                                  <Clock
                                    size={18}
                                    className="text-amber-500 mr-2"
                                  />
                                  <span className="font-medium text-sm text-amber-700 dark:text-amber-400">
                                    Pending Review
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-amber-600/70 dark:text-amber-400/70">
                                  Waiting for client review
                                </p>
                                {project.designChoices.approvalStatus ===
                                  "pending" && (
                                  <div className="absolute top-2 right-2">
                                    <Check
                                      size={16}
                                      className="text-amber-500"
                                    />
                                  </div>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleNestedChange(
                                    "designChoices",
                                    "approvalStatus",
                                    "approved"
                                  )
                                }
                                className={`relative overflow-hidden p-4 rounded-lg border-2 transition-all ${
                                  project.designChoices.approvalStatus ===
                                  "approved"
                                    ? "border-green-400 bg-green-50 dark:bg-green-900/20 shadow-md"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-200 dark:hover:border-green-700"
                                }`}
                              >
                                <div className="flex items-center">
                                  <Check
                                    size={18}
                                    className="text-green-500 mr-2"
                                  />
                                  <span className="font-medium text-sm text-green-700 dark:text-green-400">
                                    Approved
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
                                  Design approved by client
                                </p>
                                {project.designChoices.approvalStatus ===
                                  "approved" && (
                                  <div className="absolute top-2 right-2">
                                    <Check
                                      size={16}
                                      className="text-green-500"
                                    />
                                  </div>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleNestedChange(
                                    "designChoices",
                                    "approvalStatus",
                                    "needs_revision"
                                  )
                                }
                                className={`relative overflow-hidden p-4 rounded-lg border-2 transition-all ${
                                  project.designChoices.approvalStatus ===
                                  "needs_revision"
                                    ? "border-red-400 bg-red-50 dark:bg-red-900/20 shadow-md"
                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-200 dark:hover:border-red-700"
                                }`}
                              >
                                <div className="flex items-center">
                                  <X size={18} className="text-red-500 mr-2" />
                                  <span className="font-medium text-sm text-red-700 dark:text-red-400">
                                    Needs Revision
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">
                                  Client requested changes
                                </p>
                                {project.designChoices.approvalStatus ===
                                  "needs_revision" && (
                                  <div className="absolute top-2 right-2">
                                    <Check size={16} className="text-red-500" />
                                  </div>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Collection Card */}
                      <div className="p-5 border border-gray-200 rounded-lg dark:border-gray-700">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                          <Image className="mr-2 text-accent" size={18} />
                          Content Collection
                        </h3>
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                          <div>
                            <label
                              htmlFor="imagesStatus"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Images Status
                            </label>
                            <select
                              id="imagesStatus"
                              value={project.contentStatus.images}
                              onChange={(e) =>
                                handleNestedChange(
                                  "contentStatus",
                                  "images",
                                  e.target.value
                                )
                              }
                              className="form-select"
                            >
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="textStatus"
                              className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Text Content Status
                            </label>
                            <select
                              id="textStatus"
                              value={project.contentStatus.text}
                              onChange={(e) =>
                                handleNestedChange(
                                  "contentStatus",
                                  "text",
                                  e.target.value
                                )
                              }
                              className="form-select"
                            >
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-5">
                          <label
                            htmlFor="contentNotes"
                            className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Content Notes
                          </label>
                          <textarea
                            id="contentNotes"
                            value={project.contentStatus.notes}
                            onChange={(e) =>
                              handleNestedChange(
                                "contentStatus",
                                "notes",
                                e.target.value
                              )
                            }
                            rows="3"
                            className="form-textarea"
                            placeholder="Notes about content delivery, formats, missing items, etc."
                          ></textarea>
                        </div>
                      </div>

                      {/* Technical Information Card (Placeholder - needs state/inputs) */}
                      <div className="p-5 border border-gray-200 rounded-lg dark:border-gray-700">
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                          <Server className="mr-2 text-accent" size={18} />
                          Technical Information
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placeholder: Technical details like framework,
                          performance needs, etc. will go here. (Requires state
                          updates)
                        </p>
                        {/* Example Structure (needs state integration) */}
                        {/*
                           <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                              <div>
                                 <label htmlFor="frontendTech" className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Frontend Framework</label>
                                 <select id="frontendTech" name="technical.frontend" className="form-select">
                                     <option value="react">React</option> <option value="vue">Vue</option> ... 
                                 </select>
                              </div>
                              <div>
                                 <label htmlFor="backendTech" className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Backend Technology</label>
                                  <select id="backendTech" name="technical.backend" className="form-select"> ... </select>
                              </div>
                           </div>
                           <div className="mt-5 space-y-2">
                                <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Performance Needs</label>
                                <div className="flex items-center">
                                     <input type="checkbox" id="perfOpt" name="technical.perfOpt" className="form-checkbox" />
                                     <label htmlFor="perfOpt" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires performance optimization</label>
                                </div>
                                <div className="flex items-center">
                                     <input type="checkbox" id="responsiveCheck" name="technical.responsive" className="form-checkbox" />
                                     <label htmlFor="responsiveCheck" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Responsive design (mobile-friendly)</label>
                                </div>
                                 // ... etc ... 
                           </div>
                            <div className="mt-5">
                                <label htmlFor="techNotes" className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Technical Notes</label>
                                <textarea id="techNotes" name="technical.notes" rows="3" className="form-textarea"></textarea>
                            </div>
                            */}
                      </div>
                    </div>
                  )}

                  {/* Workflow Tab Placeholder */}
                  {activeTab === "workflow" && (
                    <div className="p-6">Workflow Content Placeholder</div>
                  )}
                  {/* Finances Tab Placeholder */}
                  {activeTab === "finances" && (
                    <div className="p-6">Finances Content Placeholder</div>
                  )}
                  {/* Timeline Tab Placeholder */}
                  {activeTab === "timeline" && (
                    <div className="p-6">Timeline Content Placeholder</div>
                  )}
                  {/* Client Tab Placeholder */}
                  {activeTab === "client" && (
                    <div className="p-6">Client Content Placeholder</div>
                  )}
                  {/* Hosting & Domain Tab Placeholder */}
                  {activeTab === "hosting" && (
                    <div className="p-6">
                      Hosting & Domain Content Placeholder
                    </div>
                  )}
                </div>{" "}
                {/* End content bg container */}
              </div>{" "}
              {/* End main content flex item */}
            </div>{" "}
            {/* End desktop flex container */}
          </div>{" "}
          {/* End lg:col-span-3 */}
          {/* Right Sidebar (Project Notes, Deadlines) - lg:col-span-1 */}
          <div className="lg:col-span-1">
            {/* Project Notes Card */}
            <div className="p-5 mb-6 overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800">
              <h2 className="mb-3 text-lg font-medium">Project Notes</h2>
              <textarea
                name="notes"
                value={project.notes}
                onChange={handleChange}
                rows="8"
                className="form-textarea"
                placeholder="Internal notes about this project..."
              ></textarea>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Notes are for internal use only.
              </p>
            </div>

            {/* Upcoming Deadlines Card */}
            {!isNewProject && (
              <div className="p-5 overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800">
                <h2 className="mb-3 text-lg font-medium">Upcoming Deadlines</h2>
                {project.milestones.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No upcoming milestones
                  </p>
                ) : (
                  <div className="space-y-3">
                    {project.milestones
                      .filter((m) => m.status !== "completed")
                      .slice(0, 3)
                      .map((milestone, index) => (
                        <div
                          key={milestone._id || index}
                          className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700/50"
                        >
                          <div>
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {milestone.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Due:{" "}
                              {format(
                                new Date(milestone.dueDate),
                                "MMM d, yyyy"
                              )}
                            </div>
                          </div>
                          <span
                            className={`self-center px-2 py-0.5 text-xs font-medium rounded-full ${
                              milestone.status === "pending"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
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
                      <div className="pt-2 text-center">
                        <button
                          type="button" // Use button instead of link for SPA navigation
                          onClick={() => setActiveTab("timeline")}
                          className="text-sm font-medium text-accent hover:underline dark:text-accent-light dark:hover:text-accent-lighter"
                        >
                          View all milestones
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>{" "}
          {/* End Right Sidebar (lg:col-span-1) */}
        </div>{" "}
        {/* End grid */}
      </form>{" "}
      {/* Ensure form tag closes here */}
      {/* Modals */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete this project? This action cannot be undone.`}
      />
      <InputModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        onSubmit={handleReferralSubmit}
        title="Add Referral Information"
        submitText="Save Referral"
        icon={<User size={20} className="text-accent" />}
      >
        {/* ... modal content ... */}
      </InputModal>
    </div> // End top-level component div
  );
}; // End of ProjectDetailsForm component function

export default ProjectDetailsForm; // Ensure this is the only default export
