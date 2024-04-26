// import React, {useState} from 'react'
// // import '../login.css';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar.js';

// export const Register = () => {
//   const {price} = useParams()
//     const [formData, setFormData] = useState({
//         firstname : '',
//         lastname : '', 
//         username : '',
//         password : '',
//     })
//     const handleChange = (event) => {
//         const { name, value } = event.target
//         setFormData({...formData, [name]: value })
//         console.log(name, value)
//     }
//     const handleSubmit = (event) => {
//         event.preventDefault()
//         console.log(formData);
//         const Register ={
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             username: formData.username,
//             password: formData.password
//         }
//         fetch(`http://localhost:8080/register`, {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             method: 'POST',
//             body: JSON.stringify(Register)
//          })
//          .then((response)=>{
//             console.log("Data Received" + response);
//           })
//         }
//   return (
//   <>
//       <div style={{ 
//       backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
//       backgroundPosition: 'center',
//       backgroundSize: 'cover', // This ensures the image covers the entire background
//       backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
//     }}> 
//     <Navbar />
// <div className='login-page'>
//     <div className='form'>
//       <div className='login'>
//         <div className='login-header' style={{fontFamily:'Cambria'}}>
//           <h3>Register</h3>
//           {/* <p>Please enter your credentials to login</p> */}
//         </div>
//       </div>
//      <form className='' onSubmit={handleSubmit}>
//      <div className=''>
//     <label className='' style={{fontFamily:'Cambria'}}>Firstname</label>
//     <input className='form-control form-control-sm' type="text" name="firstname" value={formData.firstname} onChange={handleChange}></input>
//     </div>  
//     <div className=''>
//     <label className='' style={{fontFamily:'Cambria'}}>Lastname</label>
//     <input className='' type="text" name="lastname" value={formData.lastname} onChange={handleChange}></input>
//     </div> 
//     <div className=''>
//     <label className='' style={{fontFamily:'Cambria'}}>Username</label>
//     <input className='' type="text" name="username" value={formData.username} onChange={handleChange}></input>
//     </div>
//     <div className=''>
//     <label className='' style={{fontFamily:'Cambria'}}>password</label>
//     <input className='' type="password" name="password" value={formData.marks} onChange={handleChange}></input>
//     </div>
//      <Link to=''><button className='message'>Submit</button></Link>
//     <div className='text-decoration-none'><Link to ={`/login/${price}`}>Already have an Accout?</Link></div> 
// </form>
// </div>
// </div>
// </div>
// </>
//   );

// }
// export default Register


import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../components/Register.css'
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log(response.data.message);
      // Redirect or perform actions upon successful registration
    } catch (error) {
      console.error(error.response.data.error);
      // Handle registration error
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
      backgroundPosition: 'center',
      backgroundSize: 'cover', // This ensures the image covers the entire background
      backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
    }}> 
<Navbar />
<br></br>   <br></br>
       <div className="login-page container mt-3 p-5 w-50">
      <div className="form">
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
          <button type="submit">Register</button>
          <Link to='/login' style={{textDecoration:'none'}}>Already have an account</Link>
        </form>
      </div>
    </div>
      </div>
      
  );
}

export default Register;
