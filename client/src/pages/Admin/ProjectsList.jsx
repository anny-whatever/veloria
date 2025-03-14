// client/src/pages/Admin/ProjectsList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Filter,
  Search,
  ChevronDown,
  X,
  AlertTriangle,
  Building,
  DollarSign,
  Clock,
  Briefcase,
  Trash2,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import API from "../../api";
import StatusFilter from "./components/StatusFilter";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Status options for filter
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "in-progress", label: "In Progress" },
    { value: "quoted", label: "Quoted" },
    { value: "accepted", label: "Accepted" },
    { value: "declined", label: "Declined" },
  ];

  // Service type options for filter
  const serviceTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "blog", label: "Blog" },
    { value: "portfolio", label: "Portfolio" },
    { value: "landing", label: "Landing Page" },
    { value: "custom", label: "Custom" },
  ];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await API.get("/projects/admin");
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Please try again.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects whenever search term, status filter, service filter, or sort changes
  useEffect(() => {
    let result = [...projects];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((project) => project.status === statusFilter);
    }

    // Apply service type filter
    if (serviceFilter !== "all") {
      result = result.filter(
        (project) => project.serviceType === serviceFilter
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.projectName.toLowerCase().includes(lowerSearchTerm) ||
          project.email.toLowerCase().includes(lowerSearchTerm) ||
          project.name.toLowerCase().includes(lowerSearchTerm) ||
          project.companyName.toLowerCase().includes(lowerSearchTerm) ||
          project.industry.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === "budget-high") {
      result.sort((a, b) => {
        // Extract the numeric value from budget ranges
        const getBudgetValue = (budget) => {
          const matches = budget.match(/\d+/g);
          if (!matches) return 0;
          return parseInt(matches[matches.length > 1 ? 1 : 0]);
        };
        return getBudgetValue(b.budget) - getBudgetValue(a.budget);
      });
    }

    setFilteredProjects(result);
  }, [projects, searchTerm, statusFilter, serviceFilter, sortBy]);

  const handleDelete = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await API.delete(`/projects/admin/${projectToDelete._id}`);

      // Remove from state
      setProjects(projects.filter((p) => p._id !== projectToDelete._id));
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    }
  };

  // Function to format service type
  const formatServiceType = (type) => {
    switch (type) {
      case "ecommerce":
        return "E-commerce";
      case "blog":
        return "Blog";
      case "portfolio":
        return "Portfolio";
      case "landing":
        return "Landing Page";
      case "custom":
        return "Custom";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Function to get service type icon
  const getServiceTypeIcon = (type) => {
    switch (type) {
      case "ecommerce":
        return <DollarSign size={16} className="text-green-500" />;
      default:
        return <Briefcase size={16} className="text-blue-500" />;
    }
  };

  // Function to format timeline
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
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">
          <div className="flex items-center">
            <FileText size={24} className="mr-2 text-accent" />
            Project Requests
          </div>
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm("")}
              >
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter size={18} className="mr-2" />
            Filters
            <ChevronDown size={18} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Filters section */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <StatusFilter
              options={statusOptions}
              selected={statusFilter}
              onChange={setStatusFilter}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Service Type
            </label>
            <StatusFilter
              options={serviceTypeOptions}
              selected={serviceFilter}
              onChange={setServiceFilter}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Project name (A to Z)</option>
              <option value="budget-high">Budget (high to low)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setServiceFilter("all");
                setSortBy("newest");
              }}
              className="flex items-center text-accent hover:text-accent-dark"
            >
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredProjects.length} of {projects.length} project requests
      </div>

      {/* Projects list */}
      {filteredProjects.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No project requests found
          </h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all" || serviceFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no project requests yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Project
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Budget & Timeline
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="mb-1 text-sm font-medium text-gray-900">
                          {project.projectName}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          {getServiceTypeIcon(project.serviceType)}
                          <span className="ml-1">
                            {formatServiceType(project.serviceType)}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {formatDistanceToNow(new Date(project.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <Building
                          size={18}
                          className="text-accent mt-0.5 mr-2 flex-shrink-0"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.companyName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.industry}
                          </div>
                          {project.companyWebsite && (
                            <a
                              href={
                                project.companyWebsite.startsWith("http")
                                  ? project.companyWebsite
                                  : `https://${project.companyWebsite}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-accent hover:underline"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <DollarSign
                          size={18}
                          className="text-green-500 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.budget}
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {formatTimeline(project.timeline)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{project.name}</div>
                      <div className="text-xs text-gray-500">
                        {project.email}
                      </div>
                      {project.phone && (
                        <div className="text-xs text-gray-400">
                          {project.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
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
                        }`}
                      >
                        {project.status
                          ? project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)
                          : "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/projects/${project._id}`}
                          className="text-accent hover:text-accent-dark"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(project)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete the project "${projectToDelete?.projectName}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProjectsList;
