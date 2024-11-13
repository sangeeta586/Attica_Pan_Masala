import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';

const ManagementUser = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/administrators/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const resetHandler=(id)=>{
    console.log("Clicked reset for ID:", id);
    navigate('/managementresetpassword');
    localStorage.setItem('managementId',id)
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Management User</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-800 text-white">
              <th className="w-1/4 py-2">Name</th>
              <th className="w-1/4 py-2">Email</th>
              <th className="w-1/4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {/* Add any actions here, e.g., Edit, Delete */}
                  {/* <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button> */}
                  <button className="bg-green-500 text-white px-2 py-1 rounded ml-2" onClick={(e)=>resetHandler(user._id)}>Reset Password</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementUser;
