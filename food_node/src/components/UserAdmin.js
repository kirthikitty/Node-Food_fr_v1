import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [error, setError] = useState(null);

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

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const userToEdit = users.find(user => user._id === userId);
    setEditData({
      firstname: userToEdit.firstname,
      lastname: userToEdit.lastname,
      username: userToEdit.username,
      password: userToEdit.password
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/users/${editUserId}`;
      console.log('Request URL:', url);
      console.log('Request Data:', editData);
      const response = await axios.put(url, editData);
      console.log('Response:', response.data);
      fetchUsers();
      setIsEditing(false);
      setEditData({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      });
      setError(null);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.status === 404) {
        setError('User not found');
      } else {
        setError(error.response.data.error || 'Error updating user');
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      {/* <h2 className="text-center mb-4">User List</h2> */}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Actions</th>
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
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(user._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="mt-3">
          <h3>Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input type="text" className="form-control" id="firstname" name="firstname" value={editData.firstname} onChange={handleEditChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" className="form-control" id="lastname" name="lastname" value={editData.lastname} onChange={handleEditChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={editData.username} onChange={handleEditChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={editData.password} onChange={handleEditChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminUserList;
