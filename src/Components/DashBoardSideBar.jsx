import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardSidebar() {
  const { role } = useAuth(); 
  const [open, setOpen] = useState(false);
    console.log(role);
  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      { name: "Manage Users", path: "/dashboard/manage-users" },
      { name: "All Products", path: "/dashboard/all-products" },
      { name: "All Orders", path: "/dashboard/all-orders" },
    ];
  } 
  
  else if (role === "manager") {
    menuItems = [
      { name: "Add Product", path: "/dashboard/add-product" },
      { name: "Manage Products", path: "/dashboard/manage-products" },
      { name: "Pending Orders", path: "/dashboard/pending-orders" },
      { name: "Approve Orders", path: "/dashboard/approve-orders" },
      { name: "My Profile", path: "/dashboard/profile" },
    ];
  } 
  
  else {
    // BUYER / NORMAL USER
    menuItems = [
      { name: "My Orders", path: "/dashboard/my-orders" },
      { name: "Track Order", path: "/dashboard/track-order" },
      { name: "My Profile", path: "/dashboard/profile" },
    ];
  }

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-18 right-4 z-50 btn btn-sm btn-outline"
        onClick={() => setOpen(!open)}
      >
        ☰DASHBOARD
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-full w-64 bg-white shadow-lg border-r border-pink-100
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="px-5 py-6">
          <div className="text-3xl font-bold text-pink-600 mb-8 text-center">
            Cloth<span className="text-gray-800">Rent</span>
          </div>

          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium ${
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-gray-700 hover:bg-pink-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
