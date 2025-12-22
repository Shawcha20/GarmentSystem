import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
