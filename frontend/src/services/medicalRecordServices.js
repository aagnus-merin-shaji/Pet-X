import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken,} from "../utils/storageHandler";

const token = getToken()
export const recordsaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/records/add`,data, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const recordseditAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/records/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const recordsviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/records/viewall`,data, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const recordssearchAPI= async(data)=>{
    console.log(data.pet);
    
    const response = await axios.get(`${BASE_URL}/records/search/${data.pet}`, {
       
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}

export const recordsdeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/records/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}