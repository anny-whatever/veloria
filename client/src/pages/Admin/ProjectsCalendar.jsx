// client/src/pages/Admin/ProjectsCalendar.jsx - Fixed component
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  List,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import API from "../../api";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectsCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isDarkMode } = useTheme();

  // Function to fetch events for the calendar
  const fetchEvents = useCallback(async (start, end) => {
    try {
      setLoading(true);

      // Format dates as YYYY-MM-DD
      const startDate = format(new Date(start), "yyyy-MM-dd");
      const endDate = format(new Date(end), "yyyy-MM-dd");

      console.log(`Fetching calendar events from ${startDate} to ${endDate}`);

      const response = await API.get("/projects/admin/calendar", {
        params: {
          start: startDate,
          end: endDate,
        },
      });

      console.log("Calendar events received:", response.data);
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      setError("Failed to fetch calendar events. Please try again.");
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const initialStart = new Date();
    initialStart.setMonth(initialStart.getMonth() - 1);

    const initialEnd = new Date();
    initialEnd.setMonth(initialEnd.getMonth() + 2);

    fetchEvents(initialStart, initialEnd);
  }, [fetchEvents]);

  // Function to handle date range change in calendar
  const handleDatesSet = (dateInfo) => {
    setCurrentDate(dateInfo.start);
    fetchEvents(dateInfo.start, dateInfo.end);
  };

  // Function to handle event click
  const handleEventClick = (eventInfo) => {
    const projectId = eventInfo.event.id;
    if (projectId) {
      navigate(`/admin/projects/${projectId}`);
    }
  };

  // Custom rendering for events
  const renderEventContent = (eventInfo) => {
    const eventType = eventInfo.event.extendedProps?.type || "default";

    // Choose icon based on event type
    let icon;
    switch (eventType) {
      case "project":
        icon = "🏁";
        break;
      case "milestone":
        icon = "🔷";
        break;
      case "payment":
        icon = "💰";
        break;
      default:
        icon = "📅";
    }

    return (
      <div className="flex items-center w-full">
        <div className="mr-1">{icon}</div>
        <div className="overflow-hidden text-xs font-semibold truncate">
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  // Apply dark mode class to calendar
  useEffect(() => {
    if (isDarkMode) {
      document.querySelector(".fc")?.classList.add("fc-dark");
    } else {
      document.querySelector(".fc")?.classList.remove("fc-dark");
    }
  }, [isDarkMode, loading]);

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
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:mb-0">
          <div className="flex items-center">
            <Calendar
              size={24}
              className="mr-2 text-primary-600 dark:text-primary-400"
            />
            Projects Calendar
          </div>
        </h1>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/projects"
            className="flex items-center px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 dark:text-zinc-200 text-zinc-700"
          >
            <List size={18} className="mr-2" />
            List View
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h2 className="mb-2 text-lg font-medium text-zinc-900 sm:mb-0 dark:text-zinc-100">
              Project Timeline
            </h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 mr-1 rounded-full bg-primary-500"></span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active
                </span>
              </div>
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 mr-1 bg-amber-500 rounded-full"></span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Milestone
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Deliverable
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={loading ? "opacity-50" : ""}>
          <style>
            {`
              .fc-dark .fc-scrollgrid,
              .fc-dark .fc-scrollgrid-section-header,
              .fc-dark .fc-col-header,
              .fc-dark .fc-daygrid-body,
              .fc-dark .fc-timegrid-body,
              .fc-dark .fc-list,
              .fc-dark .fc-list-day,
              .fc-dark .fc-list-event {
                background-color: #18181b !important;
                border-color: #27272a !important;
              }

              .fc-dark .fc-scrollgrid-section-header th,
              .fc-dark .fc-col-header-cell,
              .fc-dark .fc-daygrid-day,
              .fc-dark .fc-timegrid-slot,
              .fc-dark .fc-list-day th,
              .fc-dark .fc-list-event td {
                border-color: #27272a !important;
              }

              .fc-dark .fc-col-header-cell a,
              .fc-dark .fc-daygrid-day-number,
              .fc-dark .fc-list-day-text,
              .fc-dark .fc-list-day-side-text {
                color: #e4e4e7 !important;
              }

              .fc-dark .fc-day-other .fc-daygrid-day-number {
                color: #71717a !important;
              }

              .fc-dark .fc-button-primary {
                background-color: #27272a !important;
                border-color: #3f3f46 !important;
                color: #e4e4e7 !important;
              }

              .fc-dark .fc-button-primary:hover {
                background-color: #3f3f46 !important;
              }

              .fc-dark .fc-button-primary:not(:disabled).fc-button-active,
              .fc-dark .fc-button-primary:not(:disabled):active {
                background-color: #4f46e5 !important;
                border-color: #4338ca !important;
              }

              .fc-dark .fc-daygrid-day-events .fc-event,
              .fc-dark .fc-timegrid-event {
                background-color: #3f3f46 !important;
                border-color: #52525b !important;
              }

              .fc-dark .fc-list-event:hover td {
                background-color: #27272a !important;
              }

              .fc-dark .fc-list-empty {
                background-color: #18181b !important;
                color: #a1a1aa !important;
              }
              
              .fc-dark .fc-toolbar-title {
                color: #e4e4e7 !important;
              }
              
              .fc-dark .fc-daygrid-day.fc-day-today,
              .fc-dark .fc-timegrid-slot.fc-day-today {
                background-color: rgba(79, 70, 229, 0.1) !important;
              }
            `}
          </style>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="auto"
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: "short",
            }}
            dayMaxEvents={true}
            nowIndicator={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
              startTime: "9:00",
              endTime: "18:00",
            }}
            className={isDarkMode ? "fc-dark" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCalendar;
