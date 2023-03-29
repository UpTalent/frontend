import { axiosInstance } from './index'

export const profileAPI = {

    async getTalent(id) {
        try {
            return await axiosInstance.get(`talents/${id}`);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    async uplaodPhoto(id, photo, operation) {
        try {
            const formData = new FormData();
            formData.append('image', photo);
            formData.append('operation', operation);

            return await axiosInstance.post(`/talents/${id}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    async deleteProfile(id) {
        try {
            return await axiosInstance.delete(`talents/${id}`);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

