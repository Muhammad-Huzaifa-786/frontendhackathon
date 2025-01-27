import React, { useEffect, useState } from 'react';
import API from '../api';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmToken = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the POST request to confirm the token
            const { data } = await API.post(`adminsign/confirm-token/${email}`, { token });
            // Set the message received from the API
            setMessage(data.message);
            setError(''); // Clear any previous error
            navigate('/admin/login'); // Redirect to a dashboard or homepage

        } catch (err) {
            // Handle error properly, accessing the error message from the response
            setError(err.response?.data?.error || 'Something went wrong');
            setMessage(''); // Clear any previous message
        }
    };

    return (
        <div>
            <h2>Confirm Token</h2>
            <form onSubmit={handleSubmit}>
                <div>
            <label>  Check Email : {email || 'No email provided'}</label>
                    <input
                        type="text"
                        placeholder='Token'
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm Token</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ConfirmToken;
