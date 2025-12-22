import React from 'react'
import DashboardSidebar from '../Components/DashBoardSideBar'
import { Outlet } from 'react-router-dom'

export default function DashBoard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 w-full overflow-x-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
