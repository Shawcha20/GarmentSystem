import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function Profile() {
  const {
    user,
    role,
    status,
    suspendInfo,
    userSignOut,
  } = useAuth();

  const isSuspended = status === "suspended";
  console.log(suspendInfo);
  return (
    <div className="p-6 w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-xl p-6"
      >
        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          My Profile
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong>{" "}
            {user?.displayName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="badge badge-outline ml-1">
              {role}
            </span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ml-1 ${
                isSuspended
                  ? "badge-error"
                  : "badge-success"
              }`}
            >
              {status || "active"}
            </span>
          </p>
        </div>

        {/* ================= SUSPENDED WARNING ================= */}
        {isSuspended && suspendInfo && (
          <div className="mt-6 border border-red-200 bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Account Suspended
            </h3>

            <p className="text-sm text-gray-700 mb-1">
              <strong>Reason:</strong>{" "}
              {suspendInfo.reason || "Not specified"}
            </p>

            <p className="text-sm text-gray-700 mb-2">
              <strong>Admin Message:</strong>{" "}
              {suspendInfo.feedback || "No details provided"}
            </p>

            <p className="text-xs text-gray-500">
              Suspended on{" "}
              {new Date(
                suspendInfo.suspendedAt
              ).toLocaleString()}
            </p>

            {/* ROLE-BASED EFFECT MESSAGE */}
            <div className="mt-3 text-sm text-red-700">
              {role === "buyer" && (
                <ul className="list-disc pl-5">
                  <li>You cannot place new orders</li>
                  <li>Existing orders remain viewable</li>
                </ul>
              )}

              {role === "manager" && (
                <ul className="list-disc pl-5">
                  <li>You cannot add new products</li>
                  <li>You cannot approve or reject orders</li>
                  <li>Existing data remains accessible</li>
                </ul>
              )}
            </div>
          </div>
        )}

        {/* LOGOUT */}
        <button
          onClick={userSignOut}
          className="btn btn-error text-white w-full mt-6"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
