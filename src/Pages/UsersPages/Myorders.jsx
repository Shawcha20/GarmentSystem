import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showConfirm, showSuccess } from "../../Utils/Notification";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const demoOrders = [
  {
    _id: "ORD-1001",
    product: "Elegant Bridal Lehenga",
    quantity: 1,
    status: "Pending",
    payment: "Paid",
  },
  {
    _id: "ORD-1002",
    product: "Men’s Premium Blazer",
    quantity: 2,
    status: "Approved",
    payment: "Cash on Delivery",
  },
  {
    _id: "ORD-1003",
    product: "Designer Saree",
    quantity: 1,
    status: "Shipped",
    payment: "Paid",
  },
];

export default function MyOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
      const order = await axiosSecure.get("/order");
      console.log(order);
      setOrders(order.data.result);
      setLoading(false);
    };
    fetchOrder();
  }, []);
  if (loading) return <div ><LoadingSpinner></LoadingSpinner></div>;

  const handleCancel = async (id) => {
    const result = await showConfirm(
      "Cancel this order?",
      "This action cannot be undone"
    );

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/cancel/${id}`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );

      showSuccess("Order cancelled successfully");
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">My Orders</h2>

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
                        : order.status === "Approved"
                        ? "badge-success"
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
                      navigate(`/dashboard/track-order/${order._id}`)
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
