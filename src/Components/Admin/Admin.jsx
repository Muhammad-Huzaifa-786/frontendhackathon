import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../Functions/Url'; // Adjust the import based on your file structure
import './Admin.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MySwal = withReactContent(Swal);

function Admin() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [user, setUser] = useState(null); // Initialize as null
    const [filter, setFilter] = useState('');
    const [loanTypeFilter, setLoanTypeFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [loanAmountLessThan, setLoanAmountLessThan] = useState('');
    const [loanAmountGreaterThan, setLoanAmountGreaterThan] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const navigate = useNavigate();

    const setModalOfView = (user) => {
        setUser(user);
        setModalState(true);
    };

    const onClose = () => {
        setModalState(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/admin/get`);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleAcceptUser = async (e, userId) => {
        e.stopPropagation();
        try {
            const response = await axios.patch(`${BaseUrl}/admin/user/${userId}/accept`);
            setUsers(users.map(user => user._id === userId ? response.data : user));
            MySwal.fire('Saved!', 'You have accepted the user.', 'success');
        } catch (error) {
            console.error('Error accepting user:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        applyFilters(e.target.value, loanTypeFilter, emailFilter);
    };

    const handleLoanTypeChange = (e) => {
        setLoanTypeFilter(e.target.value);
        applyFilters(filter, e.target.value, emailFilter);
    };

    const applyFilters = (status, loanType, email) => {
        let updatedUsers = [...users];

        if (status === 'accepted') {
            updatedUsers = updatedUsers.filter(user => user.AdminAccept);
        } else if (status === 'not-accepted') {
            updatedUsers = updatedUsers.filter(user => !user.AdminAccept);
        }

        if (loanType) {
            updatedUsers = updatedUsers.filter(user => user.loanType === loanType);
        }

        if (email) {
            updatedUsers = updatedUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
        }

        if (loanAmountLessThan) {
            updatedUsers = updatedUsers.filter(user => user.loanAmount < Number(loanAmountLessThan));
        }

        if (loanAmountGreaterThan) {
            updatedUsers = updatedUsers.filter(user => user.loanAmount > Number(loanAmountGreaterThan));
        }

        if (startDate) {
            updatedUsers = updatedUsers.filter(user => dayjs(user.createdAt).isAfter(startDate));
        }

        if (endDate) {
            updatedUsers = updatedUsers.filter(user => dayjs(user.createdAt).isBefore(endDate));
        }

        setFilteredUsers(updatedUsers);
    };

    const resetFilters = () => {
        setFilter('');
        setLoanTypeFilter('');
        setEmailFilter('');
        setLoanAmountLessThan('');
        setLoanAmountGreaterThan('');
        setStartDate(null);
        setEndDate(null);
        setFilteredUsers(users);
    };

    return (
        <div className="admin-container">
            <nav id='navbaradmincode' className="navbar">
                <h1>Admin Dashboard</h1>
                <button id='adminbtndash' onClick={() => navigate(`/`)}>Back</button>
            </nav>

            <div className="filter-container">
                <div>
                    <label htmlFor="filter">Filter Users by Acceptance: </label>
                    <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="">All Users</option>
                        <option value="accepted">Accepted Users</option>
                        <option value="not-accepted">Not Accepted Users</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="loanType">Filter Users by Loan Type: </label>
                    <select id="loanType" value={loanTypeFilter} onChange={handleLoanTypeChange}>
                        <option value="">All Loan Types</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Home">Home</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="emailFilter">Filter Users by Email: </label>
                    <input
                        type="text"
                        id="emailFilter"
                        value={emailFilter}
                        onChange={e => {
                            setEmailFilter(e.target.value);
                            applyFilters(filter, loanTypeFilter, e.target.value);
                        }}
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <label htmlFor="loanAmountLessThan">Loan Amount Less Than:</label>
                    <input
                        type="number"
                        id="loanAmountLessThan"
                        value={loanAmountLessThan}
                        onChange={e => {
                            setLoanAmountLessThan(e.target.value);
                            applyFilters(filter, loanTypeFilter, emailFilter);
                        }}
                        placeholder="Less Than"
                    />
                </div>
                <div>
                    <label htmlFor="loanAmountGreaterThan">Loan Amount Greater Than:</label>
                    <input
                        type="number"
                        id="loanAmountGreaterThan"
                        value={loanAmountGreaterThan}
                        onChange={e => {
                            setLoanAmountGreaterThan(e.target.value);
                            applyFilters(filter, loanTypeFilter, emailFilter);
                        }}
                        placeholder="Greater Than"
                    />
                </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            className='datePickerAdmin'
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                    applyFilters(filter, loanTypeFilter, emailFilter);
                                }}
                            />
                            <DatePicker
                            className='datePickerAdmin'
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                    applyFilters(filter, loanTypeFilter, emailFilter);
                                }}
                            />
                    </LocalizationProvider>
            </div>
            <button id='restebtnAdmin' onClick={resetFilters}>Reset</button>

            {modalState && user && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>User Details</h2>
                        <div className="modal-item"><strong>ID:</strong> <span>{user._id}</span></div><hr />
                        <div className="modal-item"><strong>Name:</strong> <span>{user.name}</span></div><hr />
                        <div className="modal-item"><strong>Email:</strong> <span>{user.email}</span></div><hr />
                        <div className="modal-item"><strong>CNIC:</strong> <span>{user.cnic}</span></div><hr />
                        <div className="modal-item"><strong>City:</strong> <span>{user.city || 'no mentioned'}</span></div><hr />
                        <div className="modal-item"><strong>Gender:</strong> <span>{user.gender}</span></div><hr />
                        <div className="modal-item"><strong>Loan Amount:</strong> <span>{user.loanAmount}</span></div><hr />
                        <div className="modal-item"><strong>Average Monthly Payment:</strong> <span>{Math.floor(user.loanAmount / user.returnTime)}</span></div><hr />
                        <div className="modal-item"><strong>Return Time:</strong> <span>{user.returnTime} months</span></div><hr />
                        <div className="modal-item"><strong>Created At:</strong> <span>{new Date(user.createdAt).toLocaleString()}</span></div><hr />
                        <div className="modal-item"><strong>Updated At:</strong> <span>{new Date(user.updatedAt).toLocaleString()}</span></div><hr />
                        <div className="modal-item"><strong>Admin Accepted:</strong> <span>{user.AdminAccept ? "Yes" : "No"}</span></div><hr />
                        <h3>Guarantors:</h3>
                        <ul>
                            {user.guarantors.map(guarantor => (
                                <li key={guarantor._id}>
                                    {guarantor.email} (CNIC: {guarantor.cnic})
                                </li>
                            ))}
                        </ul>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            )}

            <div className="table-container">
                {filteredUsers.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>CNIC</th>
                                <th>City</th>
                                <th>Loan Amount</th>
                                <th>Monthly Average</th>
                                <th>Return Duration</th>
                                <th>Guarantors</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr onClick={() => setModalOfView(user)} key={user._id}>
                                    <td>{user.loanType || 'No'}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.cnic}</td>
                                    <td>{user.city || "no"}</td>
                                    <td>{user.loanAmount}</td>
                                    <td>{Math.floor(user.loanAmount / user.returnTime)}</td>
                                    <td>{user.returnTime}</td>
                                    <td>
                                        <ul className="guarantor-list">
                                            {user.guarantors.map(guarantor => (
                                                <li key={guarantor._id}>
                                                    {guarantor.email} (CNIC: {guarantor.cnic})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button className='view' onClick={() => setModalOfView(user)}>View</button>
                                        {user.AdminAccept ? (
                                            <button className='already' disabled>
                                                Already
                                            </button>
                                        ) : (
                                            <button className='accept' onClick={(e) => handleAcceptUser(e, user._id)}>
                                                Accept
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Admin;
