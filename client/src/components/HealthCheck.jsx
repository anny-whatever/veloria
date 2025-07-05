import { useState, useEffect } from "react";
import { checkHealth } from "../api";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

const HealthCheck = ({ showDetails = false }) => {
  const [status, setStatus] = useState("checking"); // checking, healthy, unhealthy
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setStatus("checking");
        const data = await checkHealth();
        setHealthData(data);
        setStatus("healthy");
      } catch (error) {
        setError(error);
        setStatus("unhealthy");
      }
    };

    checkApiHealth();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "text-yellow-400";
      case "healthy":
        return "text-green-400";
      case "unhealthy":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader size={16} className="animate-spin" />;
      case "healthy":
        return <CheckCircle size={16} />;
      case "unhealthy":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Checking API...";
      case "healthy":
        return "API Connected";
      case "unhealthy":
        return "API Unavailable";
      default:
        return "Unknown";
    }
  };

  if (!showDetails) {
    return (
      <div className={`flex items-center gap-2 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-sm">{getStatusText()}</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className={getStatusColor()}>{getStatusIcon()}</div>
        <h3 className="text-lg font-light text-white">API Status</h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={getStatusColor()}>{getStatusText()}</span>
        </div>

        {status === "healthy" && healthData && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-400">Server:</span>
              <span className="text-gray-300">
                {healthData.server || "Veloria API"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Version:</span>
              <span className="text-gray-300">
                {healthData.version || "1.0.0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timestamp:</span>
              <span className="text-gray-300">
                {new Date(healthData.timestamp).toLocaleString()}
              </span>
            </div>
          </>
        )}

        {status === "unhealthy" && error && (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-800/50 rounded">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCheck;
