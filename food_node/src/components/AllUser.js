import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.js';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon

export const AllUser = () => {
  const [menuItems, setmenuItems] = useState([]);
  const [categories, setCategories] = useState([ 'Veg', 'Desserts', 'Non-Veg']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [setFurniture, setSelectedFurniture] = useState('');
  const userId = sessionStorage.getItem('userId');

  const handleSelectChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    handleSubmit(category);
  };

  const handleSubmit = (category) => {
    let url = `http://localhost:8080/menuitem`;
    if (category) {
      url += `/${category}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedFurniture(data);
      })
      .catch((error) => {
        console.error("Error during fetch", error);
      });
  };

  useEffect(() => {
    handleSubmit(selectedCategory);
  }, [selectedCategory]);

  const CartSend = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/addcart', {
        userId: userId,
        menuItemId: formData,
        quantity: 1
      });
      alert("Product added to cart successfully..!");
      // Redirect to add to cart page after successful addition to cart
      window.location.href = "/"; // Replace "/add-to-cart" with your actual route
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div> 
      <Navbar />
      <br /><br />
      <div className="container mt-4">
        {/* Cart icon with Link to AddToCart page */}
        <Link to="/addtocart" style={{ float: 'right', marginRight: '10px' }}>
          <FaShoppingCart style={{ fontSize: '24px', cursor: 'pointer' }} />
        </Link>
        {/* Dropdown menu for categories */}
        <div className="row">
          <div className="col-md-6">
            {/* Custom styled select dropdown */}
            <div className="custom-select" style={customSelectStyle}>
              <select id="category" value={selectedCategory} onChange={handleSelectChange} style={selectStyle}>
                <option value="">All</option>
                {categories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
              <span className="custom-arrow" style={arrowStyle}></span> {/* Custom arrow */}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          {/* Render menu items based on selected category */}
          {Array.isArray(setFurniture) && setFurniture.map((menuitem, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3" style={{ animation: `fadeIn 0.5s ${index * 0.1}s ease-in-out forwards` }}>
              <div className="card card-body-hover" style={menuItemStyle}>
                <img src={`http://localhost:8080/public/data/uploads/${menuitem.image}`} className="card-img-top card-body-hover" alt={menuitem.menuname} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body card-body-hover">
                  <h6 className="card-title" style={{ fontSize: '1rem' }}>{menuitem.menuname}</h6>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>{menuitem.description}</p>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>Price: ${menuitem.price}</p>
                  {userId ? (
                    <button onClick={() => CartSend(menuitem._id)} style={{ borderRadius: '10px', padding: '5px', width: '100%' }}>Add to Cart</button>
                  ) : (
                    <Link to={`/login`}><button style={{ borderRadius: '10px', padding: '5px', width: '100%' }}>Login to Add to Cart</button></Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUser;

// Inline styles for custom dropdown
const customSelectStyle = {
  position: 'relative',
};

const selectStyle = {
  display: 'inline-block',
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '10px', // Increase border radius here
  backgroundColor: '#fff',
  appearance: 'none',
};

const menuItemStyle = {
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
  borderRadius: '10px', // Increase border radius here
};
const arrowStyle = {
  position: 'absolute',
  top: '50%',
  right: '10px',
  transform: 'translateY(-50%)',
  width: '0',
  height: '0',
  borderStyle: 'solid',
  borderWidth: '5px 5px 0 5px',
  borderColor: '#555 transparent transparent transparent',
};
// // CSS animation for fade-in effect
const fadeInKeyframes = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;


// Insert the CSS animation keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
