import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BookBike = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [totalPrice, setTotalPrice] = useState("");


  const handleBooking = async () => {
    try {
      const val = localStorage.getItem("Biker");
      if(!val){
        window.alert('Login Required');
        navigate('/login');
        return;
      }


      
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/booking/book/${id}`, {
        user_id:val,
        biker_id:id,
        pickup_time: pickupTime,
        return_time: returnTime,
        total_price: totalPrice,
      });
      alert("✅ Booking successful!");
      navigate("/AllBikes");
    } catch (error) {
      console.error(error);
      alert("❌ Booking failed");
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-3">
          🛵 Book Your Ride
        </h2>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time
            </label>
            <input
              type="datetime-local"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Time
            </label>
            <input
              type="datetime-local"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price (₹)
            </label>
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="Enter total price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleBooking}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            🚀 Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookBike;


