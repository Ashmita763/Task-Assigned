import React from "react";

import {
  FaBell,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaGraduationCap,
} from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")   

        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <>
      {/*  TOP NAVBAR  */}

      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">

        <nav className="h-20 px-6 flex items-center gap-5">

          {/* Logo */}
   
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
          >
            <FaGraduationCap
              size={28}
              className="text-slate-600"
            />

            <span className="text-2xl font-bold text-slate-800">
              CodAcademy
            </span>
          </Link>


          {/* Explore 

          <Link
            to="/courses"
            className="text-gray-700 hover:text-purple-600 shrink-0"
          >
           <button>Explore
            <FaAngleDown/>
            </button> 
          </Link>//
          */}


          {/* Search */}

          <div className="w-[450px] shrink-0">

            <div className="h-12 flex items-center border border-gray-300 rounded-full bg-gray-50 px-5">

              <FaSearch
                size={17}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search for anything"
                className="w-full ml-3 outline-none bg-transparent"
              />

            </div>

          </div>


          {/* Right Side */}

          <div className="flex items-center gap-8 ml-auto shrink-0">

            {/* My Learning */}

            <Link
              to="/my-learning"
              className="text-gray-700 hover:text-purple-600 whitespace-nowrap"
            >
              My Learning
            </Link>


            {/* Wishlist */}




            {/* Cart */}

            <Link to="/cart">
              <FaShoppingCart
                size={20}
                className="text-gray-600 hover:text-purple-600"
              />
            </Link>


            {/* Notification */}

            <Link to="/notifications">
              <FaBell
                size={20}
                className="text-gray-600 hover:text-purple-600"
              />
            </Link>


            {/* Profile */}

            <Link
              to="/profile"
              title={user?.name || "Profile"}
              className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold"
            >
              {initials}
            </Link>

          </div>

        </nav>

      </header>
    </>
  );
};


export default Navbar;