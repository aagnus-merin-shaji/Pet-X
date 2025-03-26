import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const communityaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/community/add`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communitycreateAPI= async()=>{
    const response = await axios.post(`${BASE_URL}/community/create`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communityjoinAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/community/join`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communityleaveAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/community/leave`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communityviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/community/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communitysearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/community/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const communitydeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/community/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}