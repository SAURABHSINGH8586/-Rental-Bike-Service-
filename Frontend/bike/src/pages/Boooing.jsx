import React, { useEffect, useState } from "react";
import axios from "axios";

const GetBooking = () => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/booking/book/`);
        setBookings(response.data.allBikes);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🛵 My Bike Bookings
        </h1>
        

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border p-5"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Bike ID: {booking.bike_id || "N/A"}
                  </h2>
                  <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
                </div>

                <div className="text-gray-700 space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Pickup Time:</span>{" "}
                    {new Date(booking.pickup_time).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Return Time:</span>{" "}
                    {new Date(booking.return_time).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Total Price:</span> ₹{booking.total_price}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
      </div>
      
    </div>
  );
};

export default GetBooking;
