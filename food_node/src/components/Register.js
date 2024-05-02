import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../components/Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    addressData: {
      doorno: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('addressData')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        addressData: {
          ...formData.addressData,
          [addressField]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log(response.data.message);
      setRegistrationSuccess(true); // Set registration success to true
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}> 
      <Navbar />
      <br />
      <br />
      <div className="login-page container mt-3 p-5 w-50">
        <div className="form">
          {registrationSuccess ? ( // Conditionally render welcome message if registration is successful
            <div>
              <h2>Welcome, {formData.username}.!!!</h2>
              <p>Thank you for registering.
                Welcome To Fresh Eats,
                Spice your day with us...
              </p>
            </div>
          ) : (
            <div>
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Door No:</label>
                  <input
                    type="text"
                    name="addressData.doorno"
                    value={formData.addressData.doorno}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Street:</label>
                  <input
                    type="text"
                    name="addressData.street"
                    value={formData.addressData.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    name="addressData.city"
                    value={formData.addressData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>State:</label>
                  <input
                    type="text"
                    name="addressData.state"
                    value={formData.addressData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode:</label>
                  <input
                    type="text"
                    name="addressData.pincode"
                    value={formData.addressData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Register</button>
                <Link to='/login' style={{ textDecoration: 'none' }}>Already have an account</Link>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
