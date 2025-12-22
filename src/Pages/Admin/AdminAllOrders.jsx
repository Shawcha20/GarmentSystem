import React, { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  pending: "#FBBF24",     // yellow
  approved: "#22C55E",    // green
  rejected: "#EF4444",    // red
  cancelled: "#9CA3AF",   // gray
};

export default function AdminAllOrders() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axiosSecure.get("/admin/orders");
      setOrders(res.data.result || []);
      setLoading(false);
    };
    fetchOrders();
  }, [axiosSecure]);

  // ================= PIE CHART DATA =================
  const chartData = useMemo(() => {
    const statusCount = {
      pending: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (statusCount[order.status] !== undefined) {
        statusCount[order.status]++;
      }
    });

    return Object.keys(statusCount).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: statusCount[key],
      status: key,
    }));
  }, [orders]);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 w-full space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-pink-600">
          All Orders (Admin)
        </h2>

        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Order Status Overview {filteredOrders.length}
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={COLORS[entry.status]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= TABLE ================= */}
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
          <p className="text-center text-gray-500 py-6">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}
