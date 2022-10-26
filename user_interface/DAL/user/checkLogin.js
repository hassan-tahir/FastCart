import { invokeApi } from "../../utils/invokeApi";

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