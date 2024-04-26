// AddToCart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AddToCart = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/menuitem/findall');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const addToCart = async (menuItem) => {
    try {
      const response = await axios.post('http://localhost:8080/add', menuItem);
      console.log('Item added to cart:', response.data);
      // Optionally, you can show a confirmation message or update the UI to reflect the item added to the cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {menuItems.map(menuItem => (
            <div key={menuItem._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
              <div className="card">
                <img src={`http://localhost:8080/public/data/uploads/${menuItem.image}`} className="card-img-top" alt={menuItem.menuname} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h6 className="card-title" style={{ fontSize: '1rem' }}>{menuItem.menuname}</h6>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>{menuItem.description}</p>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>Price: ${menuItem.price}</p>
                  <button className="btn btn-success btn-sm" onClick={() => addToCart(menuItem)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
