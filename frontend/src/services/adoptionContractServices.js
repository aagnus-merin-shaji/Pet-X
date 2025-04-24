import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";


const token = getToken()
export const contractaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/contract/add`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contracteditAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/contract/edit`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
        } // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const contractviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/contract/viewall`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
        }   // Make sure credentials (cookies) are sent
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
        headers:{
            Authorization: `Bearer ${token}`,
        }   // Make sure credentials (cookies) are sent
    });
    return response.data
}

