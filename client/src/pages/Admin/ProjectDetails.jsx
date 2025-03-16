// client/src/pages/Admin/ProjectDetails.jsx - Enhanced with edit capabilities
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
  DollarSign,
  Calendar,
  Clock,
  PlusCircle,
  Building,
  X,
  Check,
  ArrowRight,
  Globe,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [editedData, setEditedData] = useState({
    status: "",
    notes: "",
    projectValue: 0,
  });
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
        const projectData = response.data;
        
        // Format dates if they exist
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
        
        setProject(projectData);
        setEditedData({
          status: projectData.status || "new",
          notes: projectData.notes || "",
          projectValue: projectData.projectValue || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  // Handle editing project data
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle saving project changes
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      
      // Update project values
      const updatedData = {
        ...editedData,
        projectValue: parseFloat(editedData.projectValue) || 0
      };
      
      const response = await API.patch(`/projects/admin/${id}`, updatedData);
      setProject(response.data.data);
      setEditMode(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project. Please try again.");
      setLoading(false);
    }
  };

  // Handle project status change
  const handleStatusChange = (e) => {
    setEditedData({
      ...editedData,
      status: e.target.value,
    });
  };

  // Payment handlers
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({ ...prev, [name]: value }));
  };

  const addPayment = async () => {
    if (!newPayment.name || !newPayment.amount || !newPayment.dueDate) {
      alert("Please fill in all required payment fields");
      return;
    }

    try {
      const response = await API.post(
        `/projects/admin/${id}/payments`,
        newPayment
      );
      setProject(response.data.data);
      
      // Reset form
      setNewPayment({
        name: "",
        amount: "",
        dueDate: "",
        status: "pending",
        notes: "",
      });
      setShowPaymentForm(false);
    } catch (err) {
      console.error("Error adding payment:", err);
      alert("Failed to add payment. Please try again.");
    }
  };

  // Update payment status
  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      const response = await API.patch(
        `/projects/admin/${id}/payments/${paymentId}`,
        {
          status: newStatus,
          paidDate: newStatus === "paid" ? new Date().toISOString() : null,
        }
      );
      setProject(response.data.data);
    } catch (err) {
      console.error("Error updating payment status:", err);
      alert("Failed to update payment status. Please try again.");
    }
  };

  // Milestone handlers
  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone(prev => ({ ...prev, [name]: value }));
  };

  const addMilestone = async () => {
    if (!newMilestone.name || !newMilestone.dueDate) {
      alert("Please fill in all required milestone fields");
      return;
    }

    try {
      const response = await API.post(
        `/projects/admin/${id}/milestones`,
        newMilestone
      );
      setProject(response.data.data);
      
      // Reset form
      setNewMilestone({
        name: "",
        description: "",
        dueDate: "",
        status: "pending",
      });
      setShowMilestoneForm(false);
    } catch (err) {
      console.error("Error adding milestone:", err);
      alert("Failed to add milestone. Please try again.");
    }
  };

  // Update milestone status
  const updateMilestoneStatus = async (milestoneId, newStatus) => {
    try {
      const response = await API.patch(
        `/projects/admin/${id}/milestones/${milestoneId}`,
        {
          status: newStatus,
          completedDate: newStatus === "completed" ? new Date().toISOString() : null,
        }
      );
      setProject(response.data.data);
    } catch (err) {
      console.error("Error updating milestone status:", err);
      alert("Failed to update milestone status. Please try again.");
    }
  };

  // Handle deleting the project
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Retry fetching the project
  const retry = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/projects/admin/${id}`);
      setProject(response.data);
      setEditedData({
        status: response.data.status || "new",
        notes: response.data.notes || "",
        projectValue: response.data.projectValue || 0,
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
    return <LoadingSpinner message="Loading project details..." />;
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

  // Calculate financial metrics
  const totalPayments = project.paymentSchedule?.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0) || 0;
  const receivedPayments = project.paymentSchedule?.filter(p => p.status === 'paid').reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0) || 0;
  const pendingPayments = totalPayments - receivedPayments;
  const paymentProgress = totalPayments > 0 ? (receivedPayments / totalPayments) * 100 : 0;

  // Get project stages for workflow selection
  const workflowStages = [
    { value: "discussion", label: "Discussion", color: "bg-blue-100 text-blue-800" },
    { value: "design", label: "Design", color: "bg-purple-100 text-purple-800" },
    { value: "content_collection", label: "Content Collection", color: "bg-amber-100 text-amber-800" },
    { value: "development", label: "Development", color: "bg-cyan-100 text-cyan-800" },
    { value: "revisions", label: "Revisions", color: "bg-pink-100 text-pink-800" },
    { value: "deployment", label: "Deployment", color: "bg-indigo-100 text-indigo-800" },
    { value: "knowledge_sharing", label: "Knowledge Sharing", color: "bg-teal-100 text-teal-800" },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  ];

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

      {/* Project Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Project Overview */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Project Overview</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-medium text-gray-700">Project Name</h3>
                {editMode ? (
                  <input
                    type="text"
                    name="projectName"
                    value={editedData.projectName || project.projectName}
                    onChange={handleDataChange}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                ) : (
                  <p className="text-lg">{project.projectName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium text-gray-700">Service Type</h3>
                  <p className="capitalize">{project.serviceType}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">Status</h3>
                  {editMode ? (
                    <select
                      name="status"
                      value={editedData.status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-progress">In Progress</option>
                      <option value="quoted">Quoted</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                      ${project.status === "new" ? "bg-blue-100 text-blue-800" : ""}
                      ${project.status === "contacted" ? "bg-purple-100 text-purple-800" : ""}
                      ${project.status === "in-progress" ? "bg-amber-100 text-amber-800" : ""}
                      ${project.status === "quoted" ? "bg-cyan-100 text-cyan-800" : ""}
                      ${project.status === "accepted" ? "bg-green-100 text-green-800" : ""}
                      ${project.status === "declined" ? "bg-red-100 text-red-800" : ""}
                    `}>
                      {project.status?.charAt(0).toUpperCase() + project.status?.slice(1) || "New"}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
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

              <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium text-gray-700">Budget Range</h3>
                  <p>{project.budget}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Timeline</h3>
                  <p>
                    {project.timeline === "urgent" && "Urgent (2 weeks)"}
                    {project.timeline === "standard" && "Standard (2-4 weeks)"}
                    {project.timeline === "relaxed" && "Flexible (1-2 months)"}
                    {project.timeline === "not-sure" && "Not sure yet"}
                  </p>
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
              <div className="flex mb-4">
                <Building size={20} className="flex-shrink-0 mr-3 text-accent" />
                <div>
                  <h3 className="font-medium text-gray-700">Company Name</h3>
                  <p>{project.companyName}</p>
                </div>
              </div>

              {project.companyWebsite && (
                <div className="flex mb-4">
                  <Globe size={20} className="flex-shrink-0 mr-3 text-accent" />
                  <div>
                    <h3 className="font-medium text-gray-700">Website</h3>
                    <a 
                      href={project.companyWebsite.startsWith('http') ? project.companyWebsite : `https://${project.companyWebsite}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {project.companyWebsite}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex mb-4">
                <FileText size={20} className="flex-shrink-0 mr-3 text-accent" />
                <div>
                  <h3 className="font-medium text-gray-700">Industry</h3>
                  <p>{project.industry}</p>
                </div>
              </div>

              <div className="flex">
                <User size={20} className="flex-shrink-0 mr-3 text-accent" />
                <div>
                  <h3 className="font-medium text-gray-700">Target Audience</h3>
                  <p>{project.targetAudience}</p>
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
              <div className="flex mb-4">
                <User size={20} className="flex-shrink-0 mr-3 text-secondary" />
                <div>
                  <h3 className="font-medium text-gray-700">Name</h3>
                  <p>{project.name}</p>
                </div>
              </div>

              <div className="flex mb-4">
                <Mail size={20} className="flex-shrink-0 mr-3 text-secondary" />
                <div>
                  <h3 className="font-medium text-gray-700">Email</h3>
                  <a href={`mailto:${project.email}`} className="text-secondary hover:underline">
                    {project.email}
                  </a>
                </div>
              </div>

              {project.phone && (
                <div className="flex">
                  <Phone size={20} className="flex-shrink-0 mr-3 text-secondary" />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <a href={`tel:${project.phone}`} className="text-secondary hover:underline">
                      {project.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Milestones */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Project Milestones</h2>
              <button
                onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                className="flex items-center px-3 py-1 text-sm bg-white border rounded-md border-accent text-accent hover:bg-accent/10"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Milestone
              </button>
            </div>
            <div className="p-6">
              {showMilestoneForm && (
                <div className="p-4 mb-6 border rounded-lg bg-gray-50">
                  <h3 className="mb-3 text-sm font-medium">New Milestone</h3>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder="e.g. Design Approval"
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
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="px-3 py-2 text-sm text-white rounded-md bg-accent hover:bg-accent/90"
                    >
                      Add Milestone
                    </button>
                  </div>
                </div>
              )}

              {(!project.milestones || project.milestones.length === 0) ? (
                <div className="p-8 text-center text-gray-500">
                  No milestones have been added yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Milestone</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {project.milestones.map((milestone) => (
                        <tr key={milestone._id} className="hover:bg-gray-50">
                          <td className="px-3 py-4">
                            <div className="font-medium text-gray-900">{milestone.name}</div>
                            {milestone.description && (
                              <div className="text-xs text-gray-500">{milestone.description}</div>
                            )}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            {milestone.dueDate ? format(new Date(milestone.dueDate), "MMM d, yyyy") : "No date"}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${milestone.status === "pending" ? "bg-blue-100 text-blue-800" : ""}
                              ${milestone.status === "in_progress" ? "bg-amber-100 text-amber-800" : ""}
                              ${milestone.status === "completed" ? "bg-green-100 text-green-800" : ""}
                              ${milestone.status === "delayed" ? "bg-red-100 text-red-800" : ""}
                            `}>
                              {milestone.status === "in_progress" ? "In Progress" : 
                                milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm text-right whitespace-nowrap">
                            <div className="flex justify-end space-x-1">
                              {milestone.status !== "completed" && (
                                <button
                                  type="button"
                                  onClick={() => updateMilestoneStatus(milestone._id, "completed")}
                                  className="p-1 text-green-600 rounded-md hover:bg-green-50"
                                  title="Mark as Completed"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              {milestone.status !== "in_progress" && milestone.status !== "completed" && (
                                <button
                                  type="button"
                                  onClick={() => updateMilestoneStatus(milestone._id, "in_progress")}
                                  className="p-1 rounded-md text-amber-600 hover:bg-amber-50"
                                  title="Mark as In Progress"
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
              )}
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Payment Schedule</h2>
              <button
                onClick={() => setShowPaymentForm(!showPaymentForm)}
                className="flex items-center px-3 py-1 text-sm bg-white border rounded-md border-accent text-accent hover:bg-accent/10"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Payment
              </button>
            </div>
    <div className="p-6">
              {showPaymentForm && (
                <div className="p-4 mb-6 border rounded-lg bg-gray-50">
                  <h3 className="mb-3 text-sm font-medium">New Payment</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Payment Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newPayment.name}
                        onChange={handlePaymentChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder="e.g. Initial Deposit"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Amount (₹) *
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={newPayment.amount}
                        onChange={handlePaymentChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={newPayment.dueDate}
                        onChange={handlePaymentChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={newPayment.status}
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
                        value={newPayment.notes}
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
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addPayment}
                      className="px-3 py-2 text-sm text-white rounded-md bg-accent hover:bg-accent/90"
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Payment Progress</h3>
                    <div className="text-sm font-semibold text-green-600">
                      {formatCurrency(receivedPayments)} / {formatCurrency(totalPayments)}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${paymentProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <div>{paymentProgress.toFixed(0)}% received</div>
                    <div>{formatCurrency(pendingPayments)} pending</div>
                  </div>
                </div>
              </div>

              {(!project.paymentSchedule || project.paymentSchedule.length === 0) ? (
                <div className="p-8 text-center text-gray-500">
                  No payments have been scheduled yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Payment</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Amount</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {project.paymentSchedule.map((payment) => (
                        <tr key={payment._id} className="hover:bg-gray-50">
                          <td className="px-3 py-4">
                            <div className="font-medium text-gray-900">{payment.name}</div>
                            {payment.notes && (
                              <div className="text-xs text-gray-500">{payment.notes}</div>
                            )}
                          </td>
                          <td className="px-3 py-4 font-medium whitespace-nowrap text-emerald-600">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            {payment.dueDate ? format(new Date(payment.dueDate), "MMM d, yyyy") : "No date"}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${payment.status === "pending" ? "bg-blue-100 text-blue-800" : ""}
                              ${payment.status === "paid" ? "bg-green-100 text-green-800" : ""}
                              ${payment.status === "overdue" ? "bg-red-100 text-red-800" : ""}
                            `}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                            {payment.paidDate && (
                              <div className="text-xs text-gray-500">
                                Paid on {format(new Date(payment.paidDate), "MMM d, yyyy")}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-4 text-sm text-right whitespace-nowrap">
                            <div className="flex justify-end space-x-1">
                              {payment.status !== "paid" && (
                                <button
                                  type="button"
                                  onClick={() => updatePaymentStatus(payment._id, "paid")}
                                  className="p-1 text-green-600 rounded-md hover:bg-green-50"
                                  title="Mark as Paid"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              {payment.status === "paid" && (
                                <button
                                  type="button"
                                  onClick={() => updatePaymentStatus(payment._id, "pending")}
                                  className="p-1 text-blue-600 rounded-md hover:bg-blue-50"
                                  title="Mark as Pending"
                                >
                                  <ArrowRight size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Value */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Project Value</h2>
            </div>
            <div className="p-6">
              {editMode ? (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Project Value (₹)
                  </label>
                  <input
                    type="number"
                    name="projectValue"
                    value={editedData.projectValue}
                    onChange={handleDataChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This is the agreed value with the client.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(project.projectValue)}
                    </span>
                  </div>
                  {project.projectValue > 0 && (
                    <>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-600">Received:</span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(receivedPayments)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-medium text-amber-600">
                          {formatCurrency(project.projectValue - receivedPayments)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Timeline</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium text-gray-900">
                  {project.createdAt ? format(new Date(project.createdAt), "MMM d, yyyy") : "Unknown"}
                </span>
              </div>

              {project.startDate && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date(project.startDate), "MMM d, yyyy")}
                  </span>
                </div>
              )}

              {project.deadline && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date(project.deadline), "MMM d, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Project Stage */}
          {project.status === "accepted" && (
            <div className="overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium">Project Stage</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  {workflowStages.map((stage) => (
                    <button
                      key={stage.value}
                      type="button"
                      onClick={() => updateWorkflowStage(stage.value)}
                      className={`flex items-center justify-center p-2 border rounded-md hover:bg-gray-50 text-sm font-medium ${
                        project.workflowStage === stage.value
                          ? `border-accent bg-accent/10 text-accent`
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Notes</h2>
            </div>
            <div className="p-6">
              {editMode ? (
                <textarea
                  name="notes"
                  value={editedData.notes}
                  onChange={handleDataChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Add notes about this project..."
                ></textarea>
              ) : project.notes ? (
                <div className="text-gray-600 whitespace-pre-wrap">{project.notes}</div>
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