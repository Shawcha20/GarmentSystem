import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showSuccess } from "../../Utils/Notification";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading]=useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchUsers=async()=>{
    axiosSecure.get("/users").then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  };
  fetchUsers();
  }, []);
  if(loading)return <LoadingSpinner/>
  const handleUpdateRole = async () => {
    await axiosSecure.patch(`/users/${selectedUser._id}`, {
      role: selectedUser.role,
      status: selectedUser.status,
    });

    setUsers(prev =>
      prev.map(u =>
        u._id === selectedUser._id ? selectedUser : u
      )
    );

    showSuccess("User updated successfully");
    setSelectedUser(null);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Manage Users
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
            {users.map(user => (
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
                    onClick={() => setSelectedUser(user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {selectedUser && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Update User
            </h3>

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
              className="select select-bordered w-full"
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button
                className="btn bg-pink-500 text-white"
                onClick={handleUpdateRole}
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
