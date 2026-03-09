import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AllBikes = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/bike/${id}`);
  };

  const goHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/bikes/bike`);
        setBikes(response.data.GetAlBikes);
        console.log(response.data.GetAlBikes);
      } catch (error) {
        console.log("Error fetching bikes:", error);
      }
    };
    fetchBikes();
  }, []);

  return (
    <div className="bg-gray-100 w-full min-h-screen px-4 py-6">
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Explore Bikes</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-300"
          onClick={goHome}
        >
          ⬅ Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {bikes.map((bike, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 cursor-pointer flex flex-col"
          >
            <img
              src={bike.image_url || "https://via.placeholder.com/400x250"}
              alt="Bike"
              className="h-30 w-full object-cover "
              onClick={() => handleCardClick(bike._id)}
            />
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">₹{bike.pricePerHour} / hour</h2>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Availability:</span>{" "}
                  <span className={bike.availability_status ? "text-green-600" : "text-red-600"}>
                    {bike.availability_status ? "Available" : "Not Available"}
                  </span>
                </p>
                <p className="text-sm text-gray-700">Mileage: {bike.milege || "N/A"}</p>
                <p className="text-sm text-gray-700">City: {bike.city}</p>
                <p className="text-sm text-gray-700">Type: {bike.bike_type}</p>
              </div>
              <button
                onClick={() => handleCardClick(bike._id)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBikes;
