import { invokeApi } from "../utils/invokeApi";

export const checkLogin = async () => {
    const requestObj = {
        path : '/api/users/me',
        method : 'GET',
        headers : {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };
    return invokeApi(requestObj);
}

export const login = async (data) => {
    console.log(data)
    const requestObj = {
        path : '/api/auth/local',
        method : 'POST',
        postData:data,
    };
    return invokeApi(requestObj);
}

export const registerUser = async (data) => {
    const requestObj = {
        path : '/api/auth/local/register',
        method : 'POST',
        postData:data,
    };
    return invokeApi(requestObj);
}