import React, { useState } from "react";
import SStyle from "../Search/Search.module.css"
import { useDispatch } from "react-redux";
import { UserSearch } from "../../Redux/Action/AuthAction";
import { useNavigate } from "react-router-dom";
const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
   
    const handleSearch = () => {
        try {
            dispatch(UserSearch(searchTerm));
            setSearchTerm("");
           
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className={SStyle.search}>
            <input
                type="text"
                placeholder="Search..."
                className={SStyle.searchinput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={SStyle.searchbutton} onClick={handleSearch}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default Search;