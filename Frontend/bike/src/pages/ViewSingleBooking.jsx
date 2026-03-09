import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewSingleBooking = () => {
  const val = localStorage.getItem("Biker");
  if (!val) {
    console.log("User ID missing");
    return;
  }

  const id = val;
  const navigate = useNavigate();

  const [booking, setBooking] = useState([]);
  const [bike, setBike] = useState([]);
  const [dataa, setData] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/booking/book/${id}`);
        setBooking(response.data.bookings);
        setBike(response.data.bikeBookings);

        const combined = response.data.bookings.map((booking) => {
          const matchingBike = response.data.bikeBookings.find(bike => bike._id === booking.bike_id);
          return {
            ...booking,
            bike: matchingBike || {}
          };
        });

        setData(combined);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBooking();
  }, []);

  if (!booking.length) {
    return <div className="text-center text-red-500 mt-10">No booking data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Your Bookings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dataa.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 p-6"
            >
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Booking #{index + 1}
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-medium text-gray-500">Pickup Time:</span><br />
                  {new Date(item.pickup_time).toLocaleString()}
                </div>

                <div>
                  <span className="font-medium text-gray-500">Return Time:</span><br />
                  {new Date(item.return_time).toLocaleString()}
                </div>

                <div>
                  <span className="font-medium text-gray-500">Total Price:</span><br />
                  <span className="text-green-700 font-bold text-lg">₹{item.total_price}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Bike Model:</span><br />
                  {item.bike.model || "N/A"}
                </div>

                <div>
                  <span className="font-medium text-gray-500">Status:</span><br />
                  <span className={`inline-block px-3 mt-2 py-1 rounded-full 
                    ${item.status === "Completed" ? "bg-green-200 text-green-700" :
                      item.status === "Cancelled" ? "bg-red-200 text-red-700" :
                        "bg-yellow-300 text-yellow-700"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleBooking;


