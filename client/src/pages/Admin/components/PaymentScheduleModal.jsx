// client/src/pages/Admin/components/PaymentScheduleModal.jsx
import { useState, useRef } from "react";
import {
  PlusCircle,
  DollarSign,
  Calendar,
  Check,
  X,
  Clock,
} from "lucide-react";
import InputModal from "./InputModal";
import { format, addDays, addMonths } from "date-fns";

/**
 * Component for managing project payment schedule with a modal for adding new payments
 *
 * @param {Object} project - The project object
 * @param {Function} setProject - Function to update project state
 * @param {Function} updateItemStatus - Function to update payment status (for existing projects)
 * @param {Boolean} isNewProject - Whether this is a new project
 */
const PaymentScheduleModal = ({
  project,
  setProject,
  updateItemStatus,
  isNewProject,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInput, setPaymentInput] = useState({
    name: "",
    amount: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    status: "pending",
    notes: "",
  });
  const [paymentError, setPaymentError] = useState("");
  const initialFocusRef = useRef(null);

  /**
   * Handle form submission for adding a new payment
   */
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentInput.name || paymentInput.name.trim() === "") {
      setPaymentError("Please enter a payment name");
      return;
    }

    if (
      !paymentInput.amount ||
      isNaN(parseFloat(paymentInput.amount)) ||
      parseFloat(paymentInput.amount) <= 0
    ) {
      setPaymentError("Please enter a valid payment amount");
      return;
    }

    if (!paymentInput.dueDate) {
      setPaymentError("Please select a due date");
      return;
    }

    // Add payment to the project
    const newPayment = {
      ...paymentInput,
      amount: parseFloat(paymentInput.amount),
      _id: isNewProject ? Date.now().toString() : undefined, // Temporary ID for new projects
    };

    // Update project state
    setProject((prev) => ({
      ...prev,
      paymentSchedule: [...(prev.paymentSchedule || []), newPayment],
      // If this is a new project, also update the project value
      projectValue: prev.projectValue
        ? prev.projectValue + parseFloat(paymentInput.amount)
        : parseFloat(paymentInput.amount),
    }));

    // Reset and close modal
    setPaymentInput({
      name: "",
      amount: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      status: "pending",
      notes: "",
    });
    setPaymentError("");
    setShowPaymentModal(false);
  };

  /**
   * Handle input changes for the payment form
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Delete a payment from the schedule
   */
  const handleDeletePayment = (index) => {
    const updatedPayments = [...(project.paymentSchedule || [])];
    // If updating project value, subtract this payment's amount
    const deletedAmount = parseFloat(updatedPayments[index].amount) || 0;

    updatedPayments.splice(index, 1);

    setProject((prev) => ({
      ...prev,
      paymentSchedule: updatedPayments,
      // Adjust project value
      projectValue: Math.max(0, (prev.projectValue || 0) - deletedAmount),
    }));
  };

  /**
   * Calculate total revenue from all payments
   */
  const calculateTotalRevenue = () => {
    if (!project.paymentSchedule || project.paymentSchedule.length === 0) {
      return 0;
    }

    return project.paymentSchedule.reduce((total, payment) => {
      return total + (parseFloat(payment.amount) || 0);
    }, 0);
  };

  /**
   * Create payment templates based on project type and value
   */
  const getPaymentTemplates = () => {
    const projectValue =
      project.projectValue || calculateTotalRevenue() || 5000;
    const today = new Date();

    // Calculate milestone-based payments
    const depositAmount = Math.round(projectValue * 0.5);
    const finalAmount = projectValue - depositAmount;

    const templates = [
      // 50% deposit, 50% on completion
      [
        {
          name: "Initial Deposit",
          amount: depositAmount.toString(),
          dueDate: format(today, "yyyy-MM-dd"),
          status: "pending",
          notes: "50% deposit to commence work",
        },
        {
          name: "Final Payment",
          amount: finalAmount.toString(),
          dueDate: format(addMonths(today, 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "Final payment on project completion",
        },
      ],

      // 3-part payment (40/30/30)
      [
        {
          name: "Initial Deposit",
          amount: Math.round(projectValue * 0.4).toString(),
          dueDate: format(today, "yyyy-MM-dd"),
          status: "pending",
          notes: "40% deposit to commence work",
        },
        {
          name: "Milestone Payment",
          amount: Math.round(projectValue * 0.3).toString(),
          dueDate: format(addDays(today, 14), "yyyy-MM-dd"),
          status: "pending",
          notes: "30% upon completion of initial development",
        },
        {
          name: "Final Payment",
          amount: Math.round(projectValue * 0.3).toString(),
          dueDate: format(addMonths(today, 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "30% upon project completion",
        },
      ],

      // 4-part milestone-based payment
      [
        {
          name: "Initial Deposit",
          amount: Math.round(projectValue * 0.25).toString(),
          dueDate: format(today, "yyyy-MM-dd"),
          status: "pending",
          notes: "25% deposit to commence work",
        },
        {
          name: "Design Approval",
          amount: Math.round(projectValue * 0.25).toString(),
          dueDate: format(addDays(today, 10), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon design approval",
        },
        {
          name: "Development Milestone",
          amount: Math.round(projectValue * 0.25).toString(),
          dueDate: format(addDays(today, 20), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon development completion",
        },
        {
          name: "Final Payment",
          amount: Math.round(projectValue * 0.25).toString(),
          dueDate: format(addMonths(today, 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon project completion",
        },
      ],
    ];

    // For e-commerce projects, add a monthly maintenance option
    // if (project.serviceType === "ecommerce") {
    //   templates.push([
    //     {
    //       name: "Monthly Maintenance",
    //       amount: "500",
    //       dueDate: format(addMonths(today, 1), "yyyy-MM-dd"),
    //       status: "pending",
    //       notes: "Monthly fee for maintenance and updates",
    //     },
    //   ]);
    // }

    return templates;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700">Payment Schedule</h3>
        <button
          type="button"
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center px-3 py-1 text-sm bg-white border rounded-md text-accent border-accent hover:bg-accent/10"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Payment
        </button>
      </div>

      {/* Total value display */}
      <div className="p-4 mb-4 border border-gray-200 rounded-md bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Total Project Value:
          </span>
          <span className="text-xl font-bold">
            $
            {project.projectValue?.toLocaleString() ||
              calculateTotalRevenue().toLocaleString()}
          </span>
        </div>
      </div>

      {project.paymentSchedule && project.paymentSchedule.length > 0 ? (
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
                <tr
                  key={payment._id || index}
                  className={
                    payment.status === "paid"
                      ? "bg-green-50"
                      : new Date(payment.dueDate) < new Date() &&
                        payment.status !== "paid"
                      ? "bg-red-50"
                      : ""
                  }
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.name}
                    </div>
                    {payment.notes && (
                      <div className="text-xs text-gray-500">
                        {payment.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      ${parseFloat(payment.amount).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        new Date(payment.dueDate) < new Date() &&
                        payment.status !== "paid"
                          ? "text-red-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {format(new Date(payment.dueDate), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${
                        payment.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        payment.status === "overdue"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-1">
                      {!isNewProject && (
                        <>
                          {payment.status !== "paid" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateItemStatus("payment", payment._id, "paid")
                              }
                              className="p-1 text-green-600 rounded hover:bg-green-50"
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
                              className="p-1 text-blue-600 rounded hover:bg-blue-50"
                              title="Mark as Pending"
                            >
                              <Clock size={16} />
                            </button>
                          )}
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeletePayment(index)}
                        className="p-1 text-red-600 rounded hover:bg-red-50"
                        aria-label="Delete payment"
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
          No payments scheduled yet
        </div>
      )}

      {/* Payment Input Modal */}
      <InputModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setPaymentError("");
          setPaymentInput({
            name: "",
            amount: "",
            dueDate: format(new Date(), "yyyy-MM-dd"),
            status: "pending",
            notes: "",
          });
        }}
        onSubmit={handlePaymentSubmit}
        title="Add Payment"
        submitText="Add Payment"
        icon={<DollarSign size={20} className="text-green-600" />}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="paymentName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Payment Name*
            </label>
            <input
              id="paymentName"
              name="name"
              ref={initialFocusRef}
              type="text"
              placeholder="e.g., Initial Deposit, Final Payment"
              value={paymentInput.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {paymentError && (
              <p className="mt-1 text-sm text-red-600">{paymentError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="paymentAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Amount ($)*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign size={16} className="text-gray-400" />
              </div>
              <input
                id="paymentAmount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={paymentInput.amount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="paymentDueDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Due Date*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                id="paymentDueDate"
                name="dueDate"
                type="date"
                value={paymentInput.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="paymentStatus"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="paymentStatus"
              name="status"
              value={paymentInput.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="paymentNotes"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="paymentNotes"
              name="notes"
              rows="2"
              placeholder="Additional notes about this payment..."
              value={paymentInput.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
            ></textarea>
          </div>

          {/* Payment templates */}
          <div className="pt-4 mt-2 border-t border-gray-200">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Payment Templates:
            </p>
            <div className="space-y-2">
              {getPaymentTemplates().map((template, templateIndex) => (
                <div
                  key={templateIndex}
                  className="p-2 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">
                      {template.length}-Part Payment
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        // Create all payments in the template
                        template.forEach((payment, i) => {
                          if (i === 0) {
                            setPaymentInput(payment);
                          } else {
                            // For subsequent payments, we'd need to handle differently
                            // Currently just selecting the first one for the form
                          }
                        });
                      }}
                      className="text-xs text-accent hover:underline"
                    >
                      Select
                    </button>
                  </div>
                  <div className="space-y-1">
                    {template.map((payment, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span>{payment.name}</span>
                        <span className="font-medium">
                          ${parseFloat(payment.amount).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default PaymentScheduleModal;
