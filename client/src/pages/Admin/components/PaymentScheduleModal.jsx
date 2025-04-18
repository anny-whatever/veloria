import { useState, useRef } from "react";
import {
  PlusCircle,
  IndianRupee,
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
    // Prevent default submission behavior and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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
    if (!project) return 0;

    // Use optional chaining and default to empty array
    const schedule = project?.paymentSchedule || [];
    if (schedule.length === 0) {
      return 0;
    }

    return schedule.reduce((total, payment) => {
      return total + (parseFloat(payment.amount) || 0);
    }, 0);
  };

  /**
   * Create payment templates based on project type and value
   */
  const getPaymentTemplates = () => {
    // Return empty array if project is undefined or has no project value
    if (!project || !project.projectValue) return [];

    // Calculate payment amounts
    const totalValue = parseFloat(project.projectValue);
    if (isNaN(totalValue) || totalValue <= 0) return [];

    // Calculate milestone-based payments
    const depositAmount = Math.round(totalValue * 0.5);
    const finalAmount = totalValue - depositAmount;

    const templates = [
      // 50% deposit, 50% on completion
      [
        {
          name: "Initial Deposit",
          amount: depositAmount.toString(),
          dueDate: format(new Date(), "yyyy-MM-dd"),
          status: "pending",
          notes: "50% deposit to commence work",
        },
        {
          name: "Final Payment",
          amount: finalAmount.toString(),
          dueDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "Final payment on project completion",
        },
      ],

      // 3-part payment (40/30/30)
      [
        {
          name: "Initial Deposit",
          amount: Math.round(totalValue * 0.4).toString(),
          dueDate: format(new Date(), "yyyy-MM-dd"),
          status: "pending",
          notes: "40% deposit to commence work",
        },
        {
          name: "Milestone Payment",
          amount: Math.round(totalValue * 0.3).toString(),
          dueDate: format(addDays(new Date(), 14), "yyyy-MM-dd"),
          status: "pending",
          notes: "30% upon completion of initial development",
        },
        {
          name: "Final Payment",
          amount: Math.round(totalValue * 0.3).toString(),
          dueDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "30% upon project completion",
        },
      ],

      // 4-part milestone-based payment
      [
        {
          name: "Initial Deposit",
          amount: Math.round(totalValue * 0.25).toString(),
          dueDate: format(new Date(), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% deposit to commence work",
        },
        {
          name: "Design Approval",
          amount: Math.round(totalValue * 0.25).toString(),
          dueDate: format(addDays(new Date(), 10), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon design approval",
        },
        {
          name: "Development Milestone",
          amount: Math.round(totalValue * 0.25).toString(),
          dueDate: format(addDays(new Date(), 20), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon development completion",
        },
        {
          name: "Final Payment",
          amount: Math.round(totalValue * 0.25).toString(),
          dueDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
          status: "pending",
          notes: "25% upon project completion",
        },
      ],
    ];

    return templates;
  };

  return (
    <div className="space-y-6">
      {/* Add Payment Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold dark:text-zinc-100">
          Payment Schedule
        </h3>
        <button
          type="button"
          onClick={() => setShowPaymentModal(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent dark:focus:ring-offset-zinc-950"
        >
          <PlusCircle size={16} className="mr-2" /> Add Payment
        </button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
          <span className="block text-sm font-medium text-gray-500 dark:text-zinc-400">
            Paid Amount
          </span>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            ₹
            {(
              Number(project ? calculateTotalRevenue() : 0) || 0
            ).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
          <span className="block text-sm font-medium text-gray-500 dark:text-zinc-400">
            Pending Amount
          </span>
          <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
            ₹
            {(
              Number(project ? calculateTotalRevenue() : 0) || 0
            ).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
          <span className="block text-sm font-medium text-gray-500 dark:text-zinc-400">
            Total Revenue
          </span>
          <span className="text-xl font-bold dark:text-zinc-100">
            ₹
            {(
              Number(project ? calculateTotalRevenue() : 0) || 0
            ).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Use optional chaining and default to empty array before checking length */}
      {(project?.paymentSchedule || []).length > 0 ? (
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                  Payment
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-zinc-400">
                  Amount
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
              {/* Use optional chaining and default to empty array before mapping */}
              {(project?.paymentSchedule || []).map((payment, index) => (
                <tr
                  key={payment._id || index}
                  className={`
                    ${
                      payment.status === "paid"
                        ? "bg-green-50 dark:bg-green-900/20"
                        : new Date(payment.dueDate) < new Date() &&
                          payment.status !== "paid"
                        ? "bg-red-50 dark:bg-red-900/20"
                        : "bg-white dark:bg-zinc-900" // Default background
                    }
                     hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-150
                  `}
                >
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {payment.name}
                    </div>
                    {payment.notes && (
                      <div className="text-xs text-gray-500 dark:text-zinc-400">
                        {payment.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      ₹{parseFloat(payment.amount).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        new Date(payment.dueDate) < new Date() &&
                        payment.status !== "paid"
                          ? "text-red-600 dark:text-red-400 font-medium"
                          : "text-gray-900 dark:text-zinc-300"
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
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : ""
                      }
                      ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : ""
                      }
                      ${
                        payment.status === "overdue"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : ""
                      }
                      `}
                    >
                      {payment.status === "pending"
                        ? "Pending"
                        : payment.status === "paid"
                        ? "Paid"
                        : payment.status === "overdue"
                        ? "Overdue"
                        : payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      {!isNewProject && payment.status !== "paid" && (
                        <button
                          type="button"
                          onClick={() =>
                            updateItemStatus(
                              "payment",
                              payment._id,
                              "status",
                              "paid"
                            )
                          }
                          className="p-1 text-green-600 rounded hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
                          title="Mark as Paid"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeletePayment(index)}
                        className="p-1 text-red-600 rounded hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
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
        <div className="p-4 text-center text-gray-500 border border-gray-200 border-dashed rounded-lg dark:text-zinc-400 dark:border-zinc-700">
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
        icon={
          <IndianRupee
            size={20}
            className="text-green-600 dark:text-green-400"
          />
        }
        className="max-h-screen"
      >
        <div className="space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 hover:scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600 dark:hover:scrollbar-thumb-zinc-500 scrollbar-track-transparent">
          <div>
            <label
              htmlFor="paymentName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300"
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
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70 dark:placeholder-zinc-400"
            />
            {paymentError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {paymentError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="paymentAmount"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300"
              >
                Amount (₹)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IndianRupee
                    size={16}
                    className="text-gray-400 dark:text-zinc-500"
                  />
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
                  className="w-full px-3 py-2 pl-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70 dark:placeholder-zinc-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="paymentDueDate"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300"
              >
                Due Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar
                    size={16}
                    className="text-gray-400 dark:text-zinc-500"
                  />
                </div>
                <input
                  id="paymentDueDate"
                  name="dueDate"
                  type="date"
                  value={paymentInput.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pl-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70 dark:placeholder-zinc-400 dark:[color-scheme:dark]" // Ensure date picker controls are dark
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="paymentStatus"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300"
              >
                Status
              </label>
              <select
                id="paymentStatus"
                name="status"
                value={paymentInput.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="paymentNotes"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-zinc-300"
              >
                Notes
              </label>
              <textarea
                id="paymentNotes"
                name="notes"
                rows="1"
                placeholder="Additional notes about this payment..."
                value={paymentInput.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:focus:ring-accent/70 dark:placeholder-zinc-400"
              ></textarea>
            </div>
          </div>

          {/* Payment templates - made more compact */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-zinc-700">
            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-zinc-300">
              Payment Templates:
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(getPaymentTemplates() || [])?.map((template, templateIndex) => (
                <div
                  key={templateIndex}
                  className="p-3 border border-gray-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
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
                      className="text-xs text-accent hover:underline dark:text-accent-lighter"
                    >
                      Select
                    </button>
                  </div>
                  <div className="space-y-1">
                    {template.map((payment, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span
                          className="truncate max-w-[60%] text-gray-600 dark:text-zinc-400"
                          title={payment.name}
                        >
                          {payment.name}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-zinc-200">
                          ₹{parseFloat(payment.amount).toLocaleString()}
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
