import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Logins = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('usersign/login', formData);
            localStorage.setItem('token', data.token);
            console.log(data);
             // Save JWT to localStorage
            alert('Login successful');
            localStorage.setItem('isLoggedInUser', 'true');
            localStorage.setItem('isLoggedInUserEmail',formData.email);
            navigate(`/userdashboard/${formData.email}`);
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
            <p>No Account Yet ? <a href="/user/signup">Sign up</a></p>
        </form>
    );
};

export default Logins;
