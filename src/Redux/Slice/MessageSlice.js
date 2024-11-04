import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        error: null,
        chatById: null,
       
    },
    reducers: {
        chatByIdRequest(state) {
            state.loading = true;
            state.error = null;
        },
        chatByIdSuccess(state, action) {
            state.loading = false;
            state.chatById = action.payload;
        },
        chatByIdFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
       
        postmessageRequest(state) {
            state.loading = true;
            state.error = null;
        },
        postmessageSuccess(state, action) {
            state.loading = false;
          state.chatById = [...state.chatById, action.payload];
            console.log("nwe",action.payload);
        },
        postmessageFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const {
    chatByIdRequest,
    chatByIdSuccess,
    chatByIdFail,
   postmessageFail,
   postmessageRequest,
   postmessageSuccess
} = messageSlice.actions;


export default messageSlice.reducer;
