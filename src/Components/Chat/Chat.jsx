import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage, UserChat } from '../../Redux/Action/MessageAction';
import ChatStyle from "../Chat/Chat.module.css";
import { Idbyprofile } from '../../Redux/Action/AuthAction';

const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.loaduser);
    const Chatbyid = useSelector((state) => state?.message?.chatById);
    const idbyprofile = useSelector((state) => state?.user?.IdByProfile);
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        dispatch(Idbyprofile(id));
        const newSocket = io('https://chat-backend-aiqe.onrender.com', {
            transports: ['websocket'],
        });

        newSocket.on("connect", () => {
            if (user?._id) {
                newSocket.emit("addUser", user._id);
            }
        });

        newSocket.on("getUsers", (users) => {
            setOnlineUsers(users);
        });

        newSocket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?._id, id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && socket) {
            const message = { senderId: user._id, receiverId: id, content: input };
            socket.emit('sendMessage', message);
            setInput('');
            dispatch(postMessage(id, input));
            dispatch(UserChat(id));
        }
    };

    return (
        <div className={ChatStyle.chatContainer}>
            <div className={ChatStyle.othernames}>
                <div>{idbyprofile?.username}</div>
                <Link to={`/profile/${id}`}>
                    <img src={idbyprofile?.userimage.url} className={ChatStyle.otherimage} />
                </Link>
            </div>
            <div>
                <ul className={ChatStyle.messageList}>
                    {messages.map((msg, index) => (
                        <li
                            key={msg._id || index}
                            className={msg.senderId === user?._id ? ChatStyle.messageRight : ChatStyle.messageLeft}
                        >
                            {msg.content}
                        </li>
                    ))}
                </ul>
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
