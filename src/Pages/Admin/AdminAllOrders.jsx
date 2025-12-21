import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import SingleTrackOrder from "../singleTrackOrder";

export default function AdminAllOrders() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosSecure.get("/admin/orders");
      setOrders(res.data.result);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  const handleViewButton = async (id) => {
    console.log(id);
    const product = await axiosSecure.get(`order/${id}`);
    return <SingleTrackOrder tracking={product}></SingleTrackOrder>;
  };
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600">All Orders (Admin)</h2>

        {/* FILTER */}
        <select
          className="select select-bordered"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "badge-warning"
                        : order.status === "approved"
                        ? "badge-success"
                        : order.status === "rejected"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
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

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 py-6">No orders found</p>
        )}
      </div>
    </div>
  );
}
