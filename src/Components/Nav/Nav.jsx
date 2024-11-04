import { Link, useNavigate } from "react-router-dom";
import NavStyle from "../Nav/Nav.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Nav = () => {
    const Profileid = useSelector((state) => state?.user?.loaduser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        localStorage.removeItem('user');

        

        setLoading(false);
        navigate("/login");
    };

    return (
        <div className={NavStyle.navContainer}>
            <Link className={NavStyle.logo} to={'/'}>Tal_To_Me</Link>
            <img src=""/>
            <div className={NavStyle.profile}>
                {loading ? (
                    <Box display="flex" alignItems="center">
                        <CircularProgress size={24} />
                        <span style={{ marginLeft: '8px' }}>Logging out...</span>
                    </Box>
                ) : (
                    <>
                        <span className={NavStyle.navItem} onClick={handleLogout}>Logout</span>
                        <Link to={`/profile/${Profileid?._id}`} className={NavStyle.linkprofile}>
                            <img
                                src={Profileid?.userimage.url}
                                alt="Profile"
                                className={NavStyle.profilePic}
                            />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Nav;
