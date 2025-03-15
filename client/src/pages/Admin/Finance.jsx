// client/src/pages/Admin/Finance.jsx
import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import API from "../../api";

const Finance = () => {
  const [financials, setFinancials] = useState({
    totalRevenue: 0,
    receivedPayments: 0,
    pendingPayments: 0,
    revenueByMonth: [],
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        setLoading(true);

        // Fetch real data from API
        const response = await API.get("/finance/admin/overview");

        // Update state with real data
        setFinancials(response.data.financials);
        setRecentPayments(response.data.recentPayments);
        setUpcomingPayments(response.data.upcomingPayments);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching financial data:", err);
        setError("Failed to load financial data. Please try again.");
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate growth percentage (compared to previous month)
  const calculateGrowth = () => {
    if (financials.revenueByMonth && financials.revenueByMonth.length >= 2) {
      const currentMonth =
        financials.revenueByMonth[financials.revenueByMonth.length - 1].revenue;
      const previousMonth =
        financials.revenueByMonth[financials.revenueByMonth.length - 2].revenue;

      if (previousMonth > 0) {
        return Math.round(
          ((currentMonth - previousMonth) / previousMonth) * 100
        );
      }
    }
    return 0;
  };

  const growthPercentage = calculateGrowth();

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Finance Overview</h1>
        <p className="text-gray-600">
          Track your revenue, payments, and financial metrics
        </p>
      </div>

      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(financials.totalRevenue)}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowUpRight className="mr-1 text-green-500" size={16} />
            <span className="font-medium text-green-500">
              +{growthPercentage}%
            </span>
            <span className="ml-1 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Received Payments
              </p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(financials.receivedPayments)}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700">
              {financials.totalRevenue > 0
                ? Math.round(
                    (financials.receivedPayments / financials.totalRevenue) *
                      100
                  )
                : 0}
              %
            </span>
            <span className="ml-1 text-gray-500">of total revenue</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Payments
              </p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(financials.pendingPayments)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <Calendar className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowDownRight className="mr-1 text-amber-500" size={16} />
            <span className="font-medium text-amber-500">
              {financials.totalRevenue > 0
                ? Math.round(
                    (financials.pendingPayments / financials.totalRevenue) * 100
                  )
                : 0}
              %
            </span>
            <span className="ml-1 text-gray-500">pending collection</span>
          </div>
        </div>
      </div>

      {/* Recent and Upcoming Payments */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Payments */}
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Recent Payments</h2>
          </div>
          <div className="overflow-x-auto">
            {recentPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No recent payments found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Client
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {payment.projectName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.paymentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(payment.date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Upcoming Payments</h2>
          </div>
          <div className="overflow-x-auto">
            {upcomingPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No upcoming payments found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Client
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {upcomingPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {payment.projectName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.paymentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-amber-600">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(payment.dueDate)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
