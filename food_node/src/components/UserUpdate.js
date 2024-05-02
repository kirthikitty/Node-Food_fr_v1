// AdminUserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = async (userId, newData) => {
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, newData);
      // After updating, fetch users again to update the list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Actions</th> {/* New column for edit and delete buttons */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>
                {user.address ? (
                  <>
                    {user.address.doorno} {user.address.street} {user.address.city} {user.address.state} {user.address.pincode}
                  </>
                ) : (
                  <>Address data not available</>
                )}
              </td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(user._id, { firstname: 'New First Name', lastname: 'New Last Name', username: 'New Username', password: 'New Password' })}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
