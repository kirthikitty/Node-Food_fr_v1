import { useState } from "react";

const AddProduct = ({ handleAddProduct }) => {
  const [menuname, setMenuName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(''); // State for category
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!menuname || !description || !price || !image || !category) { // Check for category
        setError('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('menuname', menuname);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category); // Append category to formData
      formData.append('uploaded_file', image);

      const response = await fetch('http://localhost:8080/menuitem/addmenu', {
        method: 'POST',
        body: formData,
      });
     
      if (response.ok) {
        setError('');
        if (typeof handleAddProduct === 'function') {
          handleAddProduct(); 
        }
        setMenuName('');
        setDescription('');
        setPrice('');
        setCategory(''); // Reset category
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
    <div className="container mt-4" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#80bdff' }}>
      <div className="card" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '5px', backgroundColor: '#80bdff' }}>
        <div className="card-body" style={{ backgroundColor: '#fff' }}>
          <h5 className="card-title mb-4" style={{ color: '#007bff', borderBottom: '1px solid #007bff', paddingBottom: '10px' }}>Add Product</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Form fields */}
            <div className="mb-3">
              <label htmlFor="menuname" className="form-label" style={{ color: '#333' }}>Product Name</label>
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
              <label htmlFor="description" className="form-label" style={{ color: '#333' }}>Description</label>
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
              <label htmlFor="price" className="form-label" style={{ color: '#333' }}>Price</label>
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
              <label htmlFor="category" className="form-label" style={{ color: '#333' }}>Category</label>
              <select
                className="form-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{ width: '100%' }}
              >
                <option value="">Select Category</option>
                <option value="Desserts">Desserts</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
            <div className="mb-3">
              {image && (
                <div>
                  <img src={URL.createObjectURL(image)} alt="MenuItem" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                  <button type="button" className="btn btn-danger" onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              <label className="form-label" style={{ color: '#333' }}>Image Upload</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="uploaded_file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#28a745', border: 'none' }}>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
