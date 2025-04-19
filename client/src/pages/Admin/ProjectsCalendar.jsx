// client/src/pages/Admin/ProjectsCalendar.jsx - Fixed component
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import API from "../../api";

const ProjectsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());

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
    const eventType = eventInfo.event.extendedProps?.type;
    const projectId = eventInfo.event.extendedProps?.projectId;

    if (projectId) {
      window.location.href = `/admin/projects/${projectId}`;
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

  if (error) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">
          <div className="flex items-center">
            <Calendar size={24} className="mr-2 text-accent" />
            Projects Calendar
          </div>
        </h1>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/projects"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ClipboardList size={18} className="mr-2" />
            Pipeline View
          </Link>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h2 className="mb-2 text-lg font-medium sm:mb-0">
              Project Deadlines & Milestones
            </h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 mr-1 bg-red-500 rounded-full"></span>
                <span className="text-xs text-gray-500">Project Deadlines</span>
              </div>
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 mr-1 rounded-full bg-amber-500"></span>
                <span className="text-xs text-gray-500">Milestones</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
                <span className="text-xs text-gray-500">Payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className={loading ? "opacity-50" : ""}>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCalendar;
