import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";

const token = getToken()

export const adminapproveAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/admin/approve`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adminrejectAPI= async()=>{
    const response = await axios.put(`${BASE_URL}/admin/reject`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adminusersAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const totalusersAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/viewtotalusers`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}


export const admindeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/admin/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adminviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const totalanimalAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const totalrequestAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const totallostpets= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/viewlostpets`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adminadoptionsAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/admin/adoptions`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  // Make sure credentials (cookies) are sent
    });
    return response.data
}