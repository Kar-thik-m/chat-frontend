import { Url } from "../../../config";
import {
    registerFail, registerRequest, registerSuccess, loginRequest, loginSuccess, loginFail, loadUserFail, loadUserRequest, loadUserSuccess,
    allProfileFail, allProfileRequest, allProfileSuccess, idbyProfileFail, idbyProfileSuccess, idbyRequest,
    updateProfileFail,updateProfileRequest,updateProfileSuccess,searchFail,searchRequest,searchSuccess

} from "../Slice/AuthSlice";

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    console.log(userData)

    try {
        const response = await fetch(`http://localhost:4000/user/register`, {
            method: 'POST',

            body: userData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(registerFail(errorData.message));
            return;
        }

        const data = await response.json();
        if (data && data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(registerSuccess(data));

        } else {
            dispatch(registerFail("Unexpected response format."));
        }


    } catch (error) {
        dispatch(registerFail(error.toString()));
    }
};



export const LoginApi = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    console.log(userData)
    try {
        const response = await fetch(`${Url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {

            const errorData = await response.text();
            dispatch(loginFail(errorData));
            return;
        }

        const data = await response.json();

        if (data && data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(loginSuccess(data));
        } else {
            dispatch(loginFail("Unexpected response format."));
        }

    } catch (error) {
        dispatch(loginFail(error.message || "An unexpected error occurred."));
    }
};


export const Loaduser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());


        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const response = await fetch(`${Url}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load user');
        }

        const data = await response.json();
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error || 'Something went wrong'));
    }
};


export const allprofile = () => async (dispatch) => {
    try {
        dispatch(allProfileRequest())
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/user/allusers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        dispatch(allProfileSuccess(data))
    } catch (err) {
        dispatch(allProfileFail(err))
    }
}


export const Idbyprofile = (id) => async (dispatch) => {
    try {
        dispatch(idbyRequest())
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/user/profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        dispatch(idbyProfileSuccess(data))
    } catch (err) {
        dispatch(idbyProfileFail(err))
    }
}



export const updateProfile = (userData, id) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }

        const formData = new FormData();
        if (userData.username) {
            formData.append('username', userData.username);
        }
        if (userData.file) {
            formData.append('file', userData.file);
        }
        
        const response = await fetch(`${Url}/user/updateprofile/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorText || 'Network response was not ok');
        }

        const data = await response.json();
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        console.error('Error updating profile:', error);
        dispatch(updateProfileFail(error.message || 'Failed to update profile'));
    }
};



export const UserSearch = (searchTerm) => async (dispatch) => {
    try {
        dispatch(searchRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }
        const token = user.token;
        const response = await fetch(`${Url}user/search?query=${(searchTerm)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await response.json();
        dispatch(searchSuccess(data));

    } catch (err) {
        dispatch(searchFail(err))
    }
}






