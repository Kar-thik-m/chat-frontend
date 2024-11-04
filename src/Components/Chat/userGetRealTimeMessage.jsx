import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { chatByIdSuccess } from "../../Redux/Slice/MessageSlice";

const useRealTimeMessage = (socket, chatById) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            dispatch(chatByIdSuccess([...chatById, newMessage]));
            console.log(".newMessage", newMessage);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, chatById, dispatch, chatByIdSuccess]);
};

export default useRealTimeMessage;
