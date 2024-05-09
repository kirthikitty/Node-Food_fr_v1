import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const AddtoCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getcart/${userId}`);
      setCartItems(response.data.data.menuitems);
      calculateTotalPrice(response.data.data.menuitems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${userId}/${itemId}`); // Updated URL
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.menuitem.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  return (
    <div>
      <Navbar />
      <br /><br />
      <div className='container'>
        {cartItems.map((item) => (
          <div key={item._id} className='card mb-3'>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img src={`http://localhost:8080/public/data/uploads/${item.menuitem.image}`} alt={item.menuitem.menuname} style={{ width: '100%', height: '250px' }} />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>{item.menuitem.menuname}</h5>
                  <p className='card-text'>{item.menuitem.description}</p>
                  <p className='card-text'>Price: ${item.menuitem.price}</p>
                  <p className='card-text'>Quantity: {item.quantity}</p>
                  <button className='btn btn-primary me-2' onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                  <button className='btn btn-primary me-2' onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
  
        <div>
          <p>Total Price: ${totalPrice}</p>
        </div>
        <div>
          {totalPrice && ( // Check if totalPrice is not null before rendering the Payment button
            <Link to={`/payment/${totalPrice}`}>
              <button className='btn btn-success'>Payment</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddtoCart;
