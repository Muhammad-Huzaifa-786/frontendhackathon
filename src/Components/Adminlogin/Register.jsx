import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Register.css'; // Import the CSS file

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('adminsign/signup', formData);
            alert(data.message);
            navigate('/admin/confirm', { state: { email: formData.email } });

        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
            <p>Already have an account? <a href="/admin/login">Signin</a></p>
        </form>
    );
};

export default Register;
