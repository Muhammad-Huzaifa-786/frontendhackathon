import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('adminsign/login', formData);
            localStorage.setItem('token', data.token); // Save JWT to localStorage
            alert('Login successful');
            localStorage.setItem('isLoggedInAdmin', 'true');
            localStorage.setItem('isLoggedInUserAdmin',formData.email);
            navigate('/admin'); // Redirect to a dashboard or homepage
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
            return
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
            <p>No Account Yet ? <a href="/admin/signup">Sign up</a></p>
        </form>
    );
};

export default Login;
