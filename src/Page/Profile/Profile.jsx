import { useDispatch, useSelector } from "react-redux";
import ProfileStyle from "../Profile/Profile.module.css";
import { Idbyprofile } from "../../Redux/Action/AuthAction";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const idbyprofile = useSelector((state) => state?.user?.IdByProfile);
    const user = useSelector((state) => state?.user?.loaduser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Idbyprofile(id));
    }, [id, dispatch]);

    return (
        <div className={ProfileStyle.profileContainer}>
            <img
                src={idbyprofile?.userimage.url}
                alt="Profile"
                className={ProfileStyle.profileImage}
            />
            <div className={ProfileStyle.username}>{idbyprofile?.username}</div>

            {idbyprofile?._id === user?._id ? (
                <Link to={`/editprofile/${id}`} className={ProfileStyle.editProfile}><div>Edit Profile</div></Link>
            ) : ""}
        </div>
    );
};

export default Profile;
