import {jwtDecode} from 'jwt-decode'


export const getToken = ()=>{
    return localStorage.getItem("userToken") ? localStorage.getItem("userToken") :null
}

export const decodedData = ()=>{
    return getToken() ? jwtDecode(getToken()) : null
  }