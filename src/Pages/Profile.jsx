import { useAuth } from "../hooks/useAuth";


export default function Profile() {
  const { user, role, userSignOut } = useAuth();

  return (
    <div className="p-6 w-full max-w-lg mx-auto">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          My Profile
        </h2>

        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>

        <button
          onClick={userSignOut}
          className="btn btn-error text-white w-full mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
