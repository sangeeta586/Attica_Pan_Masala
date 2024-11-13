import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../constants";

const DeliveryBoyResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const id = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/api/qrGeneraterBoy/update-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: newPassword,
            confirmNewPassword: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        toast.success("Password Updated Successfully");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Password Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#dbeafe] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1e40af]">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block  text-sm font-bold mb-2 text-[#1e40af]"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-[#1e40af] text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#1e40af] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DeliveryBoyResetPassword;
