import axios from "axios";

const APi_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: APi_URL,
});

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId) {
        config.headers['USERID'] = userId;
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    });
    

export const getActivities = ()=> api.get('/activities/');
export const addActivity = (activity) => api.post('/activities/', activity);
export const getActivity = (id) => api.get(`/activities/${id}`);
export const getActivityDetail = (id) => api.get(`/recommendation/activity/${id}`);