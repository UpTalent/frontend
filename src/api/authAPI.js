import { axiosInstance } from './index';

export const authAPI = {
    async login(data) {
        try {
            return await axiosInstance.post('/talents/login', data);
        } catch (error) {
            const field = Object.keys(error.response.data)[0];
            throw new Error(`${error.response.data[field]}`);
        }
    },
    async registrate(data) {
        try {
            return await axiosInstance.post('talents', data);
        } catch (error) {
            const field = Object.keys(error.response.data)[0];
            throw new Error(`${error.response.data[field]}`);
        }
    },
}