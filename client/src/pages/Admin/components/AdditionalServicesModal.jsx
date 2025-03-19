// client/src/pages/Admin/components/AdditionalServicesModal.jsx
import { useState, useRef } from "react";
import { PlusCircle, Package, Trash2 } from "lucide-react";
import InputModal from "./InputModal";

/**
 * Component for managing additional project services with a modal for adding services
 *
 * @param {Object} project - The project object
 * @param {Function} setProject - Function to update project state
 */
const AdditionalServicesModal = ({ project, setProject }) => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceInput, setServiceInput] = useState({
    name: "",
    provider: "",
    cost: 0,
    status: "pending",
  });
  const [serviceError, setServiceError] = useState("");
  const initialFocusRef = useRef(null);

  /**
   * Handle form submission for adding a new service
   */
  const handleServiceSubmit = (e) => {
    // Prevent form submission and event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!serviceInput.name || serviceInput.name.trim() === "") {
      setServiceError("Please enter a service name");
      return;
    }

    // Add service to the project
    const updatedServices = [
      ...(project.additionalServices || []),
      serviceInput,
    ];

    setProject((prev) => ({
      ...prev,
      additionalServices: updatedServices,
    }));

    // Reset and close modal
    setServiceInput({
      name: "",
      provider: "",
      cost: 0,
      status: "pending",
    });
    setServiceError("");
    setShowServiceModal(false);
  };

  /**
   * Handle input changes for the service form
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceInput((prev) => ({
      ...prev,
      [name]: name === "cost" ? parseFloat(value) || 0 : value,
    }));
  };

  /**
   * Delete a service from the list
   */
  const handleDeleteService = (index) => {
    const updatedServices = [...(project.additionalServices || [])];
    updatedServices.splice(index, 1);
    setProject((prev) => ({
      ...prev,
      additionalServices: updatedServices,
    }));
  };

  // Common services that might be offered
  const serviceTemplates = [
    { name: "SEO Optimization", provider: "", cost: 0, status: "pending" },
    { name: "Content Writing", provider: "", cost: 0, status: "pending" },
    { name: "Website Maintenance", provider: "", cost: 0, status: "pending" },
    { name: "Analytics Setup", provider: "Google", cost: 0, status: "pending" },
    { name: "Email Marketing", provider: "", cost: 0, status: "pending" },
    {
      name: "Social Media Integration",
      provider: "",
      cost: 0,
      status: "pending",
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700">Additional Services</h3>
        <button
          type="button" // Explicitly set type to prevent form submission
          onClick={() => setShowServiceModal(true)}
          className="flex items-center px-3 py-1 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Service
        </button>
      </div>

      {project.additionalServices && project.additionalServices.length > 0 ? (
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
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {project.additionalServices.map((service, index) => (
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
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${
                        service.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        service.status === "active"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        service.status === "inactive"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                      ${
                        service.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleDeleteService(index)}
                      className="p-1 text-red-600 rounded hover:bg-red-50"
                      aria-label="Delete service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 border border-gray-200 border-dashed rounded-lg">
          No additional services added yet
        </div>
      )}

      {/* Service Input Modal */}
      <InputModal
        isOpen={showServiceModal}
        onClose={() => {
          setShowServiceModal(false);
          setServiceError("");
          setServiceInput({
            name: "",
            provider: "",
            cost: 0,
            status: "pending",
          });
        }}
        onSubmit={handleServiceSubmit}
        title="Add Additional Service"
        submitText="Add Service"
        icon={<Package size={20} className="text-accent" />}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="serviceName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Service Name*
            </label>
            <input
              id="serviceName"
              name="name"
              ref={initialFocusRef}
              type="text"
              placeholder="e.g., SEO, Maintenance, Analytics"
              value={serviceInput.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {serviceError && (
              <p className="mt-1 text-sm text-red-600">{serviceError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="serviceProvider"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Provider
            </label>
            <input
              id="serviceProvider"
              name="provider"
              type="text"
              placeholder="e.g., Google, Cloudflare"
              value={serviceInput.provider}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label
              htmlFor="serviceCost"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Cost ($)
            </label>
            <input
              id="serviceCost"
              name="cost"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={serviceInput.cost}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label
              htmlFor="serviceStatus"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="serviceStatus"
              name="status"
              value={serviceInput.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Common services templates */}
          <div className="pt-4 mt-2 border-t border-gray-200">
            <p className="mb-2 text-sm font-medium text-gray-700">Quick Add:</p>
            <div className="grid grid-cols-2 gap-2">
              {serviceTemplates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setServiceInput(template)}
                  className="p-2 text-xs text-left text-gray-700 border border-gray-200 rounded hover:bg-gray-50"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default AdditionalServicesModal;
