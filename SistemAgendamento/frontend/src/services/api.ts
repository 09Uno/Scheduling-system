import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthError } from '../services/errors/AuthError'



export function setupAPICliente(ctx = undefined) {

    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextAuthToken']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    },       (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                console.log("log put")
            } else {
                return Promise.reject(new AuthError)
            }
        }

        return Promise.reject(error);
    })
    return api

}