// client/src/pages/Admin/components/StatsCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, AlertCircle } from "lucide-react";

const StatsCard = ({
  title,
  count,
  unattendedCount,
  icon,
  linkTo,
  color = "primary",
}) => {
  return (
    <motion.div
      className="overflow-hidden bg-white rounded-lg shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}
          >
            {icon}
          </div>
          <span className="text-3xl font-bold">{count}</span>
        </div>

        <h3 className="font-medium text-gray-700">{title}</h3>

        {unattendedCount > 0 && (
          <div className="flex items-center mt-2 text-sm">
            <AlertCircle size={16} className="mr-1 text-amber-500" />
            <span className="text-amber-700">{unattendedCount} unattended</span>
          </div>
        )}
      </div>

      <Link
        to={linkTo}
        className={`flex items-center justify-between p-3 bg-${color}/5 text-${color} text-sm border-t`}
      >
        <span>View details</span>
        <ChevronRight size={16} />
      </Link>
    </motion.div>
  );
};

export default StatsCard;
