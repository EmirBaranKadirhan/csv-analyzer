import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});


export const loginUser = async (email: string, password: string) => {

    const response = await api.post('/auth/login', { email, password })

    return response

};

export const registerUser = async (email: string, password: string) => {

    const response = await api.post('/auth/register', { email, password })

    return response

};

export default api;