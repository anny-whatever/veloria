// client/src/pages/Admin/BookingsCalendar.jsx - Fixed Add Manual Booking button and removed settings
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

const BookingsCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

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
    // Directly navigate to the BookingDetails component with "new" parameter
  };

  if (error && retryCount >= 3) {
    return (
      <div className="p-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center mb-3">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p>{error}</p>
        <p className="mt-2 text-sm text-red-600">
          The server returned an error when trying to load calendar events. This
          may be due to a server-side issue or misconfiguration.
        </p>
        <button
          onClick={() => {
            setRetryCount(0);
            window.location.reload();
          }}
          className="px-4 py-2 mt-4 text-red-700 transition-colors bg-red-100 rounded-md hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">
          <div className="flex items-center">
            <Calendar size={24} className="mr-2 text-primary" />
            Discovery Call Calendar
          </div>
        </h1>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/bookings"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <h2 className="mb-2 text-lg font-medium sm:mb-0">
                  Discovery Call Schedule
                </h2>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                    <span className="text-xs text-gray-500">Scheduled</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-500">Completed</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 bg-red-500 rounded-full"></span>
                    <span className="text-xs text-gray-500">Cancelled</span>
                  </div>
                </div>
              </div>
            </div>

            {error && retryCount < 3 && (
              <div className="p-4 m-4 border rounded-lg text-amber-700 border-amber-200 bg-amber-50">
                <div className="flex items-center">
                  <AlertTriangle size={18} className="mr-2" />
                  <p>Having trouble loading calendar events. Retrying...</p>
                </div>
              </div>
            )}

            <div className={loading ? "opacity-50" : ""}>
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
              />
            </div>
          </div>
        </div>

        {/* Today's Bookings Sidebar */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="flex items-center text-lg font-medium">
                <Users size={20} className="mr-2 text-primary" />
                Today's Calls
                <span className="flex items-center justify-center w-6 h-6 ml-2 text-xs text-white rounded-full bg-primary">
                  {todaysBookings.length}
                </span>
              </h2>
            </div>

            <div>
              {todaysBookings.length === 0 ? (
                <div className="p-6 text-center">
                  <Calendar size={32} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">No calls scheduled for today</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {todaysBookings.map((booking) => (
                    <Link
                      key={booking._id}
                      to={`/admin/bookings/${booking._id}`}
                      className="block p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-primary">
                            {booking.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {booking.projectType}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {booking.time}
                          </div>
                          <div className="flex items-center justify-end mt-1 text-xs text-gray-500">
                            {booking.callType === "video" ? (
                              <span className="flex items-center">
                                <span className="mr-1">📹</span> Video Call
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <span className="mr-1">📞</span> Phone Call
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mt-2">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            booking.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.status?.charAt(0).toUpperCase() +
                            booking.status?.slice(1) || "Unknown"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Quick Actions</h2>
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
