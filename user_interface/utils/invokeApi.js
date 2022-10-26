import axios from "axios";
import {baseUri} from '../config/config';

axios.defaults.headers.post['Content-Type']= 'application/json';

export const invokeApi = async ({
    path,
    method='GET',
    headers={},
    queryParams = {},
    postData = {}
}) => {
    const reqObj = {
        method,
        url : baseUri+path,
        headers
    };

    reqObj.params = queryParams;

    if( method === "POST" || method === "PUT" || method === "DELETE" )
    reqObj.data = postData;
    console.log('<===Req-Object===>', reqObj)
    try {
        const response = await axios(reqObj);
        console.log('<===Api-Success===>', response);
        return {data:response.data, code:response.status};
    } catch(error) {
        console.log('<===Api-Error===>', error.response.data);
        return { code:error.response.data.error.status, message:error.response.data.error.message};
    }
}