import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../../Redux/Action/MessageAction';
import ChatStyle from '../Chat/Chat.module.css';
import { formatTimeAgo } from '../../formatTimeAgo/formatTimeAgo';
import { useSocket } from '../../SocketContext/Socketcontext';
import useRealTimeMessages from "../Chat/userGetRealTimeMessage.jsx";

const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.loaduser);
    const onlineUsers = useSelector(state => state.user?.onlineUsers) || [];
    const Chatbyid = useSelector((state) => state?.message?.chatById);
    const idbyprofile = useSelector((state) => state?.user?.IdByProfile);
    const [input, setInput] = useState('');
    const socket = useSocket();

    const messagesEndRef = useRef(null);

    useRealTimeMessages(socket, Chatbyid);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const messageData = {
            message: input,
            senderId: user?._id,
            receiverId: idbyprofile?._id,
        };
        dispatch(postMessage(idbyprofile?._id, messageData));
        if (socket) {
            socket.emit('sendNotification', {
                receiverId: idbyprofile?._id,
                userinfo: `New message from ${user?.username}: ${input}`,
            });
            
        }
        setInput('');
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [Chatbyid]);

    const isOnline = onlineUsers.includes(idbyprofile?._id);

    return (
        <div className={ChatStyle.chatContainer}>
            <div className={ChatStyle.othernames}>
                <img src={idbyprofile?.userimage.url} className={ChatStyle.otherimage} alt="User" />
                <div>{idbyprofile?.username}</div>
            </div>
            <div className={`${ChatStyle.statusIndicator} ${isOnline ? ChatStyle.online : ChatStyle.offline}`}>
                {isOnline ? "Online" : "Offline"}
            </div>

            <div className={ChatStyle.messageList}>
                <div className={ChatStyle.messages}>
                    {Array.isArray(Chatbyid) && Chatbyid.length > 0 ? (
                        Chatbyid.map((msg, index) => (
                            <div
                                key={msg._id || index}
                                className={msg.senderId === user?._id ? ChatStyle.messageRight : ChatStyle.messageLeft}
                            >
                                {msg.message}
                                <div>{formatTimeAgo(msg.createdAt)}</div>
                            </div>
                        ))
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>Welcome TO ChatApp </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
