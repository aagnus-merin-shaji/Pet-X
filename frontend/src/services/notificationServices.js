import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";

const token = getToken()

export const notificationviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/notification/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        }    
    });
    return response.data
}

export const notificationupdateAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/notification/update`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const notificationdeleteAPI= async(data)=>{
    const response = await axios.delete(`${BASE_URL}/notification/deleter`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}
export const markasreadAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/notification/update`,{},{
        headers:{
            Authorization: `Bearer ${token}`
        }    
    });
    return response.data
}