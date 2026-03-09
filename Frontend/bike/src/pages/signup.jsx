import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [first, setFirst] = useState("");
  const [last, setlast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}ap1/v1/auth/signup`, {
        firstName: first,
        lastName: last,
        email,
        password,
        confirmPassword: confirm,
        accountType: account,
        phone,
        licenceNumber: license
      });

      console.log("Signup successful", response);
      if (response.status !== 200) {
        alert(response.message);
        return;
      }

      const type = response.data.user.accountType;
      const val = response.data.user._id;
      localStorage.clear();
      localStorage.setItem(type, val);

      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input onChange={(e) => setFirst(e.target.value)} type="text" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input onChange={(e) => setlast(e.target.value)} type="text" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input onChange={(e) => setConfirm(e.target.value)} type="password" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <input onChange={(e) => setAccount(e.target.value)} type="text" placeholder="e.g. Admin or Biker" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input onChange={(e) => setPhone(e.target.value)} type="text" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">License Number</label>
            <input onChange={(e) => setLicense(e.target.value)} type="text" className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
