import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Page/Home/Home";
import { useDispatch } from 'react-redux';
import Login from "./Page/Login/Login";
import Register from './Page/Register/Register.jsx';
import Privateroute from './PrivateRoute/PrivateRoute.jsx';
import { Loaduser } from "./Redux/Action/AuthAction";
import { SocketProvider } from './SocketContext/Socketcontext.jsx';
import Nav from './Components/Nav/Nav.jsx';
import UpdateProfile from './Components/EditProfile/Editprofile.jsx';
import Profile from './Page/Profile/Profile.jsx';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            await Loaduser(dispatch);
        };
        fetchUser();
    }, [dispatch]);

    return (
        <SocketProvider>
            <Router>
                <div>
                    <Nav />
                    <Routes>
                        <Route index path="/" element={<Privateroute element={<Home />} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/profile/:id' element={<Privateroute element={<Profile />} />} />
                        <Route path='/editprofile/:id' element={<Privateroute element={<UpdateProfile />} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<div>Not Found</div>} />
                    </Routes>
                </div>
            </Router>
        </SocketProvider>
    );
}

export default App;
