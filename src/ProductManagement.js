import React, { useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required";
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = "Valid quantity is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8085/api/Products', {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            });
            setSuccessMessage(`Product "${response.data.name}" added successfully!`); // Set success message

            // Save the new product to localStorage
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            storedProducts.push(response.data);  // Assuming the API returns the created product
            localStorage.setItem("products", JSON.stringify(storedProducts));

            // Reset form data
            setFormData({ name: '', description: '', category: '', price: '', quantity: '' });

            // Trigger a storage event to update the Dashboard
            window.dispatchEvent(new Event("storage"));
        } catch (error) {
            console.error(error);
            alert('Error adding product: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <section>
            <h2>Add Products</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
                
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Product Description" 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
                
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Product Category" 
                    required 
                    value={formData.category} 
                    onChange={handleChange} 
                />
                {errors.category && <span className="error-message">{errors.category}</span>}

                <input 
                    type="number" 
                    name="price" 
                    placeholder="Product Price" 
                    required 
                    value={formData.price} 
                    onChange={handleChange} 
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
                
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Product Quantity" 
                    required 
                    value={formData.quantity} 
                    onChange={handleChange} 
                />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}

                <button type="submit">Add Product</button>
            </form>

            {/* Display success message */}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </section>
    );
};

export default ProductManagement;
