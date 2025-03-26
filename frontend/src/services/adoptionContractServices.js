import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const contractaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/contract/add`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contracteditAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/contract/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contractviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/contract/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contractsearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/contract/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contractdeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/contract/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}