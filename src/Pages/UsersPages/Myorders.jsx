import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showConfirm, showSuccess } from "../../Utils/Notification";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/order/${user.email}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user.email, axiosSecure]);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <div className="p-6 w-full text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          My Orders
        </h2>
        <p className="text-gray-500 text-lg">
          You haven’t placed any orders yet.
        </p>
        <button
          onClick={() => navigate("/all-products")}
          className="btn bg-pink-500 text-white mt-4"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleCancel = async (orderId) => {
    const confirm = await showConfirm(
      "Cancel this order?",
      "This action cannot be undone"
    );

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(
        `/orders/cancel/${orderId}`
      );

      showSuccess(res.data.message);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to cancel order"
      );
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        My Orders
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "badge-warning"
                        : order.status === "approved"
                        ? "badge-success"
                        : order.status === "cancelled"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.payment}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/track-order/${order._id}`
                      )
                    }
                    className="btn btn-sm btn-outline"
                  >
                    View
                  </button>

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
