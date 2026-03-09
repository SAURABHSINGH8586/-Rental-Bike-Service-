import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBike = () => {
  const { id } = useParams();
  const [single, setSingle] = useState(null);
  const navigate = useNavigate();

  const goBack = () => navigate("/AllBikes");

  const handleBookNow = () => {
    navigate(`/book/${single._id}`); 
  };

  useEffect(() => {
    const fetchSingleBike = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/bikes/bike/${id}`);
        if (response.data.GetsingleBike) {
          setSingle(response.data.GetsingleBike);
        } else {
          console.error("GetsingleBike not found in response!");
        }
      } catch (error) {
        console.log("Error fetching bike:", error);
      }
    };

    fetchSingleBike();
  }, [id]);

  if (!single) {
    return (
      <div className="text-center p-10 text-lg font-semibold">
        Loading bike details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="p-8 flex items-center justify-center bg-gray-50">
            <img
              src={single.image_url || "https://via.placeholder.com/600x400?text=No+Image"}
              alt="bike"
              className="rounded-lg shadow-md max-h-[600px] object-contain"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{single.city} Bike</h1>
            <p className="text-sm text-gray-500 mb-4">Mileage: {single.milege}</p>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-green-600">₹{single.pricePerHour}</span>
              <span className="ml-2 text-sm text-gray-500">/ hour</span>
            </div>

            <p className="mb-4">
              Status:{" "}
              <span className={single.availability_status ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {single.availability_status ? "Available" : "Not Available"}
              </span>
            </p>

            <button
              onClick={handleBookNow}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg shadow-md transition-all"
              disabled={!single.availability_status}
            >
              {single.availability_status ? "Book Now" : "Currently Unavailable"}
            </button>

            <button
              onClick={goBack}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg shadow-sm transition-all"
            >
              ⬅ Back to All Bikes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBike;
