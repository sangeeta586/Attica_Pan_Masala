import React, { useState } from "react";
import { BASE_URL } from "../../constants";

const ManagementUserResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const id = localStorage.getItem('managementId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/api/administrators/update-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword, confirmNewPassword: confirmPassword }),
        }
      );

      if (response.ok) {
        console.log("Password Updated Successfully");
      } else {
        console.error("Password Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form action="#" className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmNewPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ManagementUserResetPassword;
