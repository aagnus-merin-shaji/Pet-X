import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const shelteraddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/shelter/add`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
            
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const sheltereditAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/shelter/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const shelterviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/shelter/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const sheltersearchAPI= async(data)=>{
    const response = await axios.get(`${BASE_URL}/shelter/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const shelteranimalsAPI= async(data)=>{
    const response = await axios.get(`${BASE_URL}/shelter/animals`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const shelterdeleteAPI= async(data)=>{
    const response = await axios.delete(`${BASE_URL}/shelter/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}