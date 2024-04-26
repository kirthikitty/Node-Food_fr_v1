import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar.js';

export const Admin = () => {
  const [menuitems, setmenuitems] = useState([]);
  

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/menuitem/findAll');
      setmenuitems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  const deleteItem = async (_id) => {
    console.log(_id)
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;
    try {
      await axios.delete(`http://localhost:8080/deleteproduct/${_id}`);
      fetchItems(); 
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };
  

  return (
    <div className='' style={{ 
      backgroundImage: "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
      backgroundPosition: 'center',
      backgroundSize: 'cover', // This ensures the image covers the entire background
      backgroundRepeat: 'no-repeat' // This ensures the image is not repeated
    }}>
      <Navbar />
      <br></br><br></br>
      <h1 className='text-center'>Admin Page</h1>
      <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
        <Link className="btn btn-center btn-primary addpro" to="/add">Add Product</Link>
      </div> <br></br>
      <table className="table table-hover table-bordered border-success container" >
        <thead>
          <tr className=''>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            {/* <th scope="col">Menu-Item</th> */}
            <th scope="col">Image</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {menuitems.map(menuitem => (
            <tr key={menuitem._id} >
              <td >{menuitem._id}</td>
              <td>{menuitem.menuname}</td>
              <td>{menuitem.description}</td>
              <td>{menuitem.price}</td>
              {/* <td>{menuItem.menuItem}</td> */}
              <td> <img src={`http://localhost:8080/public/data/uploads/${menuitem.image}`} alt={menuitem.name} style={{ width: '100px', height: 'auto' }} /></td>
              <td>
                <Link className='btn btn-outline-success' to={`/update/${menuitem._id}`}>Edit</Link>
              </td>
              <td>
            <button className='btn btn-outline-danger' onClick={() => deleteItem(menuitem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default Admin;
