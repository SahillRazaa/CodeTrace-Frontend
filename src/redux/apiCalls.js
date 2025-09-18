import axios from "axios";
import { RegisterFailure, RegisterStart, RegisterSuccess, loginFailure, loginStart, loginSuccess } from "./authSlice"

const login = async(dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post(`${process.env.VITE_API_URL}api/auth/login`,user);
        
        dispatch(loginSuccess(res.data));
        return true;
    }catch(err)
    {
        dispatch(loginFailure())
        return false;
    }
}

const register = async(dispatch, user)=>{
    dispatch(RegisterStart());
    try{
        const res = await axios.post(`${process.env.VITE_API_URL}/api/auth/register`,user);
        dispatch(RegisterSuccess(res.data));
        return true;
    }catch(err)
    {
        dispatch(RegisterFailure());
        return false;
    }
}


export {login,register};