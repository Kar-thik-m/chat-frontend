import React, { useEffect } from 'react';
import HomeStyle from "./Home.module.css";
import { Loaduser, allprofile } from '../../Redux/Action/AuthAction';
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch } from 'react-redux';
import Chat from '../../Components/Chat/Chat';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allprofile());
        dispatch(Loaduser);
    }, [dispatch]);

    return (
        <div className={HomeStyle.homeContainer}>
            <Sidebar />
            <Chat />
        </div>
    );
}

export default Home;
