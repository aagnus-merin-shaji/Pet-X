import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";

const token = getToken()

export const lostaddAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/lostfound/add`,data, {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }   
    });
    return response.data
}

export const lostfoundeditAPI= async(id)=>{
    const response = await axios.put(`${BASE_URL}/lostfound/edit`, 
        { id, status: 'found' },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export const lostfoundviewuserAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/lostfound/lostbyuser`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const lostfoundviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/lostfound/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const lostfoundsearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/lostfound/search`,data, {
        headers:{
            Authorization: `Bearer ${token}`
        }   // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const lostfounddeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/lostfound/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}
