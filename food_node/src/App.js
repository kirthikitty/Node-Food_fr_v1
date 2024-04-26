
import './App.css';
import AllUser from './components/AllUser';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login.js';
import Register from './components/Register'
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Admin from './components/Admin.js';
// import Delete from './components/Delete.js';
import Addproduct from './components/Addproduct.js';
import Update from './components/Update.js'
import Contact from './components/Contact.js'
import AddToCart from './components/AddToCart.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<AllUser />} />
      <Route path='/add' element={<Addproduct />}></Route>
      <Route path="/nav" element={<Navbar />} />
      <Route path = "/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/footer" element={<Footer />}></Route>
      {/* <Route path="/delete" element={<Delete />}></Route> */}
      <Route path="/update/:menuItemId" element={<Update />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/addtocart' element={<AddToCart />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
