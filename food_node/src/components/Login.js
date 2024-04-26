// import React, {useState} from 'react'
// import { Link, useParams} from 'react-router-dom'
// // import '../Sign.js/login.css'
// import Navbar from '../components/Navbar'

// export const Login = () => {
//   const {price} = useParams()
//     const [formData, setFormData] = useState({
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
//         // const Register ={
//         //     username: formData.username,
//         //     password: formData.password
//         // }
//         fetch(`http://localhost:8080/login?username=${formData.username}&password=${formData.password}`)    
//          .then((response)=>{
//             if(!response.ok) {
//               throw new Error("Failed to fetch data");
//             }
//            return response.json();
//           })
//           .then((data) => {
//             if(data === !formData.username && data === !formData.password) {
//                 return alert("Enter Valid Details");
//             }else{
//                 console.log("Data",data)
//                 setFormData(data  )
//             }
//           })
//           .catch((error) =>{
//             console.error("Error During fetch", error);
//           })
//         }
//   return (
//  <div>
//     <Navbar />
//     <div className='' style={{ 
//       backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
//       backgroundPosition: 'center',
//       backgroundSize: 'cover', // This ensures the image covers the entire background
//       backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
//     }}> 
//     <div className='container p-0'>
//     {Array.isArray(formData) && formData.map((formData) =>(
//         <div className='card' key={formData.id}>
//             {/* <h1 className='welcome'>Welcome{formData.firstName}{formData.lastName}</h1> */}
//         </div>
//     ))}
// </div>
//   <div className='login-page'>
//     <div className='form'>
//       <div className='login'>
//         <div className='login-header'>
//           <h3>LOGIN</h3>
//           <p>Please enter your credentials to login</p>
//         </div>
//       </div>
//  <form  className='login-form' onSubmit={handleSubmit}>
//     <label>Username</label>
//     <input type="text" name="username" value={formData.username} onChange={handleChange}></input><br></br>
//     <label>password</label>
//     <input type="password" name="password" value={formData.password} onChange={handleChange}></input><br></br>

//    <Link to={`/payment/${price}`}><button>Login</button></Link> 
//   <p className='message'><Link to ={`/register/${price}`}>Create New Accout</Link></p>
// </form>
//     </div>
   

// </div>  
// </div>
// </div>
//   );

// }
// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.js'
import '../components/Register.css'

function Login() {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:8080/login', formData);
      console.log(response.data.token);
      // Redirect or perform actions upon successful login
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
    </div>
    </div>
    </div>
  );
}

export default Login;

