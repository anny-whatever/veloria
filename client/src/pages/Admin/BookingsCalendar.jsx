// client/src/pages/Admin/BookingsCalendar.jsx - Fixed manual booking functionality
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, List, AlertTriangle, Users, PlusCircle } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { format } from "date-fns";
import API from "../../api";
import { useTheme } from "../../contexts/ThemeContext";

const BookingsCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const { isDarkMode } = useTheme();

  // Function to fetch booking events for the calendar
  const fetchEvents = useCallback(
    async (start, end) => {
      try {
        setLoading(true);

        // Format dates as YYYY-MM-DD
        const startDate = format(new Date(start), "yyyy-MM-dd");
        const endDate = format(new Date(end), "yyyy-MM-dd");

        console.log(`Fetching booking events from ${startDate} to ${endDate}`);

        const response = await API.get("/bookings/admin/calendar", {
          params: {
            start: startDate,
            end: endDate,
          },
        });

        console.log("Booking events received:", response.data);
        setEvents(response.data);
        setLoading(false);
        setError(null); // Clear any existing errors on success
      } catch (err) {
        console.error("Error fetching booking events:", err);
        setError("Failed to fetch booking events. Please try again.");
        setLoading(false);

        // If we've retried less than 3 times, try again
        if (retryCount < 3) {
          console.log(`Retrying fetch (attempt ${retryCount + 1} of 3)...`);
          setRetryCount((prev) => prev + 1);
          // Try again after a short delay
          setTimeout(() => {
            fetchEvents(start, end);
          }, 2000);
        }
      }
    },
    [retryCount]
  );

  // Function to fetch today's bookings
  const fetchTodaysBookings = useCallback(async () => {
    try {
      const response = await API.get("/bookings/admin/today");
      setTodaysBookings(response.data);
    } catch (err) {
      console.error("Error fetching today's bookings:", err);
      // Don't set an error here - we can still show the calendar without today's bookings
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const initialStart = new Date();
    initialStart.setMonth(initialStart.getMonth() - 1);

    const initialEnd = new Date();
    initialEnd.setMonth(initialEnd.getMonth() + 2);

    fetchEvents(initialStart, initialEnd);
    fetchTodaysBookings();
  }, [fetchEvents, fetchTodaysBookings]);

  // Function to handle date range change in calendar
  const handleDatesSet = (dateInfo) => {
    // Reset retry count on new date range
    setRetryCount(0);
    fetchEvents(dateInfo.start, dateInfo.end);
  };

  // Function to handle event click
  const handleEventClick = (eventInfo) => {
    const bookingId = eventInfo.event.id;
    if (bookingId) {
      navigate(`/admin/bookings/${bookingId}`);
    }
  };

  // Custom rendering for events
  const renderEventContent = (eventInfo) => {
    // Choose icon based on call type
    const callType = eventInfo.event.extendedProps?.callType || "unknown";
    const icon = callType === "video" ? "📹" : "📞";

    return (
      <div className="flex items-center w-full">
        <div className="mr-1">{icon}</div>
        <div className="overflow-hidden text-xs font-semibold truncate">
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  // Function to handle creating a new booking
  const handleCreateBooking = () => {
    // Navigate to the booking creation page
    navigate("/admin/bookings/new");
  };

  if (error && retryCount >= 3) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-zinc-900 dark:border-red-800 dark:text-red-400">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          The server returned an error when trying to load calendar events. This
          may be due to a server-side issue or misconfiguration.
        </p>
        <button
          onClick={() => {
            setRetryCount(0);
            window.location.reload();
          }}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
        >
          Retry
        </button>
      </div>
    );
  }

  // Apply dark mode class to calendar
  useEffect(() => {
    if (isDarkMode) {
      document.querySelector(".fc")?.classList.add("fc-dark");
    } else {
      document.querySelector(".fc")?.classList.remove("fc-dark");
    }
  }, [isDarkMode, loading]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:mb-0">
          <div className="flex items-center">
            <Calendar
              size={24}
              className="mr-2 text-primary-600 dark:text-primary-400"
            />
            Discovery Call Calendar
          </div>
        </h1>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/bookings"
            className="flex items-center px-4 py-2 text-sm border border-zinc-300 rounded-md hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800/50 dark:text-zinc-200 text-zinc-700"
          >
            <List size={18} className="mr-2" />
            List View
          </Link>
        </div>
      </div>

      {/* Main Calendar and Today's Bookings Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar (takes up more space) */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h2 className="mb-2 text-lg font-medium text-zinc-900 sm:mb-0 dark:text-zinc-100">
                  Discovery Call Schedule
                </h2>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Scheduled
                    </span>
                  </div>
                  <div className="flex items-center mr-4">
                    <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 bg-red-500 rounded-full"></span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Cancelled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && retryCount < 3 && (
              <div className="p-4 m-4 border rounded-lg text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-400">
                <div className="flex items-center">
                  <AlertTriangle size={18} className="mr-2" />
                  <p>Having trouble loading calendar events. Retrying...</p>
                </div>
              </div>
            )}

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
                    background-color: #52525b !important;
                    border-color: #3f3f46 !important;
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
                    background-color: rgba(113, 113, 122, 0.2) !important;
                  }
                `}
              </style>
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                initialView={currentView}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
                slotMinTime="09:00:00"
                slotMaxTime="19:00:00"
                slotDuration="00:30:00"
                dayMaxEvents={true}
                nowIndicator={true}
                businessHours={{
                  daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                  startTime: "09:00",
                  endTime: "19:00",
                }}
                className={isDarkMode ? "fc-dark" : ""}
              />
            </div>
          </div>
        </div>

        {/* Today's Bookings Sidebar */}
        <div className="lg:col-span-1">
          <div className="p-4 rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-900 dark:border dark:border-zinc-800">
            <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Today's Bookings
            </h2>
            {todaysBookings.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No bookings scheduled for today.
              </p>
            ) : (
              <ul className="space-y-3">
                {todaysBookings.map((booking) => (
                  <li
                    key={booking._id}
                    className="p-3 text-sm border rounded-md bg-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-700"
                  >
                    <Link
                      to={`/admin/bookings/${booking._id}`}
                      className="block group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {booking.name}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {booking.time}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {booking.projectType}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 overflow-hidden bg-zinc-50 rounded-lg shadow-sm dark:bg-zinc-900 dark:border dark:border-zinc-800">
            <div className="p-4 border-b dark:border-zinc-800">
              <h2 className="text-lg font-medium dark:text-zinc-100">
                Quick Actions
              </h2>
            </div>
            <div className="p-4">
              <button
                onClick={handleCreateBooking}
                className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md bg-primary hover:bg-primary/90"
              >
                <PlusCircle size={18} className="mr-2" />
                Add Manual Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsCalendar;
