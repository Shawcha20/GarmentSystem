import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showSuccess, showError } from "../../Utils/Notification";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />;

  // ================= UPDATE USER =================
  const handleUpdateUser = async () => {
    try {
      const payload = {
        role: selectedUser.role,
        status: selectedUser.status,
      };

      // ONLY send suspend info if suspended
      if (selectedUser.status === "suspended") {
        payload.suspendInfo = {
          reason: selectedUser.suspendReason,
          feedback: selectedUser.suspendFeedback,
          suspendedAt: new Date(),
        };
      } else {
        payload.suspendInfo = null;
      }

      await axiosSecure.patch(`/users/${selectedUser._id}`, payload);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id
            ? { ...u, ...payload }
            : u
        )
      );

      showSuccess("User updated successfully");
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      showError("Failed to update user");
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-outline">
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      setSelectedUser({
                        ...user,
                        suspendReason:
                          user.suspendInfo?.reason || "",
                        suspendFeedback:
                          user.suspendInfo?.feedback || "",
                      })
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">
              Update User
            </h3>

            {/* ROLE */}
            <label className="block mb-2 font-semibold">
              Role
            </label>
            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  role: e.target.value,
                })
              }
              className="select select-bordered w-full mb-4"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            {/* STATUS */}
            <label className="block mb-2 font-semibold">
              Status
            </label>
            <select
              value={selectedUser.status || "active"}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  status: e.target.value,
                })
              }
              className="select select-bordered w-full mb-4"
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* SUSPEND DETAILS */}
            {selectedUser.status === "suspended" && (
              <>
                <label className="block mb-2 font-semibold">
                  Suspend Reason
                </label>
                <input
                  type="text"
                  placeholder="Reason for suspension"
                  value={selectedUser.suspendReason}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      suspendReason: e.target.value,
                    })
                  }
                  className="input input-bordered w-full mb-3"
                />

                <label className="block mb-2 font-semibold">
                  Admin Feedback
                </label>
                <textarea
                  placeholder="Explain why the user is suspended"
                  value={selectedUser.suspendFeedback}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      suspendFeedback: e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                />
              </>
            )}

            {/* ACTIONS */}
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-pink-500 text-white"
                onClick={handleUpdateUser}
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
