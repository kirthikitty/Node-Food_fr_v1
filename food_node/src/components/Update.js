import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateMenuItemForm = () => {
    const { menuItemId } = useParams();
    console.log("Get", menuItemId);
    const [menuname, setMenuname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/menuitem/${menuItemId}`);
                const { menuname, description, price, image, category } = response.data;
                setMenuname(menuname);
                setDescription(description);
                setPrice(price);
                setImage(image);
                setCategory(category);
            } catch (error) {
                console.error('Error fetching menu item details:', error);
            }
        };

        fetchMenuItem();
    }, [menuItemId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('menuname', menuname);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            if (image) {
                formData.append('uploaded_file', image);
            }

            const response = await axios.put(`http://localhost:8080/menuitem/${menuItemId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Handle success message or redirection here
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={menuname} onChange={(e) => setMenuname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    );
};

export default UpdateMenuItemForm;
