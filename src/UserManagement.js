import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        position: '',
        idNumber: '',
        phoneNumber: ''
         // New field for position
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
       
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
            const response = await axios.post('http://localhost:8085/api/Users', {
                username: formData.username,
                password: formData.password, 
                position: formData.position,
                idNumber: formData.idNumber,
                phoneNumber: formData.phoneNumber,
                
            });
            alert('User added successfully: ' + response.data.username);
            setFormData({ username: '', password: '', idNumber: '', phoneNumber: '', position: '' }); // Reset form
        } catch (error) {
            console.error(error);
            alert('Error adding user: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <section>
            <h2>Manage Users</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                {errors.username && <span className="error-message">{errors.username}</span>}

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                {errors.password && <span className="error-message">{errors.password}</span>}

                {/* New position input field */}
                <input 
                    type="text" 
                    name="position" 
                    placeholder="Position" 
                    value={formData.position} 
                    onChange={handleChange} 
                />
                {errors.position && <span className="error-message">{errors.position}</span>}

                <input 
                    type="text" 
                    name="idNumber" 
                    placeholder="ID Number" 
                    value={formData.idNumber} 
                    onChange={handleChange} 
                />
                {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}

                <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}

                <button type="submit">Add User</button>
            </form>
        </section>
    );
};

export default UserManagement;
