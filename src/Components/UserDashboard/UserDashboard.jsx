import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../../Functions/Url';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDashboard.css'; // Optional: Import CSS for styling

const UserDashboard = () => {
    const { id } = useParams(); // Get the user ID from URL parameters
    const [userHistory, setUserHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/auth/gethistory/${id}`);
                console.log(response.data, "apiuser");
                setUserHistory(response.data.data); // Assuming the API response has a `data` field
            } catch (err) {
                console.error('Error fetching user history:', err);
                setError('Failed to fetch user history');
            } finally {
                setLoading(false);
            }
        };

        fetchUserHistory();
    }, [id]);

    return (
        <div>
            <nav id='userdashnavid'>
                <div>
                <h1>User Dashboard</h1>
                </div>
                <div>
                <button id='backuserdashid' onClick={() => { navigate('/') }}>Back</button>
                </div>
            </nav><br /><br />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="history-cards">
                {userHistory.map((user, index) => (
                    <div className="history-card" key={index}>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Loan Amount: {user.loanAmount}</p>
                        <p>Loan Type: {user.loanType}</p>
                        <p>Return Time: {user.returnTime} months</p>
                        <p>AdminAccept: {user.AdminAccept ? "Yes" : "No"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
