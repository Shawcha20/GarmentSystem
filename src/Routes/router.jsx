import { Component } from "react";
import Home from "../Pages/Home";
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../Pages/ErrorPages";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/SignUp/SIgnUp";
import AllProducts from "../Pages/AllProduct";
import Main from "../main/Main";

export const router= createBrowserRouter([
    {
        path:"/",
        Component:Main,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/all-products",
                Component:AllProducts
            }
        ]
    },
    {
        path:"/login",
        Component:Login
    },
    {
        path:"/register",
        Component:Signup
    }
])