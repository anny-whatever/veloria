// client/src/pages/Admin/components/StatusFilter.jsx
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

const StatusFilter = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectValue) => {
    onChange(selectValue);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : "All";
  };

  // Function to get color classes for status badges
  const getStatusColorClasses = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-900/30 text-blue-300 border border-blue-800/50";
      case "completed":
        return "bg-green-900/30 text-green-300 border border-green-800/50";
      case "cancelled":
        return "bg-red-900/30 text-red-300 border border-red-800/50";
      case "rescheduled":
        return "bg-amber-900/30 text-amber-300 border border-amber-800/50";
      case "new":
        return "bg-blue-900/30 text-blue-300 border border-blue-800/50";
      case "read":
        return "bg-purple-900/30 text-purple-300 border border-purple-800/50";
      case "replied":
        return "bg-green-900/30 text-green-300 border border-green-800/50";
      case "archived":
        return "bg-zinc-800 text-zinc-300 border border-zinc-700";
      case "contacted":
        return "bg-purple-900/30 text-purple-300 border border-purple-800/50";
      case "in-progress":
        return "bg-amber-900/30 text-amber-300 border border-amber-800/50";
      case "quoted":
        return "bg-cyan-900/30 text-cyan-300 border border-cyan-800/50";
      case "accepted":
        return "bg-green-900/30 text-green-300 border border-green-800/50";
      case "declined":
        return "bg-red-900/30 text-red-300 border border-red-800/50";
      default:
        return "bg-zinc-800 text-zinc-300 border border-zinc-700";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-1.5 text-sm bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getSelectedLabel()}</span>
        <ChevronDown size={16} className="text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-zinc-950 border border-zinc-800 rounded-md shadow-md max-h-60">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className={`flex items-center justify-between px-3 py-1.5 cursor-pointer hover:bg-zinc-900 transition-colors ${
                  value === option.value
                    ? "bg-zinc-900/80 text-primary-300"
                    : "text-zinc-200"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center">
                  {option.value !== "all" && (
                    <span
                      className={`mr-2 inline-block w-2.5 h-2.5 rounded-full ${getStatusColorClasses(
                        option.value
                      )}`}
                    ></span>
                  )}
                  <span>{option.label}</span>
                </div>
                {value === option.value && (
                  <Check size={14} className="text-primary-400" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
