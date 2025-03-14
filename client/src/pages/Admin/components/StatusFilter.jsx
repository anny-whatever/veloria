// client/src/pages/Admin/components/StatusFilter.jsx
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

const StatusFilter = ({ options, selected, onChange }) => {
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

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const option = options.find((opt) => opt.value === selected);
    return option ? option.label : "All";
  };

  // Function to get color classes for status badges
  const getStatusColorClasses = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rescheduled":
        return "bg-amber-100 text-amber-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-purple-100 text-purple-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "quoted":
        return "bg-cyan-100 text-cyan-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getSelectedLabel()}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-60">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center">
                  {option.value !== "all" && (
                    <span
                      className={`mr-2 inline-block w-2 h-2 rounded-full ${getStatusColorClasses(
                        option.value
                      )}`}
                    ></span>
                  )}
                  <span>{option.label}</span>
                </div>
                {selected === option.value && (
                  <Check size={16} className="text-primary" />
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
