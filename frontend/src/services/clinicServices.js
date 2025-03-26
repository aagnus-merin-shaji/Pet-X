import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const clinicaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/clinic/add`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const cliniceditAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/clinic/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const clinicviewalAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/clinic/viewal`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const clinicsearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/clinic/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const clinicdeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/clinic/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}