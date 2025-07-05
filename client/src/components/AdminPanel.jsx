import { useState, useEffect } from "react";
import { getAdminSubmissions } from "../api";
import {
  RefreshCw,
  Eye,
  Calendar,
  Mail,
  Phone,
  User,
  MessageSquare,
  Building,
} from "lucide-react";

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminSubmissions();
      setSubmissions(data.submissions || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case "contact":
        return <Mail size={16} className="text-blue-400" />;
      case "get-started":
        return <User size={16} className="text-green-400" />;
      case "book-call":
        return <Phone size={16} className="text-purple-400" />;
      default:
        return <MessageSquare size={16} className="text-gray-400" />;
    }
  };

  const getSubmissionTypeName = (type) => {
    switch (type) {
      case "contact":
        return "Contact Form";
      case "get-started":
        return "Get Started";
      case "book-call":
        return "Book Call";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderSubmissionDetails = (submission) => {
    const commonFields = ["name", "email", "phone", "message"];
    const details = [];

    Object.entries(submission).forEach(([key, value]) => {
      if (key !== "id" && key !== "type" && key !== "created_at" && value) {
        details.push({ key, value });
      }
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          {getSubmissionTypeIcon(submission.type)}
          <h3 className="text-lg font-light text-white">
            {getSubmissionTypeName(submission.type)} Submission
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.map(({ key, value }) => (
            <div key={key} className="space-y-1">
              <label className="text-sm text-gray-400 capitalize">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <div className="text-gray-300">
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {value.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === "object" ? (
                  <pre className="text-sm bg-gray-800 p-2 rounded overflow-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={16} />
            <span>Submitted: {formatDate(submission.created_at)}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-lg">
        <div className="flex items-center justify-center gap-3">
          <RefreshCw size={20} className="animate-spin text-gray-400" />
          <span className="text-gray-400">Loading submissions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-900/20 border border-red-800/50 rounded-lg">
        <div className="text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchSubmissions}
            className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-white">Admin Panel</h2>
        <button
          onClick={fetchSubmissions}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
          <p className="text-gray-400">No submissions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-white">
              Recent Submissions
            </h3>
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedSubmission?.id === submission.id
                      ? "border-gray-600 bg-gray-800"
                      : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {getSubmissionTypeIcon(submission.type)}
                    <span className="text-white font-light">
                      {getSubmissionTypeName(submission.type)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-300">
                        {submission.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-300">
                        {submission.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-400">
                        {formatDate(submission.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Details */}
          <div className="lg:sticky lg:top-6">
            {selectedSubmission ? (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                {renderSubmissionDetails(selectedSubmission)}
              </div>
            ) : (
              <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
                <Eye size={32} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Select a submission to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
