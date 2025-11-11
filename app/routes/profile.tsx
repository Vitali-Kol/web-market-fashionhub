import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites, cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSaveProfile = () => {
    // In a real app, you'd save to backend here
    // For now, we'll just update localStorage
    const updatedUser = { ...user, name: editedName };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload(); // Reload to update context
  };

  const totalSpent = getTotalPrice();
  const accountAge = "New Member"; // You could calculate this from signup date

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-[#FAF5EB] to-[#E8DCC8] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-black/10 p-8 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="mb-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-transparent"
                  />
                </div>
              ) : (
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{user.name}</h1>
              )}
              <p className="text-gray-600 text-lg mb-1">{user.email}</p>
              <p className="text-gray-500 text-sm">{accountAge}</p>

              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user.name);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Orders */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
            <p className="text-gray-600">Total Orders</p>
          </div>

          {/* Favorites */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">{favorites.length}</div>
            <p className="text-gray-600">Favorite Items</p>
          </div>

          {/* Cart Items */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{cartItems.length}</div>
            <p className="text-gray-600">Cart Items</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-lg font-semibold text-gray-800">2025</p>
              </div>
            </div>
          </div>

          {/* Shopping Summary */}
          <div className="bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Shopping Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Current Cart Value</p>
                <p className="text-xl font-bold text-green-600">{totalSpent.toFixed(2)} EUR</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Items in Cart</p>
                <p className="text-xl font-bold text-gray-800">{cartItems.length}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Favorite Items</p>
                <p className="text-xl font-bold text-pink-600">{favorites.length}</p>
              </div>
              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-4 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 bg-white/80 backdrop-blur rounded-xl border border-black/10 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-center font-semibold"
            >
              View Order History
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-center font-semibold"
            >
              View Shopping Cart
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  logout();
                  navigate("/");
                }
              }}
              className="py-3 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-center font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
