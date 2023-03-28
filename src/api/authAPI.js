import { axiosInstance } from './index';

export const authAPI = {
    async login(data) {
        try {
            return await axiosInstance.post('/talents/login', data);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
    async registrate(data) {
        try {
            return await axiosInstance.post('talents', data);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
}