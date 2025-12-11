import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'

export default function Main() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
