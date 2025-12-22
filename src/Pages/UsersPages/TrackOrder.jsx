import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function TrackOrder() {
  const {user}=useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`order/${user.email}`).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Track Orders
      </h2>

      <table className="table bg-white shadow rounded-xl">
        <thead className="bg-pink-100">
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.productName}</td>
              <td>{order.status}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/dashboard/track-order/${order._id}`)
                  }
                  className="btn btn-sm btn-outline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
