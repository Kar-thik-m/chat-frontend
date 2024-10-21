import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidestyles from './Sidebar.module.css'; 
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { clearSearchResults } from '../../Redux/Slice/AuthSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const allProfiles = useSelector((state) => state.user?.allProfile);
    const searchResults = useSelector((state) => state.user?.searchResults); 

    const contactsToDisplay = searchResults && searchResults.length > 0 ? searchResults : allProfiles;

    const handleRefresh = () => {
        dispatch(clearSearchResults()); 
    };

    return (
        <div className={Sidestyles.sidebar}>
            <h2>Chats</h2>
            <Search />
            <button onClick={handleRefresh} className={Sidestyles.refreshButton}>Refresh</button>
            <ul className={Sidestyles.contactList}>
                {contactsToDisplay && contactsToDisplay.length > 0 ? (
                    contactsToDisplay.map((contact) => (
                        <li key={contact._id} className={Sidestyles.contactItem}>
                            <Link to={`/chat/${contact._id}`} className={Sidestyles.pro}>
                                <img className={Sidestyles.contactAvatar} src={contact.userimage.url} alt={contact.username} />
                                <div className={Sidestyles.contactName}>{contact.username}</div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No contacts available</li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
