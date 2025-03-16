// client/src/pages/Admin/ProjectPipeline.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  DollarSign,
  Calendar,
  Filter,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Clock,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import API from "../../api";
import StatusFilter from "./components/StatusFilter";

const ProjectPipeline = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [stats, setStats] = useState({
    byStatus: {},
    byStage: {},
    finance: {
      totalProjectValue: 0,
      totalReceivedPayments: 0,
      outstandingPayments: 0,
      avgProjectValue: 0,
    },
  });

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

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await API.get("/projects/admin");

        // Sort projects by status and date
        const sortedProjects = response.data.sort((a, b) => {
          // Sort by status first
          const statusOrder = {
            new: 1,
            contacted: 2,
            "in-progress": 3,
            quoted: 4,
            accepted: 5,
            declined: 6,
          };

          const statusDiff = statusOrder[a.status] - statusOrder[b.status];
          if (statusDiff !== 0) return statusDiff;

          // Then by date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);

        // Calculate basic stats from the loaded projects if the API stats endpoint fails
        let basicStats = {
          byStatus: {},
          byStage: {},
          finance: {
            totalProjectValue: 0,
            totalReceivedPayments: 0,
            outstandingPayments: 0,
            avgProjectValue: 0,
          },
        };

        // Generate status counts
        sortedProjects.forEach((project) => {
          if (!basicStats.byStatus[project.status]) {
            basicStats.byStatus[project.status] = 0;
          }
          basicStats.byStatus[project.status]++;

          // Count stages for accepted projects
          if (project.status === "accepted" && project.workflowStage) {
            if (!basicStats.byStage[project.workflowStage]) {
              basicStats.byStage[project.workflowStage] = 0;
            }
            basicStats.byStage[project.workflowStage]++;
          }

          // Sum financial data
          if (project.projectValue) {
            basicStats.finance.totalProjectValue += project.projectValue;
          }
          if (project.receivedPayments) {
            basicStats.finance.totalReceivedPayments +=
              project.receivedPayments;
          }
        });

        // Calculate remaining financial stats
        basicStats.finance.outstandingPayments =
          basicStats.finance.totalProjectValue -
          basicStats.finance.totalReceivedPayments;

        basicStats.finance.avgProjectValue =
          sortedProjects.length > 0
            ? basicStats.finance.totalProjectValue / sortedProjects.length
            : 0;

        // Try to fetch stats from API, use calculated stats as fallback
        try {
          const statsResponse = await API.get("/projects/admin/stats");
          setStats(statsResponse.data);
        } catch (statsError) {
          console.warn("Using calculated stats due to API error:", statsError);
          setStats(basicStats);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Please try again.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects whenever search term or status filter changes
  useEffect(() => {
    let result = [...projects];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((project) => project.status === statusFilter);
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.projectName?.toLowerCase().includes(lowerSearchTerm) ||
          project.companyName?.toLowerCase().includes(lowerSearchTerm) ||
          project.name?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredProjects(result);
  }, [projects, searchTerm, statusFilter]);

  // Group projects by status
  const groupedProjects = filteredProjects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = [];
    }
    acc[project.status].push(project);
    return acc;
  }, {});

  // Toggle group expansion
  const toggleGroup = (status) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Format project status for display
  const formatStatus = (status) => {
    switch (status) {
      case "new":
        return { label: "New", color: "bg-blue-100 text-blue-800" };
      case "contacted":
        return { label: "Contacted", color: "bg-purple-100 text-purple-800" };
      case "in-progress":
        return { label: "In Progress", color: "bg-amber-100 text-amber-800" };
      case "quoted":
        return { label: "Quoted", color: "bg-cyan-100 text-cyan-800" };
      case "accepted":
        return { label: "Accepted", color: "bg-green-100 text-green-800" };
      case "declined":
        return { label: "Declined", color: "bg-red-100 text-red-800" };
      default:
        return { label: status, color: "bg-gray-100 text-gray-800" };
    }
  };

  // Format workflow stage for display
  const formatWorkflowStage = (stage) => {
    if (!stage)
      return { label: "Not Started", color: "bg-gray-100 text-gray-800" };

    switch (stage) {
      case "discussion":
        return { label: "Discussion", color: "bg-blue-100 text-blue-800" };
      case "design":
        return { label: "Design", color: "bg-purple-100 text-purple-800" };
      case "content_collection":
        return {
          label: "Content Collection",
          color: "bg-amber-100 text-amber-800",
        };
      case "development":
        return { label: "Development", color: "bg-cyan-100 text-cyan-800" };
      case "revisions":
        return { label: "Revisions", color: "bg-pink-100 text-pink-800" };
      case "deployment":
        return { label: "Deployment", color: "bg-indigo-100 text-indigo-800" };
      case "knowledge_sharing":
        return {
          label: "Knowledge Sharing",
          color: "bg-teal-100 text-teal-800",
        };
      case "completed":
        return { label: "Completed", color: "bg-green-100 text-green-800" };
      default:
        return { label: stage, color: "bg-gray-100 text-gray-800" };
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
            <ClipboardList size={24} className="mr-2 text-accent" />
            Project Pipeline
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

          <Link
            to="/admin/projects/new"
            className="flex items-center px-4 py-2 text-white rounded-md bg-accent hover:bg-accent/90"
          >
            <PlusCircle size={18} className="mr-2" />
            New Project
          </Link>
        </div>
      </div>

      {/* Filters section */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-2">
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

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="flex items-center text-accent hover:text-accent-dark"
            >
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Total Projects
            </h3>
            <ClipboardList size={18} className="text-accent" />
          </div>
          <p className="text-2xl font-bold">
            {Object.values(stats.byStatus).reduce(
              (sum, count) => sum + count,
              0
            ) || filteredProjects.length}
          </p>
          <div className="flex items-center mt-2 text-xs">
            <span className="px-2 py-1 mr-2 rounded-full bg-accent/10 text-accent">
              {stats.byStatus.accepted || 0} Active
            </span>
            <span className="px-2 py-1 text-green-800 bg-green-100 rounded-full">
              {stats.byStatus.completed || 0} Completed
            </span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Pipeline Value
            </h3>
            <DollarSign size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold">
            ₹{stats.finance.totalProjectValue.toLocaleString()}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            ₹{stats.finance.avgProjectValue.toLocaleString()} avg. per project
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Received Payments
            </h3>
            <DollarSign size={18} className="text-accent" />
          </div>
          <p className="text-2xl font-bold">
            ₹{stats.finance.totalReceivedPayments.toLocaleString()}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            ₹{stats.finance.outstandingPayments.toLocaleString()} outstanding
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Active by Stage
            </h3>
            <Tag size={18} className="text-secondary" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(stats.byStage).map(([stage, count]) => (
              <div key={stage} className="flex items-center text-xs">
                <span
                  className={`w-2 h-2 mr-1 rounded-full ${formatWorkflowStage(
                    stage
                  ).color.replace("text-", "bg-")}`}
                ></span>
                <span className="mr-1">
                  {formatWorkflowStage(stage).label}:
                </span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Pipeline Kanban-style View */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        {Object.keys(groupedProjects).length === 0 ? (
          <div className="p-8 text-center">
            <ClipboardList size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No projects found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You don't have any projects yet"}
            </p>
          </div>
        ) : (
          <div>
            {Object.keys(groupedProjects).map((status) => {
              const { label, color } = formatStatus(status);
              const isExpanded = expandedGroups[status] !== false; // Default to expanded

              return (
                <div key={status} className="border-b last:border-b-0">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleGroup(status)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 mr-3 text-xs font-medium rounded-full ${color}`}
                      >
                        {label}
                      </span>
                      <span className="font-medium">
                        {groupedProjects[status].length} Projects
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={18} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="border-t">
                      {groupedProjects[status].map((project) => (
                        <Link
                          key={project._id}
                          to={`/admin/projects/${project._id}`}
                          className="block p-4 transition-colors border-b hover:bg-gray-50 last:border-b-0"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-primary">
                                {project.projectName}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {project.companyName}
                              </p>

                              <div className="flex mt-2 text-xs text-gray-500">
                                <div className="flex items-center mr-4">
                                  <Calendar size={14} className="mr-1" />
                                  {project.createdAt &&
                                    format(
                                      new Date(project.createdAt),
                                      "MMM d, yyyy"
                                    )}
                                </div>

                                {project.workflowStage && (
                                  <div className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    {
                                      formatWorkflowStage(project.workflowStage)
                                        .label
                                    }
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              {project.projectValue > 0 && (
                                <div className="text-sm font-medium text-right text-green-600">
                                  ₹{project.projectValue.toLocaleString()}
                                </div>
                              )}

                              <div className="mt-1 text-xs text-right text-gray-500">
                                {project.deadline &&
                                  `Due: ${format(
                                    new Date(project.deadline),
                                    "MMM d, yyyy"
                                  )}`}
                              </div>
                            </div>
                          </div>

                          {/* Only show this for accepted projects */}
                          {status === "accepted" &&
                            project.milestones &&
                            project.milestones.length > 0 && (
                              <div className="mt-3">
                                <div className="text-xs font-medium text-gray-500">
                                  Next milestone:
                                </div>
                                {project.milestones
                                  .filter((m) => m.status !== "completed")
                                  .slice(0, 1)
                                  .map((milestone) => (
                                    <div
                                      key={milestone._id}
                                      className="flex items-center justify-between mt-1 text-xs"
                                    >
                                      <span>{milestone.name}</span>
                                      {milestone.dueDate && (
                                        <span className="text-accent">
                                          {format(
                                            new Date(milestone.dueDate),
                                            "MMM d, yyyy"
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPipeline;
