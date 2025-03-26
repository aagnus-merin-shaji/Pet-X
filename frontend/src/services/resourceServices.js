import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const resourcesaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/resources/add`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const resourcesviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/resources/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const resourcessearchAPI= async(data)=>{
    const response = await axios.get(`${BASE_URL}/resources/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const resourceseditAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/resources/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const resourcesdeleteAPI= async(data)=>{
    const response = await axios.delete(`${BASE_URL}/resources/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}