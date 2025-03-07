import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-5 shadow-lg">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {/* Sidebar Navigation */}
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full block px-4 py-2 rounded-md text-left ${
                isActive ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"
              }`
            }
          >
            Add Item
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `w-full block px-4 py-2 rounded-md text-left ${
                isActive ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"
              }`
            }
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/list-items"
            className={({ isActive }) =>
              `w-full block px-4 py-2 rounded-md text-left ${
                isActive ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"
              }`
            }
          >
            List Items
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
