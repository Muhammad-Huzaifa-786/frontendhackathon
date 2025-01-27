import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../Functions/Url';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './Userpage.css'; // Import a CSS file for styles
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Userpage = () => {
    const params = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        cnic: '',
    });
    const [guarantors, setGuarantors] = useState([{
        email: '',
        cnic: '',
        phone: '',
    }]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(params.id);
    }, [params.id]);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/auth/user/${userId}`);
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BaseUrl}/api/auth/user/${userId}`);
            const fetchedUser = response.data.user;
            if (password === confirmPassword && password === fetchedUser.password) {
                setIsPasswordConfirmed(true);
                localStorage.setItem('isLoggedInUser', 'true');
                localStorage.setItem('isLoggedInUserEmail', fetchedUser.email);
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Password!',
                });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleGuarantorChange = (index, e) => {
        const { name, value } = e.target;
        const newGuarantors = [...guarantors];
        newGuarantors[index][name] = value;
        setGuarantors(newGuarantors);
    };

    const addGuarantor = () => {
        setGuarantors([...guarantors, { email: '', cnic: '', phone: '' }]);
    };
    const handleGuarantorSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${BaseUrl}/api/auth/userUpdate/${userId}`, { guarantors });
            console.log('Guarantors updated successfully:', response.data);
            MySwal.fire('Saved!', 'Your record has been saver.', 'success')
            localStorage.setItem('userid', userId);
            setGuarantors([]);

            navigate(`/userdashboard/${localStorage.getItem('isLoggedInUserEmail')}`);
            // Optionally, reset the form or show a success message
        } catch (error) {
            console.error('Error updating guarantors:', error);
            // Optionally, show an error message to the user
        }
    };


    return (
        <div className="userpage-container">
            {!isPasswordConfirmed ? (
                <form className="form-container" onSubmit={handlePasswordSubmit}>
                    <h1>Set Your Password</h1>
                    <div className="form-group">
                        <label>Password:</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className='btneye' type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? '❌' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Re-enter Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button className='btneye' type="button" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? '❌' : ' 👁️'}
                            </button>
                        </div>
                    </div>
                    <button className='add-button' type="submit">Submit</button>
                </form>

            ) : (
                <>
                    <h1>User Registration</h1>
                    <h2>User Details</h2>
                    <div className="user-details">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>CNIC:</strong> {userData.cnic}</p>
                    </div>

                    <h2>Guarantor Details</h2>
                    <form className="form-container" onSubmit={handleGuarantorSubmit}>
                        {guarantors.map((guarantor, index) => (
                            <div key={index} className="guarantor-form">
                                <h3>Guarantor {index + 1}</h3>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='example@gmail.com'
                                        value={guarantor.email}
                                        onChange={(e) => handleGuarantorChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CNIC:</label>
                                    <input
                                        type="text"
                                        name="cnic"
                                        placeholder='42301-12345678'
                                        value={guarantor.cnic}
                                        onChange={(e) => handleGuarantorChange(index, e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder='0300-1234567'
                                        value={guarantor.phone}
                                        onChange={(e) => handleGuarantorChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addGuarantor}>Add Guarantor</button>
                        <br /><button className="add-button" type="submit">Submit Guarantors</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Userpage;
