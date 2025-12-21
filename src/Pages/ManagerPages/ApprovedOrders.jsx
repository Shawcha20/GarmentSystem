import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function ApprovedOrders() {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosSecure.get("/orders/approved").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Approved Orders
      </h2>

      <table className="table bg-white shadow rounded-xl">
        <thead className="bg-pink-100">
          <tr>
            <th>Order</th>
            <th>User</th>
            <th>Product</th>
            <th>Approved At</th>
            <th>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.email}</td>
              <td>{o.productName}</td>
              <td>{new Date(o.approvedAt).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/dashboard/track-order/${o._id}`}
                  className="btn btn-sm btn-outline"
                >
                  View Tracking
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
