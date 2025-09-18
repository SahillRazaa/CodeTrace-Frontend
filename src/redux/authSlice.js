import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        currentUser : null,
        isFetching : false,
        error : false,
        logout : false,
        register : false,
    },
    reducers:{
        loginStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess : (state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.logout = false;
            state.register = false;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
          },          
        logOut : (state)=>{
            state.currentUser = null;
            state.logout = true;
            state.register = false;
            state.error = false;
        },
        RegisterStart : (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        RegisterSuccess : (state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.register = true;
            state.error = false;
            state.logout = false;
        },
        RegisterFailure : (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {loginStart,loginSuccess,loginFailure,logOut,RegisterStart,RegisterSuccess,RegisterFailure} = userSlice.actions;
export default userSlice.reducer;