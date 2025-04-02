import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";

const token = getToken()

export const profilesaveAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/users/view`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profileremoveAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/profile/remove`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profileeditAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/users/edit`,data, {
        headers:{
            Authorization: `Bearer ${token}`
        }   // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const profilepasswordAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/users/changepass`,data, {
        headers:{
            Authorization: `Bearer ${token}`
        }   // Make sure credentials (cookies) are sent
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

