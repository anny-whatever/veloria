// client/src/pages/Admin/Finance.jsx
import { useState, useEffect } from "react";
import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import API from "../../api";
import { useTheme } from "../../contexts/ThemeContext";

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
  const { isDarkMode } = useTheme();

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
        <div className="w-12 h-12 border-4 border-zinc-300 rounded-full border-t-primary-500 animate-spin dark:border-zinc-700 dark:border-t-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-zinc-900 dark:border-red-800 dark:text-red-400">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Finance Overview
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Track your revenue, payments, and financial metrics
        </p>
      </div>

      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(financials.totalRevenue)}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/30">
              <IndianRupee
                className="text-green-600 dark:text-green-400"
                size={24}
              />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowUpRight
              className="mr-1 text-green-500 dark:text-green-400"
              size={16}
            />
            <span className="font-medium text-green-500 dark:text-green-400">
              +{growthPercentage}%
            </span>
            <span className="ml-1 text-zinc-500 dark:text-zinc-400">
              from last month
            </span>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Received Payments
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(financials.receivedPayments)}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <TrendingUp
                className="text-blue-600 dark:text-blue-400"
                size={24}
              />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {financials.totalRevenue > 0
                ? Math.round(
                    (financials.receivedPayments / financials.totalRevenue) *
                      100
                  )
                : 0}
              %
            </span>
            <span className="ml-1 text-zinc-500 dark:text-zinc-400">
              of total revenue
            </span>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Pending Payments
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(financials.pendingPayments)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Calendar
                className="text-amber-600 dark:text-amber-400"
                size={24}
              />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <ArrowDownRight
              className="mr-1 text-amber-500 dark:text-amber-400"
              size={16}
            />
            <span className="font-medium text-amber-500 dark:text-amber-400">
              {financials.totalRevenue > 0
                ? Math.round(
                    (financials.pendingPayments / financials.totalRevenue) * 100
                  )
                : 0}
              %
            </span>
            <span className="ml-1 text-zinc-500 dark:text-zinc-400">
              pending collection
            </span>
          </div>
        </div>
      </div>

      {/* Recent and Upcoming Payments */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Payments */}
        <div className="overflow-hidden rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Recent Payments
            </h2>
          </div>
          <div className="overflow-x-auto">
            {recentPayments.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 dark:text-zinc-400">
                No recent payments found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-zinc-100 dark:bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Project
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Client
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {recentPayments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900 whitespace-nowrap dark:text-zinc-100">
                        {payment.projectTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap dark:text-zinc-400">
                        {payment.clientName}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 whitespace-nowrap dark:text-green-400">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap dark:text-zinc-400">
                        {formatDate(payment.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="overflow-hidden rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Upcoming Payments
            </h2>
          </div>
          <div className="overflow-x-auto">
            {upcomingPayments.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 dark:text-zinc-400">
                No upcoming payments found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-zinc-100 dark:bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Project
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Client
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Amount Due
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-zinc-500 uppercase dark:text-zinc-400">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {upcomingPayments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900 whitespace-nowrap dark:text-zinc-100">
                        {payment.projectTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap dark:text-zinc-400">
                        {payment.clientName}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-amber-600 whitespace-nowrap dark:text-amber-400">
                        {formatCurrency(payment.amountDue)}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap dark:text-zinc-400">
                        {formatDate(payment.dueDate)}
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
