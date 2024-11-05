import React, { createContext, useContext, useEffect, useState } from 'react';
import { Url } from '../../config';
import { io } from 'socket.io-client';
import { setOnlineUsers } from '../Redux/Slice/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../Redux/Slice/AuthSlice';
const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const { loaduser } = useSelector(state => state.user);


    useEffect(() => {
        if (loaduser) {
            const newSocket = io(`${Url}/`, {
                transports: ['websocket'],
                query: {
                    userId: loaduser?._id,
                },
            });
            setSocket(newSocket);

            newSocket.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            newSocket.on('notification', ({ senderId, userinfo }) => {
                console.log("noti", senderId, userinfo)
                dispatch(addNotification({ senderId, userinfo }));

            });

            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
            }
        }
    }, [loaduser, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
