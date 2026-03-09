import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const Profile = () => {
  const [user, setUser] = useState([]);

  const fetchProfile = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}api/v1/auth/signup`, {
      withCredentials: true,
    });
    console.log("Fetched user:", response.data.user);
    setUser(response.data.user); 
  } catch (error) {
    console.error("Failed to fetch profile", error);
    alert("Unable to load profile");
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Profile</h2>

        {user ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input value={user.firstName} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input value={user.lastName} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input value={user.email} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <input value={user.accountType} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input value={user.phone} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input value={user.licenceNumber} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
            </div>

            {user.additionalDetails && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input value={user.additionalDetails.gender || ''} readOnly className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    value={user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth.slice(0, 10) : ''}
                    readOnly
                    className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">About</label>
                  <textarea
                    value={user.additionalDetails.about || ''}
                    readOnly
                    className="mt-1 w-full border px-3 py-2 rounded-md bg-gray-100"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading profile...</p>
        )}
      </div>
    </div>
  );
};


