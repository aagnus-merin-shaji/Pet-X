import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";
const token = getToken()

export const animalsaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/animals/add`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const animalseditAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/animals/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const animalsviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/animals/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        } // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const animalssearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/animals/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const animalsdeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/animals/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}