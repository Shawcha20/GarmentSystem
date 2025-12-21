import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export default function TrackOrder() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosSecure.get("/order"); 
      setOrders(res.data.result);
      setLoading(false);
    };
    fetchOrders();
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Track Orders
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>
                  <span className="badge badge-outline">
                    {order.status}
                  </span>
                </td>
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

        {orders.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}
