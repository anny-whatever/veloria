// client/src/pages/Admin/AdminHome.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  FileText,
  Users,
  Clock,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import API from "../../api";
import StatsCard from "./components/StatsCard";
import RecentSubmissionsList from "./components/RecentSubmissionsList";

const AdminHome = () => {
  const [stats, setStats] = useState({
    bookings: { total: 0, unattended: 0 },
    contacts: { total: 0, unattended: 0 },
    projects: { total: 0, unattended: 0 },
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch Stats
        // In a real application, you would create an endpoint that returns all stats in one request
        // For this example, we'll simulate it with multiple requests
        const [bookingsRes, contactsRes, projectsRes] = await Promise.all([
          API.get("/bookings/admin"),
          API.get("/contact/admin"),
          API.get("/projects/admin"),
        ]);

        // Calculate statistics
        const bookingsStats = {
          total: bookingsRes.data.length,
          unattended: bookingsRes.data.filter((b) => b.status === "scheduled")
            .length,
        };

        const contactsStats = {
          total: contactsRes.data.length,
          unattended: contactsRes.data.filter((c) => c.status === "new").length,
        };

        const projectsStats = {
          total: projectsRes.data.length,
          unattended: projectsRes.data.filter((p) => p.status === "new").length,
        };

        setStats({
          bookings: bookingsStats,
          contacts: contactsStats,
          projects: projectsStats,
        });

        // Get recent submissions (last 5)
        setRecentBookings(bookingsRes.data.slice(0, 5));
        setRecentContacts(contactsRes.data.slice(0, 5));
        setRecentProjects(projectsRes.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error Loading Dashboard</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-red-700 dark:text-red-400 transition-colors bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} className="mr-1" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Bookings"
          count={stats.bookings.total}
          unattendedCount={stats.bookings.unattended}
          icon={
            <Calendar
              className="text-primary dark:text-primary-400"
              size={24}
            />
          }
          linkTo="/admin/bookings"
          color="primary"
        />

        <StatsCard
          title="Contacts"
          count={stats.contacts.total}
          unattendedCount={stats.contacts.unattended}
          icon={
            <MessageCircle
              className="text-secondary dark:text-secondary-400"
              size={24}
            />
          }
          linkTo="/admin/contacts"
          color="secondary"
        />

        <StatsCard
          title="Projects"
          count={stats.projects.total}
          unattendedCount={stats.projects.unattended}
          icon={
            <FileText className="text-accent dark:text-accent-400" size={24} />
          }
          linkTo="/admin/projects"
          color="accent"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Recent Bookings
          </h2>
          {recentBookings.length > 0 ? (
            <RecentSubmissionsList items={recentBookings} type="booking" />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No recent bookings found.
            </p>
          )}
          <Link
            to="/admin/bookings"
            className="flex items-center justify-end mt-4 text-sm font-medium text-primary dark:text-primary-400"
          >
            <span>View all bookings</span>
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Recent Contact Messages
          </h2>
          {recentContacts.length > 0 ? (
            <RecentSubmissionsList items={recentContacts} type="contact" />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No recent contact messages found.
            </p>
          )}
          <Link
            to="/admin/contacts"
            className="flex items-center justify-end mt-4 text-sm font-medium text-secondary dark:text-secondary-400"
          >
            <span>View all messages</span>
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
