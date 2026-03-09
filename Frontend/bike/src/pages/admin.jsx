import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Admin = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [model, setModel] = useState('');
  const [numberplate, setNumberPlate] = useState('');
  const [biketype, setBikeType] = useState('');
  const [priceperhour, setPricePerHour] = useState('');
  const [availability, setAvailability] = useState('');
  const [chooseImage, setChooseImage] = useState(null);
  const [mileage, setMileage] = useState('');

  const navigate = useNavigate();

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/State/states`);
      setStates(res.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/city/city`);
      setCities(res.data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleFileChange = (e) => {
    setChooseImage(e.target.files[0]);
  };

  const goHome = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('model', model);
    formData.append('number_plate', numberplate);
    formData.append('bike_type', biketype);
    formData.append('State', selectedState);
    formData.append('city', selectedCity);
    formData.append('pricePerHour', priceperhour);
    formData.append('availability_status', availability);
    formData.append('imagefile', chooseImage);
    formData.append('milege', mileage);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/bikes/bike`, formData);
      alert('✅ Bike added successfully!');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('❌ Error adding bike.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">🚲 Add a New Bike</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                onChange={(e) => setModel(e.target.value)}
                placeholder="Bike Model"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Number Plate</label>
              <input
                type="text"
                onChange={(e) => setNumberPlate(e.target.value)}
                placeholder="Number Plate"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Bike Type</label>
              <input
                type="text"
                onChange={(e) => setBikeType(e.target.value)}
                placeholder="Bike Type (e.g., Scooter)"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price Per Hour</label>
              <input
                type="text"
                onChange={(e) => setPricePerHour(e.target.value)}
                placeholder="₹/hr"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Mileage (km/l)</label>
              <input
                type="text"
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Mileage"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Availability</label>
              <input
                type="text"
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Yes / No"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              >
                <option value="">-- Select State --</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">City</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Upload Bike Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              ➕ Add Bike
            </button>
            <button
              type="button"
              onClick={goHome}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              ⬅ Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
