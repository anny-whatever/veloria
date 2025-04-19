// client/src/pages/Admin/components/MilestoneModal.jsx
import { useState, useRef } from "react";
import { PlusCircle, Flag, Calendar, X } from "lucide-react";
import InputModal from "./InputModal";
import { format, addDays } from "date-fns";

/**
 * Component for managing project milestones with a modal for adding new milestones
 *
 * @param {Object} project - The project object
 * @param {Function} setProject - Function to update project state
 * @param {Function} updateItemStatus - Function to update milestone status (for existing projects)
 * @param {Boolean} isNewProject - Whether this is a new project
 */
const MilestoneModal = ({
  project,
  setProject,
  updateItemStatus,
  isNewProject,
}) => {
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [milestoneInput, setMilestoneInput] = useState({
    name: "",
    description: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    status: "pending",
  });
  const [milestoneError, setMilestoneError] = useState("");
  const initialFocusRef = useRef(null);

  /**
   * Handle form submission for adding a new milestone
   */
  const handleMilestoneSubmit = (e) => {
    // Prevent default submission behavior if e exists
    if (e) {
      e.preventDefault();
      // Add this to stop event propagation to parent forms
      e.stopPropagation();
    }

    if (!milestoneInput.name || milestoneInput.name.trim() === "") {
      setMilestoneError("Please enter a milestone name");
      return;
    }

    if (!milestoneInput.dueDate) {
      setMilestoneError("Please select a due date");
      return;
    }

    // Add milestone to the project
    const newMilestone = {
      ...milestoneInput,
      _id: isNewProject ? Date.now().toString() : undefined, // Temporary ID for new projects
    };

    // Update project state
    setProject((prev) => ({
      ...prev,
      milestones: [...(prev.milestones || []), newMilestone],
    }));

    // Reset and close modal
    setMilestoneInput({
      name: "",
      description: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      status: "pending",
    });
    setMilestoneError("");
    setShowMilestoneModal(false);
  };

  /**
   * Handle input changes for the milestone form
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMilestoneInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Delete a milestone from the list
   */
  const handleDeleteMilestone = (index) => {
    const updatedMilestones = [...(project.milestones || [])];
    updatedMilestones.splice(index, 1);
    setProject((prev) => ({
      ...prev,
      milestones: updatedMilestones,
    }));
  };

  // Returns milestone templates based on service type
  const getMilestoneTemplates = () => {
    if (project?.serviceType === "Branding") {
      return brandingMilestoneTemplates;
    } else if (project?.serviceType === "Website") {
      return websiteMilestoneTemplates;
    } else {
      return [];
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700 dark:text-zinc-300">
          Project Milestones
        </h3>
        <button
          type="button" // Explicitly set to button
          onClick={() => setShowMilestoneModal(true)}
          className="flex items-center px-3 py-1 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10 dark:bg-zinc-800 dark:border-accent/70 dark:hover:bg-accent/20"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Milestone
        </button>
      </div>

      {(project?.milestones || []).length > 0 ? (
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                  Milestone
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
              {(project?.milestones || []).map((milestone, index) => (
                <tr
                  key={milestone._id || index}
                  className={
                    milestone.status === "completed"
                      ? "bg-green-50 dark:bg-green-900/20"
                      : new Date(milestone.dueDate) < new Date() &&
                        milestone.status !== "completed"
                      ? "bg-red-50 dark:bg-red-900/20"
                      : "dark:bg-zinc-900"
                  }
                >
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {milestone.name}
                    </div>
                    {milestone.description && (
                      <div className="text-xs text-gray-500 dark:text-zinc-400">
                        {milestone.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        new Date(milestone.dueDate) < new Date() &&
                        milestone.status !== "completed"
                          ? "text-red-600 dark:text-red-400 font-medium"
                          : "text-gray-900 dark:text-zinc-300"
                      }`}
                    >
                      {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${
                        milestone.status === "pending"
                          ? "bg-blue-100 text-blue-800 dark:bg-zinc-800 dark:text-zinc-300"
                          : ""
                      }
                      ${
                        milestone.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : ""
                      }
                      ${
                        milestone.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                      ${
                        milestone.status === "overdue"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : ""
                      }
                    `}
                    >
                      {milestone.status === "in_progress"
                        ? "In Progress"
                        : milestone.status.charAt(0).toUpperCase() +
                          milestone.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-1">
                      {!isNewProject && milestone.status !== "completed" && (
                        <button
                          type="button"
                          onClick={() =>
                            updateItemStatus(
                              "milestone",
                              milestone._id,
                              "completed"
                            )
                          }
                          className="p-1 text-green-600 rounded hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                          title="Mark as Completed"
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
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteMilestone(index)}
                        className="p-1 text-red-600 rounded hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        aria-label="Delete milestone"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 border border-gray-200 border-dashed rounded-lg">
          No milestones added yet
        </div>
      )}

      {/* Milestone Input Modal */}
      <InputModal
        isOpen={showMilestoneModal}
        onClose={() => {
          setShowMilestoneModal(false);
          setMilestoneError("");
          setMilestoneInput({
            name: "",
            description: "",
            dueDate: format(new Date(), "yyyy-MM-dd"),
            status: "pending",
          });
        }}
        onSubmit={handleMilestoneSubmit}
        title="Add Project Milestone"
        submitText="Add Milestone"
        icon={<Flag size={20} className="text-accent" />}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="milestoneName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Milestone Name*
            </label>
            <input
              id="milestoneName"
              name="name"
              ref={initialFocusRef}
              type="text"
              placeholder="e.g., Design Approval, Project Launch"
              value={milestoneInput.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {milestoneError && (
              <p className="mt-1 text-sm text-red-600">{milestoneError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="milestoneDueDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Due Date*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                id="milestoneDueDate"
                name="dueDate"
                type="date"
                value={milestoneInput.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="milestoneDescription"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="milestoneDescription"
              name="description"
              rows="3"
              placeholder="Describe what this milestone involves..."
              value={milestoneInput.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="milestoneStatus"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="milestoneStatus"
              name="status"
              value={milestoneInput.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Common milestone templates */}
          <div className="pt-4 mt-2 border-t border-gray-200">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Quick Add Templates:
            </p>
            <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-48">
              {getMilestoneTemplates()?.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMilestoneInput(template)}
                  className="p-2 text-xs text-left text-gray-700 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="mt-1 text-gray-500">
                    {format(new Date(template.dueDate), "MMM d, yyyy")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default MilestoneModal;
