import { Component } from "react";
import Home from "../Pages/Home";
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../Pages/ErrorPages";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/SignUp/SIgnUp";
export const router= createBrowserRouter([
    {
        path:"/",
        Component:Home,
        errorElement:<ErrorPage></ErrorPage>
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