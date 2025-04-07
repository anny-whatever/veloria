// client/src/pages/Admin/components/RecentSubmissionsList.jsx
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Calendar, MessageCircle, FileText, Clock } from "lucide-react";

const RecentSubmissionsList = ({ data = [], type, emptyMessage }) => {
  if (!data || data.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        {emptyMessage || "No data available"}
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case "booking":
        return (
          <Calendar size={18} className="text-primary dark:text-primary-400" />
        );
      case "contact":
        return (
          <MessageCircle
            size={18}
            className="text-secondary dark:text-secondary-400"
          />
        );
      case "project":
        return (
          <FileText size={18} className="text-accent dark:text-accent-400" />
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (item, type) => {
    let status, bgColor, textColor, darkBgColor, darkTextColor;

    if (type === "booking") {
      status = item.status || "scheduled";

      switch (status) {
        case "scheduled":
          bgColor = "bg-blue-100";
          textColor = "text-blue-800";
          darkBgColor = "dark:bg-blue-900/30";
          darkTextColor = "dark:text-blue-300";
          break;
        case "completed":
          bgColor = "bg-green-100";
          textColor = "text-green-800";
          darkBgColor = "dark:bg-green-900/30";
          darkTextColor = "dark:text-green-300";
          break;
        case "cancelled":
          bgColor = "bg-red-100";
          textColor = "text-red-800";
          darkBgColor = "dark:bg-red-900/30";
          darkTextColor = "dark:text-red-300";
          break;
        case "rescheduled":
          bgColor = "bg-amber-100";
          textColor = "text-amber-800";
          darkBgColor = "dark:bg-amber-900/30";
          darkTextColor = "dark:text-amber-300";
          break;
        default:
          bgColor = "bg-gray-100";
          textColor = "text-gray-800";
          darkBgColor = "dark:bg-gray-700";
          darkTextColor = "dark:text-gray-300";
      }
    } else if (type === "contact") {
      status = item.status || "new";

      switch (status) {
        case "new":
          bgColor = "bg-blue-100";
          textColor = "text-blue-800";
          darkBgColor = "dark:bg-blue-900/30";
          darkTextColor = "dark:text-blue-300";
          break;
        case "read":
          bgColor = "bg-purple-100";
          textColor = "text-purple-800";
          darkBgColor = "dark:bg-purple-900/30";
          darkTextColor = "dark:text-purple-300";
          break;
        case "replied":
          bgColor = "bg-green-100";
          textColor = "text-green-800";
          darkBgColor = "dark:bg-green-900/30";
          darkTextColor = "dark:text-green-300";
          break;
        case "archived":
          bgColor = "bg-gray-100";
          textColor = "text-gray-800";
          darkBgColor = "dark:bg-gray-700";
          darkTextColor = "dark:text-gray-300";
          break;
        default:
          bgColor = "bg-gray-100";
          textColor = "text-gray-800";
          darkBgColor = "dark:bg-gray-700";
          darkTextColor = "dark:text-gray-300";
      }
    } else if (type === "project") {
      status = item.status || "new";

      switch (status) {
        case "new":
          bgColor = "bg-blue-100";
          textColor = "text-blue-800";
          darkBgColor = "dark:bg-blue-900/30";
          darkTextColor = "dark:text-blue-300";
          break;
        case "contacted":
          bgColor = "bg-purple-100";
          textColor = "text-purple-800";
          darkBgColor = "dark:bg-purple-900/30";
          darkTextColor = "dark:text-purple-300";
          break;
        case "in-progress":
          bgColor = "bg-amber-100";
          textColor = "text-amber-800";
          darkBgColor = "dark:bg-amber-900/30";
          darkTextColor = "dark:text-amber-300";
          break;
        case "quoted":
          bgColor = "bg-cyan-100";
          textColor = "text-cyan-800";
          darkBgColor = "dark:bg-cyan-900/30";
          darkTextColor = "dark:text-cyan-300";
          break;
        case "accepted":
          bgColor = "bg-green-100";
          textColor = "text-green-800";
          darkBgColor = "dark:bg-green-900/30";
          darkTextColor = "dark:text-green-300";
          break;
        case "declined":
          bgColor = "bg-red-100";
          textColor = "text-red-800";
          darkBgColor = "dark:bg-red-900/30";
          darkTextColor = "dark:text-red-300";
          break;
        default:
          bgColor = "bg-gray-100";
          textColor = "text-gray-800";
          darkBgColor = "dark:bg-gray-700";
          darkTextColor = "dark:text-gray-300";
      }
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} ${darkBgColor} ${darkTextColor}`}
      >
        {status}
      </span>
    );
  };

  const getTitle = (item, type) => {
    if (type === "booking") {
      return item.name || "Unknown";
    } else if (type === "contact") {
      return item.subject || "Contact Request";
    } else if (type === "project") {
      return item.projectName || "Project Request";
    }
    return "Unknown";
  };

  const getSubtitle = (item, type) => {
    if (type === "booking") {
      return `${item.callType} call - ${item.projectType}`;
    } else if (type === "contact") {
      return item.name || "";
    } else if (type === "project") {
      return item.serviceType || "";
    }
    return "";
  };

  const getFormattedTime = (timestamp) => {
    if (!timestamp) return "Unknown time";

    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getDetailLink = (item, type) => {
    const baseLink = `/admin/${type}s/${item._id}`;
    return baseLink;
  };

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((item) => (
        <li key={item._id} className="py-3">
          <Link to={getDetailLink(item, type)} className="flex group">
            <div className="mt-1 mr-4">{getIcon(type)}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary dark:group-hover:text-primary-400">
                  {getTitle(item, type)}
                </p>
                {getStatusBadge(item, type)}
              </div>

              <div className="mt-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {getSubtitle(item, type)}
                </p>
              </div>
            </div>

            <div className="flex items-center ml-4 text-xs text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              {getFormattedTime(item.createdAt)}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RecentSubmissionsList;
