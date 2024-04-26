import React from 'react'
import '../components/Contact.css'
import Navbar from '../components/Navbar.js'
import { Link } from "react-router-dom";
import '../components/About.css'

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('submited')
    const { name, email, phonenumber, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
      phonenumber: phonenumber.value
    }
    console.log(conFom)
    alert("Submitted")
  }
  return (
      <div style={{ 
        backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
        backgroundPosition: 'center',
        backgroundSize: 'cover', // This ensures the image covers the entire background
        backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
      }}> 
 <Navbar />
     <div class="container mt-3 p-5 w-50" >
    <div class="">
      <div class="card-body">
        <form onSubmit={onSubmit}>
            <div class='form'>
          <div class="mb-2 w-5">
            <label class="form-label" style={{ marginBottom: '5px', display: 'block', color: '#333',fontFamily:'Cambria' }} htmlFor="name">Name</label>
            <input class="form-control" type="text" id="name" required />
          </div>
          <div class="mb-2">
            <label class="form-label" style={{ marginBottom: '5px', display: 'block', color: '#333' ,fontFamily:'Cambria'}}  htmlFor="email">Email</label>
            <input class="form-control" type="email" id="email" required />
          </div>
          <div class="mb-2">
            <label class="form-label" style={{ marginBottom: '5px', display: 'block', color: '#333' ,fontFamily:'Cambria'}}  htmlFor="Phonenumber">Phone Number</label>
            <input class="form-control" type="number" id="number" required />
          </div>
          <div class="mb-2">
            <label class="form-label" style={{ marginBottom: '5px', display: 'block', color: '#333',fontFamily:'Cambria'}} htmlFor="message">Message</label>
            <textarea class="form-control" id="message" required></textarea>
          </div>
        <Link to='/'><button class="btn btn-danger" type="submit">{formStatus}</button></Link> 
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
  )
}
export default ContactForm