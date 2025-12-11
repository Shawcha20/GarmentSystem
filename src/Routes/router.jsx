import { Component } from "react";
import Home from "../Pages/Home";
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../Pages/ErrorPages";
export const router= createBrowserRouter([
    {
        path:"/",
        Component:Home,
        errorElement:<ErrorPage></ErrorPage>
    }
])