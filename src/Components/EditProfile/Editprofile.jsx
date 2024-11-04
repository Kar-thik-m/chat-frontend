import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import editStyle from "../EditProfile/Editprofile.module.css"; 
import { updateProfile } from '../../Redux/Action/AuthAction';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); 
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, file };

        setLoading(true);

        try {
            await dispatch(updateProfile(userData, id));
            setUsername("");
            setFile(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className={editStyle.container} >
         <form onSubmit={handleSubmit} className={editStyle.forms}>
            <div className={editStyle.labeltext}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className={editStyle.labelfile}>
                <label htmlFor="file">Profile Image:</label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit" className={editStyle.buttonupdate} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Update Profile"}
            </button>
        </form>
       </div>
    );
};

export default UpdateProfile;
