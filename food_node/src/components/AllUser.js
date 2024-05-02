import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.js';

export const AllUser = () => {
  const [menuItems, setmenuItems] = useState([]);
  const [categories, setCategories] = useState(['Appetizers', 'Main Course', 'Desserts', 'Cake']);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [setFurniture, setSelectedFurniture] = useState('');

  const handleSelectChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    console.log("sUBMIT", category)
    // Call handleSubmit immediately when the category changes
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
        console.log(data);
        setSelectedFurniture(data);
      })
      .catch((error) => {
        console.error("Error during fetch", error);
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    handleSubmit(selectedCategory);
  }, [selectedCategory]); // Call useEffect whenever selectedCategory changes

  return (
    <div> 
      <Navbar />
      <br /><br />
      <div className="container mt-4">
        {/* Dropdown menu for categories */}
        <div className="row">
          <div className="col-md-6">
            {/* Custom styled select dropdown */}
            <div className="custom-select" style={customSelectStyle}>
              <select id="category" value={selectedCategory} onChange={handleSelectChange} style={selectStyle}>
                <option value="">All</option>
                <option>Desserts</option>
                <option>Veg</option>
                <option>Non-Veg</option>
              </select>
              <span className="custom-arrow" style={arrowStyle}></span> {/* Custom arrow */}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          {/* Render menu items based on selected category */}
         {Array.isArray(setFurniture)&& setFurniture.map((menuitem,index)=> (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3" style={{ animation: `fadeIn 0.5s ${index * 0.1}s ease-in-out forwards` }}>
              <div className="card card-body-hover" style={menuItemStyle}>
                <img src={`http://localhost:8080/public/data/uploads/${menuitem.image}`} className="card-img-top card-body-hover" alt={menuitem.menuname} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body card-body-hover">
                  <h6 className="card-title" style={{ fontSize: '1rem' }}>{menuitem.menuname}</h6>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>{menuitem.description}</p>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>Price: ${menuitem.price}</p>
                  <button className='btn btn-success'>Add to Cart </button>
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
  borderRadius: '5px',
  backgroundColor: '#fff',
  appearance: 'none', /* Remove default arrow */
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

const menuItemStyle = {
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
};

// CSS animation for fade-in effect
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
