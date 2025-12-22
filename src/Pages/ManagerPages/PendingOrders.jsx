import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showError, showSuccess } from "../../Utils/Notification";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

export default function PendingOrders() {
  const axiosSecure = useAxiosSecure();
  const {user, status}=useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/orders/pending").then(res => {setOrders(res.data); setLoading(false)});
  }, []);
  if(loading) return <LoadingSpinner></LoadingSpinner>
  const handleApprove = async (id) => {
    if(status=="suspended")return showError("suspended users cannot approve orders");
    await axiosSecure.patch(`/orders/approve/${id}`);
    setOrders(orders.filter(o => o._id !== id));
    showSuccess("Order approved");
  };

  const handleReject = async (id) => {
    if(status=="suspended")return showError("suspended users cannot reject orders");
    await axiosSecure.patch(`/orders/reject/${id}`);
    setOrders(orders.filter(o => o._id !== id));
    showSuccess("Order rejected");
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Pending Orders ({orders.length})
      </h2>

      <table className="table bg-white shadow rounded-xl">
        <thead className="bg-pink-100">
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.email}</td>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleApprove(o._id)}
                  className="btn btn-sm btn-success text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(o._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Reject
                </button>
                   
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
