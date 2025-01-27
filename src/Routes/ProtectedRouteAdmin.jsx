import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = () => {
    const token = localStorage.getItem('isLoggedInUserAdmin'); // Get token from local storage
    return token ? <Outlet /> : <Navigate to="/" />; // If token exists, allow access
};

export default ProtectedRouteAdmin;
