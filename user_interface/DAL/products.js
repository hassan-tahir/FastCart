import { invokeApi } from "../utils/invokeApi";
import {token} from '../config/config';

export const getProducts = async () => {
    const requestObj = {
        path : '/api/products?populate=*',
        method : 'GET',
        headers : {
            'Authorization' : token
        }
    };
    return invokeApi(requestObj);
}

export const addProduct = async (data) => {
    const requestObj = {
        path : '/api/products',
        method : 'POST',
        headers : {
            'Authorization' : token
        },
        postData : {'data':data}
    };
    return invokeApi(requestObj);
}

export const editProduct = async (id, data) => {
    const requestObj = {
        path : `/api/products/${id}`,
        method : 'PUT',
        headers : {
            'Authorization' : token
        },
        postData : data
    };
    return invokeApi(requestObj);
}

export const deleteProduct = async (id) => {
    const requestObj = {
        path : `/api/products/${id}`,
        method : 'DELETE',
        headers : {
            'Authorization' : token
        }
    };
    return invokeApi(requestObj);
}