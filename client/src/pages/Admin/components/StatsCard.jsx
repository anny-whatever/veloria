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
      className="overflow-hidden bg-white dark:bg-zinc-900 rounded-lg shadow-sm border dark:border-zinc-800"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}
          >
            {icon}
          </div>
          <span className="text-3xl font-bold text-gray-900 dark:text-zinc-100">
            {count}
          </span>
        </div>

        <h3 className="font-medium text-gray-700 dark:text-zinc-300">
          {title}
        </h3>

        {unattendedCount > 0 && (
          <div className="flex items-center mt-2 text-sm">
            <AlertCircle size={16} className="mr-1 text-amber-500" />
            <span className="text-amber-700 dark:text-amber-400">
              {unattendedCount} unattended
            </span>
          </div>
        )}
      </div>

      <Link
        to={linkTo}
        className={`flex items-center justify-between p-3 bg-${color}/5 dark:bg-${color}/10 text-${color} dark:text-${color}-400 text-sm border-t border-gray-100 dark:border-zinc-800`}
      >
        <span>View details</span>
        <ChevronRight size={16} />
      </Link>
    </motion.div>
  );
};

export default StatsCard;
