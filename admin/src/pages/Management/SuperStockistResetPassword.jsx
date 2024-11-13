import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../constants";

const SuperStockistResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const id = localStorage.getItem('superstockistId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/api/superstockist/update-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword, confirmNewPassword: confirmPassword }),
        }
      );

      if (response.ok) {
        toast.success("Password Updated Successfully");
      } else {
        toast.error("Password Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#dbeafe] p-8 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#1e40af]">Reset Password</h2>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-[#1e40af] font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmNewPassword" className="block text-[#1e40af] font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1e40af] hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Reset Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SuperStockistResetPassword;
