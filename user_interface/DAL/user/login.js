import { invokeApi } from "../../utils/invokeApi";

export const login = async (data) => {
    console.log(data)
    const requestObj = {
        path : '/api/auth/local',
        method : 'POST',
        // headers : {
        //     'Content-Type' : 'application/json'
        // },
        postData:data,
    };
    return invokeApi(requestObj);
}