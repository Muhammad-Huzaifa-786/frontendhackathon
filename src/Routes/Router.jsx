import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../Components/Welcome/Welcome'
import Userpage from '../Components/UserPage/Userpage'
import Admin from '../Components/Admin/Admin'
import UserDashboard from '../Components/UserDashboard/UserDashboard'
import Login from '../Components/Adminlogin/Login'
import Register from '../Components/Adminlogin/Register'
import ConfirmToken from '../Components/Adminlogin/ConfirmToken'
import Logins from '../Components/Userlogin/Logins'
import Registers from '../Components/Userlogin/Registers'
import ConfirmTokens from '../Components/Userlogin/ConfirmTokens'
import ProtectedRouteUser from './ProtectedRouteUser'
import ProtectedRouteAdmin from './ProtectedRouteAdmin'
import Footer from '../Components/Footer/Footer'
function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/user/:id' element={<Userpage />} />
                    <Route element={<ProtectedRouteAdmin />}>
                        <Route path='/admin' element={<Admin />} />
                    </Route>

                    <Route path='/admin/login' element={<Login />} />
                    <Route path='/admin/signup' element={<Register />} />
                    <Route path='/admin/confirm' element={<ConfirmToken />} />
                    <Route path='/user/login' element={<Logins />} />
                    <Route path='/user/signup' element={<Registers />} />
                    <Route path='/user/confirm' element={<ConfirmTokens />} />

                    <Route element={<ProtectedRouteUser />}>
                        <Route path='/userdashboard/:id' element={<UserDashboard />} />
                    </Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default Router