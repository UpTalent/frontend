import { axiosInstance } from './index'

export const profileAPI = {
    
    async getTalent(id) {
        try {
            return await axiosInstance.get(`talents/${id}`);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    async uplaodPhoto(id, photo, option) {
        try {
            return await axiosInstance.post(`/talents/${id}/image/upload`, {
                image: photo,
                option: option
            });
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
}
