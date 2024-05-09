  import React, { useState } from 'react';
  import axios from 'axios';
  import Navbar from '../components/Navbar.js'
  import '../components/Register.css'
  import { useNavigate } from 'react-router-dom';

  function Login() {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
    // const [loggedIn, setLoggedIn] = useState(false); // State to track login status
    const [username, setUsername] = useState(''); // State to store the username
    const navigate = useNavigate()

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/login', formData);
        console.log(response.data.token);
        // setUsername(formData.username); // Set the username upon successful login

        const userId = response.data.user._id;

        sessionStorage.setItem("userId", userId)
        console.log("Userid", userId)
        // setLoggedIn(true); // Set login status to true
        navigate("/")
      } catch (error) {
        console.error(error.response.data.error);
        // Handle login error
      }
    };

    return (
      <div>
        <Navbar />
      
      <div style={{ 
        backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
        backgroundPosition: 'center',
        backgroundSize: 'cover', // This ensures the image covers the entire background
        backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
      }}> 
          <br></br>   <br></br>
        <div className='login-page container mt-3 p-5 w-50'>
          <div className='form'>
        {/* {loggedIn ? (
          <div>
            <h2>Welcome back, {username}!</h2>
            <p>You are now logged in.</p>
          </div>
        ) : ( */}
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        {/* )} */}
      </div>
      </div>
      </div>
      </div>
    );
  }

  export default Login;
