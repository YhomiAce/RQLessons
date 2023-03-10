import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:4000'
});
export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = 'Bearer token';
    const onSuccess = responnse => responnse;
    const onError = error => {
        // handle error
        // redirects if status code is 401
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}