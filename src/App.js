import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import NavbarComponent from './views/components/Navbar/NavbarComponent';
import LoginForm from './views/components/Login/LoginForm';
import ForgotPassword from './views/components/ForgotPassword/forgotPassword';
import Home from './views/user/home/home';
import Signup from './views/components/Signup/Signup';
import Profile from './views/user/profile/Profile';
import HotelDetails from './views/user/home/hotels/hotelDetails';
import Admin from './views/admin/Admin';
import { isAuthed } from './views/routes/handleToken';
import { setUserIdRedux } from './views/redux/_actions/user.actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { message } from 'antd';
import useEffectOnce from './common/customHook/useEffectOne';
import { clearToken } from './api/axios';


function App() {
    const dispatch = useDispatch();
    const userRole = JSON.parse(localStorage.getItem("role"))

    const checkExpiredTokenNotify = () => {
        const _token = JSON.parse(localStorage.getItem("token"));
        if(_token && !isAuthed()){
            clearToken()
           return message.warning("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại ứng dụng")
        }
    }

    useEffectOnce(() => {
        checkExpiredTokenNotify()
    })

    useEffect(() => {
        if (!isAuthed()) {
            dispatch(setUserIdRedux(null))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed()])

    return (
        <BrowserRouter>
            <NavbarComponent />
            {userRole === "ADMIN" && isAuthed() ? <Admin /> :
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/hotel/details' element={<HotelDetails />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/signup'
                        element={<Signup />} />
                    <Route path='/profile/*'
                        element={<Profile />} />
                    <Route path='/*'
                        element={<Home />} />
                </Routes>
            }
        </BrowserRouter>
    )
}

export default App;
