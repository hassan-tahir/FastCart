import { invokeApi } from "../utils/invokeApi";
import { token } from "../config/config";

export const uploadImage = async (image) => {
    const requestObj = {
        path : '/api/upload/',
        method : 'POST',
        headers : {
            'Authorization' : token
        },
        postData : image
    };
    return invokeApi(requestObj);
}