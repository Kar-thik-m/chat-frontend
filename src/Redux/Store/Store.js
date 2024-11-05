import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/AuthSlice';
import messageReducer from "../Slice/MessageSlice.js"

const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    message: messageReducer,

  },

});

export default store;