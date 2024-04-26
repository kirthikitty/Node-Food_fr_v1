
import { useState } from "react";

const AddProduct = ({ handleAddProduct }) => {
  const [menuname, setMenuName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State for image file
  const [error, setError] = useState('');

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!menuname || !description || !price || !image) {
        setError('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('menuname', menuname);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('uploaded_file', image); // Key should match backend

      const response = await fetch('http://localhost:8080/menuitem/addmenu', {
        method: 'POST',
        body: formData,
      });
     
      if (response.ok) {
        setError('');
        if (typeof handleAddProduct === 'function') {
          handleAddProduct(); 
        }
        // Clear the form fields
        setMenuName('');
        setDescription('');
        setPrice('');
        setImage(null);
        alert('Product added successfully');
      } else {
        const text = await response.text(); 
        setError(text || 'Error adding product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product.');
    }
  };

  return (
    <div className="container mt-4 " style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Add Product</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Form fields */}
            <div className="mb-3">
              <label htmlFor="menuname" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="menuname"
                name="menuname"
                value={menuname}
                onChange={(e) => setMenuName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              {image && (
                <div>
                  <img src={URL.createObjectURL(image)} alt="MenuItem" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                  <button type="button" className="btn btn-danger" onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              <label className="form-label">Image Upload</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="uploaded_file"
                onChange={(e) => setImage(e.target.files[0])} 
                accept="image/*" 
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
