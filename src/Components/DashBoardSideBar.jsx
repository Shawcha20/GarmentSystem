import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardSidebar() {
  const { role } = useAuth(); 

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
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r border-pink-100 px-5 py-6">
      {/* LOGO */}
      <div className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Cloth<span className="text-gray-800">Rent</span>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
    </aside>
  );
}
