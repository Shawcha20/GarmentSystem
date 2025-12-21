import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showSuccess, showError } from "../../Utils/Notification";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export default function ApprovedOrders() {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading]=useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tracking, setTracking] = useState({
    status: "",
    location: "",
    note: "",
  });

  useEffect(() => {
    setLoading(true)
    axiosSecure.get("/orders/approved").then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);
  if(loading)return <LoadingSpinner></LoadingSpinner>
  const handleAddTracking = async () => {
    try {
      await axiosSecure.patch(
        `/orders/${selectedOrder._id}/tracking`,
        tracking
      );
      showSuccess("Tracking updated");
      setSelectedOrder(null);
      setTracking({ status: "", location: "", note: "" });
    } catch (err) {
      console.error(err);
      showError("Failed to add tracking");
    }
  };

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
            <th>Approved Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.email}</td>
              <td>{o.productName}</td>
              <td>{new Date(o.approvedAt).toLocaleDateString()}</td>
              <td className="flex gap-2 flex-col md:flex-row">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setSelectedOrder(o)}
                >
                  Add Tracking
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

      {/* ===== TRACKING MODAL ===== */}
      {selectedOrder && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Add Tracking Update
            </h3>

            <select
              className="select select-bordered w-full mb-3"
              onChange={(e) =>
                setTracking({ ...tracking, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option>Cutting Completed</option>
              <option>Sewing Started</option>
              <option>Finishing</option>
              <option>QC Checked</option>
              <option>Packed</option>
              <option>Shipped / Out for Delivery</option>
            </select>

            <input
              className="input input-bordered w-full mb-3"
              placeholder="Location"
              onChange={(e) =>
                setTracking({ ...tracking, location: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Notes (optional)"
              onChange={(e) =>
                setTracking({ ...tracking, note: e.target.value })
              }
            />

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedOrder(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-pink-500 text-white"
                onClick={handleAddTracking}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
