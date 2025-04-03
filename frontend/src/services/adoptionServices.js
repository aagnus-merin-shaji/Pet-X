import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getToken } from "../utils/storageHandler";
const token = getToken()

export const adoptionaddAPI= async(data)=>{
    console.log(token, data);
    
    const response = await axios.post(`${BASE_URL}/adoption/add/${data}`,"",{
        headers:{
            Authorization: `Bearer ${token}`
        } 
    });
    return response.data
}

export const adoptioneditAPI = async (data) => {
    console.log(data);
    const response = await axios.put(`${BASE_URL}/adoption/edit`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

export const adoptionviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/adoption/viewall`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  
    });
    return response.data
}

export const adoptionsearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/adoption/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adoptionmatchesAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/adoption/matches`, {
        headers:{
            Authorization: `Bearer ${token}`
        }   // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const adoptiondeleteAPI= async()=>{
    const response = await axios.delete(`${BASE_URL}/adoption/delete`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}
export const adoptionviewAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/adoption/adopter`, {
        headers:{
            Authorization: `Bearer ${token}`
        }  
    });
    return response.data
}