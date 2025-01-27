import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouteUser = () => {
    const token = localStorage.getItem('isLoggedInUserEmail'); // Get token from local storage
    return token ? <Outlet /> : <Navigate to="/" />; // If token exists, allow access
};
export default ProtectedRouteUser;
