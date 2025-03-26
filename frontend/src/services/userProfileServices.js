import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const profilesaveAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/profile/save`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profileaddAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/profile/add`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profileremoveAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/profile/remove`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profileeditAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/profile/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profilepasswordAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/profile/password`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profilewishlistAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/profile/wishlist`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profiledeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/profile/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

