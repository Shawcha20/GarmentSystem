import { Component } from "react";
import Home from "../Pages/Home";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPages";
import Login from "../Authentication/Login/Login";
import Signup from "../Authentication/SignUp/SIgnUp";
import AllProducts from "../Pages/AllProduct";
import Main from "../main/Main";
import PrivateRoute from "../Components/Shared/PrivateRoute";
import ProductDetails from "../Pages/ProductDetails";
import PlaceOrder from "../Pages/PlaceOrder";
import PaymentPage from "../Pages/PaymentPage";
import OrderSuccess from "../Pages/OrderSuccessPage";
import DashBoard from "../Pages/DashBoard";
import Myorders from "../Pages/UsersPages/Myorders";
import TrackOrder from "../Pages/UsersPages/TrackOrder";
import Profile from "../Pages/Profile";
import AddProduct from "../Pages/ManagerPages/AddProduct";
import ManageProducts from "../Pages/ManagerPages/ManageProducts";
import PendingOrders from "../Pages/ManagerPages/PendingOrders";
import ApprovedOrders from "../Pages/ManagerPages/ApprovedOrders";
import ManageUsers from "../Pages/Admin/ManageUsers";
import AdminAllProducts from "../Pages/Admin/AdminAllProducts";
import AdminAllOrders from "../Pages/Admin/AdminAllOrders";
import DashboardRedirect from "./DashboardRedirect";
import SingleTrackOrder from "../Pages/singleTrackOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <PlaceOrder></PlaceOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "/pay/:id",
        element: (
          <PrivateRoute>
            <PaymentPage></PaymentPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/order-success",
        element: (
          <PrivateRoute>
            <OrderSuccess></OrderSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardRedirect /> },

          // ================= BUYER =================
          { path: "my-orders", element: <Myorders /> },
          // {path:"track-order",element:<TrackOrder></TrackOrder>},
          // { path: "track-order/:id", element: <TrackOrder /> },
          { path: "track-order", element: <TrackOrder /> }, 
          { path: "track-order/:id", element: <SingleTrackOrder /> }, 

          { path: "profile", element: <Profile /> },

          // ================= MANAGER =================
          { path: "add-product", element: <AddProduct /> },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "pending-orders", element: <PendingOrders /> },
          { path: "approve-orders", element: <ApprovedOrders /> },

          // ================= ADMIN =================
          { path: "manage-users", element: <ManageUsers /> },
          { path: "all-products", element: <AdminAllProducts /> },
          { path: "all-orders", element: <AdminAllOrders /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Signup,
  },
]);
