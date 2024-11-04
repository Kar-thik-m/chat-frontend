import { chatByIdFail, chatByIdRequest, chatByIdSuccess, postmessageFail, postmessageRequest, postmessageSuccess } from "../Slice/MessageSlice";
import { Url } from "../../../config";

export const UserChat = (id) => async (dispatch) => {
    try {
        dispatch(chatByIdRequest())
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/api/getMessage/${id}`, {
            method: 'GET',
            headers: {
              
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log(data)
        dispatch(chatByIdSuccess(data));
    } catch (err) {
        dispatch(chatByIdFail(err))
    }
}


export const postMessage = (id, message) => async (dispatch) => {
    try {
        dispatch(postmessageRequest());
       
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        if (!token) {
            throw new Error('No authentication token found');
        }
        if (!message) {
            throw new Error('Message content is required.');
        }

        const response = await fetch(`${Url}/api/sendMessage/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(postmessageFail(errorData.message || 'Failed to send message'));
            return;
        }

        const data = await response.json();
        dispatch(postmessageSuccess(data.newMessage));
    } catch (error) {
        dispatch(postmessageFail(error.message));
    }
};

