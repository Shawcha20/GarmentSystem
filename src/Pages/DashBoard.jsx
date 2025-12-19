import React from 'react'
import DashboardSidebar from '../Components/DashBoardSideBar'
import { Outlet } from 'react-router-dom'

export default function DashBoard() {
  return (
   <div className='flex'>
    <DashboardSidebar></DashboardSidebar>
    <Outlet></Outlet>
   </div>
  )
}
