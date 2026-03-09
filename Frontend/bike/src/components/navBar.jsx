import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install lucide-react for icons

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAdmin = (e) => {
    e.preventDefault();
    const val = localStorage.getItem("Admin");
    val ? navigate("/Admin") : alert("❌ Only Admin can access this page");
  };

  const handleBikerBooking = (e) => {
    e.preventDefault();
    const val = localStorage.getItem("Biker");
    val ? navigate("/ViewSingleBooking") : alert("❌ Only Biker can access this page");
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const adminVal = localStorage.getItem("Admin");
    adminVal ? navigate("/Booking") : alert("❌ Only Admin can access this page");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWx3VAp9zuLCrq8Gm4sIA-GDzRQtQBCHpjWQ&s"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover shadow-md"
          />
          <span className="text-xl font-extrabold text-slate-900 tracking-wide">
            BikeZone
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-sm">
          <a href="/AllBikes" className="text-slate-700 hover:text-orange-500 transition">All Bikes</a>
          <button onClick={handleBooking} className="text-slate-700 hover:text-orange-500 transition">Booking</button>
          <a href="/Profile" className="text-slate-700 hover:text-orange-500 transition">Profile</a>
          <a href="/ContactUs" className="text-slate-700 hover:text-orange-500 transition">Contact Us</a>
          <button onClick={handleAdmin} className="text-slate-700 hover:text-orange-500 transition">Admin</button>
          <button onClick={handleBikerBooking} className="text-slate-700 hover:text-orange-500 transition">View Booking</button>
        </nav>

        {/* Auth Buttons - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Login"
            className="px-4 py-2 text-sm font-semibold border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition"
          >
            Login
          </a>
          <a
            href="/Signup"
            className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            Sign Up
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white border-t border-gray-200">
          <a href="/AllBikes" className="block text-slate-700 hover:text-orange-500">All Bikes</a>
          <button onClick={handleBooking} className="block text-slate-700 hover:text-orange-500">Booking</button>
          <a href="/Profile" className="block text-slate-700 hover:text-orange-500">Profile</a>
          <a href="/ContactUs" className="block text-slate-700 hover:text-orange-500">Contact Us</a>
          <button onClick={handleAdmin} className="block text-slate-700 hover:text-orange-500">Admin</button>
          <button onClick={handleBikerBooking} className="block text-slate-700 hover:text-orange-500">View Booking</button>
          <hr />
          <a
            href="/Login"
            className="block text-orange-500 font-semibold border border-orange-500 px-4 py-2 rounded-full text-center hover:bg-orange-50 transition"
          >
            Login
          </a>
          <a
            href="/Signup"
            className="block text-white font-semibold bg-orange-500 px-4 py-2 rounded-full text-center hover:bg-orange-600 transition"
          >
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
