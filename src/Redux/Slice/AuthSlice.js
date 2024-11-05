import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        loaduser: null,
        error: null,
        allProfile: null,
        IdByProfile: null,
        updateprofile: null,
        Chatbyid: null,
        searchResults: null,
        onlineUsers: null,
        notification: [],

    },
    reducers: {
        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authuser = action.payload;
        },
        loginFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        registerRequest(state) {
            state.loading = true;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        registerFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loadUserRequest(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.loaduser = action.payload;
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail(state, action) {
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.uservariant = { ...state.uservariant, ...action.payload };
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        allProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        allProfileSuccess(state, action) {
            state.loading = false;
            state.allProfile = action.payload;
        },
        allProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        idbyRequest(state) {
            state.loading = true;
            state.error = null;
        },
        idbyProfileSuccess(state, action) {
            state.loading = false;
            state.IdByProfile = action.payload;
        },
        idbyProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.updateprofile = { ...state.updateprofile, ...action.payload };
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        searchRequest(state) {
            state.loading = true;
            state.error = null;
        },
        searchSuccess(state, action) {
            state.loading = false;
            state.searchResults = action.payload;
        },
        searchFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearSearchResults(state) {
            state.searchResults = null;
        },
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        addNotification(state, action) {
            state.notification.push(action.payload);
        },
        clearNotification: (state, action) => {
            state.notification = state.notification.filter(
                (notification) => notification.senderId !== action.payload
            );
        },
        clearAllNotifications: (state) => {
            state.notification = [];
        },
    }

});

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    allProfileFail,
    allProfileRequest,
    allProfileSuccess,
    idbyProfileFail,
    idbyProfileSuccess,
    idbyRequest,
    searchFail,
    searchRequest,
    searchSuccess,
    clearSearchResults,
    setOnlineUsers,
    addNotification,
    clearAllNotifications,
    clearNotification

} = actions;

export default reducer;