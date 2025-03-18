// client/src/pages/Admin/ProjectDetailsForm.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InputModal from "./components/InputModal";
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

const ProjectDetailsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewProject = id === "new";

  const [loading, setLoading] = useState(!isNewProject);
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
  });

  // UI state
  const [activeTab, setActiveTab] = useState("overview");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: "",
    amount: "",
    dueDate: "",
    status: "pending",
    notes: "",
  });
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  // New state for color modal
  const [showColorModal, setShowColorModal] = useState(false);
  const [colorInput, setColorInput] = useState("");
  const [colorError, setColorError] = useState("");
  const initialFocusRef = useRef(null);

  // Fetch project data if editing
  // Modify your useEffect in ProjectDetailsForm.jsx
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

  const validateHexColor = (color) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(color);
  };

  const handleColorSubmit = (e) => {
    e.preventDefault();

    if (!colorInput) {
      setColorError("Please enter a color hex code");
      return;
    }

    // Validate hex color format
    if (!validateHexColor(colorInput)) {
      setColorError("Please enter a valid hex color (e.g. #FF5733)");
      return;
    }

    // Add color to palette
    handleNestedChange("designChoices", "colorPalette", [
      ...(project.designChoices.colorPalette || []),
      colorInput,
    ]);

    // Reset and close modal
    setColorInput("");
    setColorError("");
    setShowColorModal(false);
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

  // Payment handlers
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const addPayment = async () => {
    if (!newPayment.name || !newPayment.amount || !newPayment.dueDate) {
      alert("Please fill in all required payment fields");
      return;
    }

    if (isNewProject) {
      // If this is a new project, just add to local state
      const payment = {
        ...newPayment,
        _id: Date.now().toString(), // Temporary ID
      };
      setProject((prev) => ({
        ...prev,
        paymentSchedule: [...prev.paymentSchedule, payment],
      }));
    } else {
      // If editing existing project, call API
      try {
        const response = await API.post(
          `/projects/admin/${id}/payments`,
          newPayment
        );
        setProject(response.data.data);
      } catch (err) {
        console.error("Error adding payment:", err);
        alert("Failed to add payment. Please try again.");
        return;
      }
    }

    // Reset form
    setNewPayment({
      name: "",
      amount: "",
      dueDate: "",
      status: "pending",
      notes: "",
    });
    setShowPaymentForm(false);
  };

  // Milestone handlers
  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone((prev) => ({ ...prev, [name]: value }));
  };

  const addMilestone = async () => {
    if (!newMilestone.name || !newMilestone.dueDate) {
      alert("Please fill in all required milestone fields");
      return;
    }

    if (isNewProject) {
      // If this is a new project, just add to local state
      const milestone = {
        ...newMilestone,
        _id: Date.now().toString(), // Temporary ID
      };
      setProject((prev) => ({
        ...prev,
        milestones: [...prev.milestones, milestone],
      }));
    } else {
      // If editing existing project, call API
      try {
        const response = await API.post(
          `/projects/admin/${id}/milestones`,
          newMilestone
        );
        setProject(response.data.data);
      } catch (err) {
        console.error("Error adding milestone:", err);
        alert("Failed to add milestone. Please try again.");
        return;
      }
    }

    // Reset form
    setNewMilestone({
      name: "",
      description: "",
      dueDate: "",
      status: "pending",
    });
    setShowMilestoneForm(false);
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
  const saveProject = async (e) => {
    e.preventDefault();

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

      let response;
      if (isNewProject) {
        response = await API.post("/projects", projectData);
        // Navigate to the new project after creation
        navigate(`/admin/projects/${response.data.id}`);
      } else {
        response = await API.patch(`/projects/admin/${id}`, projectData);
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
          <h1 className="text-2xl font-bold">
            {isNewProject ? "New Project" : "Edit Project"}
          </h1>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={saveProject}
            disabled={saving}
            className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90 disabled:opacity-70"
          >
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save Project"}
          </button>

          {!isNewProject && (
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </button>
          )}
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
                          <X size={16} />
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
                          icon: <Check size={16} />,
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
                      {/* Color Palette */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Color Palette
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.designChoices.colorPalette &&
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
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedColors = [
                                        ...project.designChoices.colorPalette,
                                      ];
                                      updatedColors.splice(index, 1);
                                      handleNestedChange(
                                        "designChoices",
                                        "colorPalette",
                                        updatedColors
                                      );
                                    }}
                                    className="p-1 ml-1 text-red-600 rounded-md hover:bg-red-50"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              )
                            )}

                          <button
                            type="button"
                            onClick={() => setShowColorModal(true)}
                            className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <PlusCircle size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Color Input Modal */}
                      <InputModal
                        isOpen={showColorModal}
                        onClose={() => {
                          setShowColorModal(false);
                          setColorError("");
                          setColorInput("");
                        }}
                        onSubmit={handleColorSubmit}
                        title="Add Color to Palette"
                        submitText="Add Color"
                        icon={<Palette size={20} className="text-accent" />}
                      >
                        <div>
                          <label
                            htmlFor="colorHex"
                            className="block mb-2 text-sm font-medium text-gray-700"
                          >
                            Color Hex Code
                          </label>
                          <div className="flex space-x-2">
                            <input
                              id="colorHex"
                              ref={initialFocusRef}
                              type="text"
                              placeholder="#FF5733"
                              value={colorInput}
                              onChange={(e) => setColorInput(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                            {colorInput && validateHexColor(colorInput) && (
                              <div
                                className="w-10 h-10 border border-gray-300 rounded-md"
                                style={{ backgroundColor: colorInput }}
                              ></div>
                            )}
                          </div>
                          {colorError && (
                            <p className="mt-1 text-sm text-red-600">
                              {colorError}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-500">
                            Enter a valid hex color code (e.g. #FF5733)
                          </p>
                        </div>
                      </InputModal>

                      {/* Fonts */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Fonts
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.designChoices.fonts &&
                            project.designChoices.fonts.map((font, index) => (
                              <div
                                key={index}
                                className="flex items-center p-1 bg-white border border-gray-300 rounded-md"
                              >
                                <span className="text-xs font-medium">
                                  {font}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedFonts = [
                                      ...project.designChoices.fonts,
                                    ];
                                    updatedFonts.splice(index, 1);
                                    handleNestedChange(
                                      "designChoices",
                                      "fonts",
                                      updatedFonts
                                    );
                                  }}
                                  className="p-1 ml-1 text-red-600 rounded-md hover:bg-red-50"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}

                          <button
                            type="button"
                            onClick={() => {
                              const font = prompt("Enter font name:");
                              if (font) {
                                handleNestedChange("designChoices", "fonts", [
                                  ...(project.designChoices.fonts || []),
                                  font,
                                ]);
                              }
                            }}
                            className="flex items-center justify-center w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <PlusCircle size={16} />
                          </button>
                        </div>
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

                  {/* Payment Schedule */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Payment Schedule</h3>
                      <button
                        type="button"
                        onClick={() => setShowPaymentForm(!showPaymentForm)}
                        className="flex items-center px-3 py-1 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
                      >
                        <PlusCircle size={16} className="mr-1" />
                        Add Payment
                      </button>
                    </div>

                    {showPaymentForm && (
                      <div className="p-4 mb-4 rounded-lg bg-gray-50">
                        <h4 className="mb-4 text-sm font-medium">
                          New Payment
                        </h4>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Payment Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={newPayment?.name}
                              onChange={handlePaymentChange}
                              placeholder="e.g. Initial Deposit, Final Payment"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                              required
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Amount ($) *
                            </label>
                            <input
                              type="number"
                              name="amount"
                              value={newPayment?.amount}
                              onChange={handlePaymentChange}
                              placeholder="0.00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                              required
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Due Date *
                            </label>
                            <input
                              type="date"
                              name="dueDate"
                              value={newPayment?.dueDate}
                              onChange={handlePaymentChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                              required
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <select
                              name="status"
                              value={newPayment?.status}
                              onChange={handlePaymentChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="overdue">Overdue</option>
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Notes
                            </label>
                            <textarea
                              name="notes"
                              value={newPayment?.notes}
                              onChange={handlePaymentChange}
                              rows="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                            ></textarea>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowPaymentForm(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={addPayment}
                            className="px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
                          >
                            Add Payment
                          </button>
                        </div>
                      </div>
                    )}

                    {project.paymentSchedule.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 rounded-lg bg-gray-50">
                        No payments scheduled yet
                      </div>
                    ) : (
                      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
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
                            {project.paymentSchedule.map((payment, index) => (
                              <tr key={payment._id || index}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {payment?.name}
                                  </div>
                                  {payment.notes && (
                                    <div className="text-xs text-gray-500">
                                      {payment?.notes}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-green-600">
                                    $
                                    {parseFloat(
                                      payment.amount
                                    ).toLocaleString()}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
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
                                  {!isNewProject && (
                                    <div className="flex justify-end space-x-1">
                                      {payment.status !== "paid" && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateItemStatus(
                                              "payment",
                                              payment._id,
                                              "paid"
                                            )
                                          }
                                          className="p-1 text-green-600 rounded-md hover:bg-green-50"
                                          title="Mark as Paid"
                                        >
                                          <Check size={16} />
                                        </button>
                                      )}
                                      {payment.status === "paid" && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateItemStatus(
                                              "payment",
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
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

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

                  {/* Milestones */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        Project Milestones
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                        className="flex items-center px-3 py-1 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
                      >
                        <PlusCircle size={16} className="mr-1" />
                        Add Milestone
                      </button>
                    </div>

                    {showMilestoneForm && (
                      <div className="p-4 mb-4 rounded-lg bg-gray-50">
                        <h4 className="mb-4 text-sm font-medium">
                          New Milestone
                        </h4>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Milestone Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={newMilestone.name}
                              onChange={handleMilestoneChange}
                              placeholder="e.g. Design Approval, Launch"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                              required
                            />
                          </div>

                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Due Date *
                            </label>
                            <input
                              type="date"
                              name="dueDate"
                              value={newMilestone.dueDate}
                              onChange={handleMilestoneChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea
                              name="description"
                              value={newMilestone.description}
                              onChange={handleMilestoneChange}
                              rows="2"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                            ></textarea>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowMilestoneForm(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={addMilestone}
                            className="px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
                          >
                            Add Milestone
                          </button>
                        </div>
                      </div>
                    )}

                    {project.milestones.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 rounded-lg bg-gray-50">
                        No milestones added yet
                      </div>
                    ) : (
                      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Milestone
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
                            {project.milestones.map((milestone, index) => (
                              <tr key={milestone._id || index}>
                                <td className="px-4 py-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {milestone.name}
                                  </div>
                                  {milestone.description && (
                                    <div className="text-xs text-gray-500">
                                      {milestone.description}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {format(
                                      new Date(milestone.dueDate),
                                      "MMM d, yyyy"
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
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
                                </td>
                                <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                                  {!isNewProject && (
                                    <div className="flex justify-end space-x-1">
                                      {milestone.status !== "completed" && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            updateItemStatus(
                                              "milestone",
                                              milestone._id,
                                              "completed"
                                            )
                                          }
                                          className="p-1 text-green-600 rounded-md hover:bg-green-50"
                                          title="Mark as Completed"
                                        >
                                          <Check size={16} />
                                        </button>
                                      )}
                                      {milestone.status !== "in_progress" &&
                                        milestone.status !== "completed" && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateItemStatus(
                                                "milestone",
                                                milestone._id,
                                                "in_progress"
                                              )
                                            }
                                            className="p-1 text-yellow-600 rounded-md hover:bg-yellow-50"
                                            title="Mark as In Progress"
                                          >
                                            <Clock size={16} />
                                          </button>
                                        )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
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

            {!isNewProject && (
              <div className="mt-6 overflow-hidden bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-medium">Upcoming Deadlines</h2>
                </div>
                <div className="p-6">
                  {project.milestones.length === 0 ? (
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
                                {format(
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

                      {project.milestones.filter(
                        (m) => m.status !== "completed"
                      ).length > 3 && (
                        <div className="text-center">
                          <a
                            href="#"
                            onClick={() => setActiveTab("timeline")}
                            className="text-sm text-accent hover:underline"
                          >
                            View all milestones
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
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
    </div>
  );
};

export default ProjectDetailsForm;
