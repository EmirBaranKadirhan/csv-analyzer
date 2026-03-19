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

export const uploadCSV = async (file: File) => {
    const token = localStorage.getItem("token")

    const formData = new FormData()
    formData.append('file', file)   // 'file' ==> backend 'file' etiketli icerigi bekliyor, upload.single('file')
    const response = await api.post('/csv/upload', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}


export const getHistory = async () => {
    const token = localStorage.getItem("token")
    const response = await api.get('/csv/history', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}


export const deleteHistory = async (id: string) => {

    const token = localStorage.getItem("token")
    const response = await api.delete(`/csv/history/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}


export default api;