import axios from "axios";
import { BASE_URL } from "../utils/url";
import { getUserData } from "../utils/storageHandler";

export const paymentwebhookAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/payment/webhook`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const paymentcheckoutAPI= async(data)=>{
    const response = await axios.post(`${BASE_URL}/payment/checkout`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const paymenteditAPI= async(data)=>{
    const response = await axios.put(`${BASE_URL}/payment/edit`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const paymentviewallAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/payment/viewall`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}

export const paymentsearchAPI= async()=>{
    const response = await axios.get(`${BASE_URL}/payment/search`,data, {
        withCredentials: true,  // Make sure credentials (cookies) are sent
    });
    return response.data
}