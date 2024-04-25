// UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserManagement.css';
import DashboardLayout from './DashboardLayout';
import { error, success } from "../Utils/notification";
const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/users');
        setUsers(response.data.data); // Assuming the users array is inside the `data` property of the response
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  // Function to handle user deletion
  const deleteUser = async (id) => {
    try {
     let response= await axios.delete(`http://localhost:8080/user/deleteuser/${id}`);
      setUsers(users.filter(user => user._id !== id));
      if (response.data.status === "Failed") {
        error(response.data.message);
      } else {
        success(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <DashboardLayout>
    <div>
    <h2>User Management</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
          <th>Gender</th>
          <th>Booking Status</th>
          <th>Actions</th> {/* Add column for actions */}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td> {user.email} </td>
            <td> {user.password} </td>
            <td> {user.gender} </td>
            <td>  </td>
            <td>
              <button className="delete-button" onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </DashboardLayout>
);
};


export default UserManagement;
