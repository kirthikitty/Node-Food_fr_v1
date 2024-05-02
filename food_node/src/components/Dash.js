import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Admin from '../components/Admin';
import UserAdmin from '../components/UserAdmin';
import Addproduct from '../components/Addproduct';

function AdminDashboard({ isLoggedIn, handleLogout }) {
  // State to track admin login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isLoggedIn);

  // Function to handle admin logout
  const handleAdminLogout = () => {
    // Perform logout actions (clear session, redirect, etc.)
    setIsAdminLoggedIn(false);
    handleLogout(); // Call the parent component's logout handler
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Menu Item List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-connect-tab" data-bs-toggle="tab" href="#nav-connect" role="tab" aria-controls="nav-connect" aria-selected="false">Add Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="nav-connect1-tab" data-bs-toggle="tab" href="#nav-connect1" role="tab" aria-controls="nav-connect1" aria-selected="false">Accounts</a>
            </li>
            {isAdminLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link btn btn-danger" onClick={handleAdminLogout}>Logout</button>
              </li>
            ) : null}
          </ul>
          <div className="tab-content mt-3" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <UserAdmin />
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <Admin />
            </div>
            <div className="tab-pane fade" id="nav-connect" role="tabpanel" aria-labelledby="nav-connect-tab">
              <Addproduct />
            </div>
            <div className="tab-pane fade" id="nav-connect1" role="tabpanel" aria-labelledby="nav-connect1-tab">
              <div className="text-center">
                <h4>Welcome, Admin</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
