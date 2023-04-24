import { axiosInstance } from './index';

export const profileAPI = {
	async getUser(role = 'talent', id) {
		try {
			return await axiosInstance.get(`${role}s/${id}`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async uplaodPhoto(id, photo, operation) {
		try {
			const formData = new FormData();
			formData.append('image', photo);
			formData.append('operation', operation);

			return await axiosInstance.post(`/images/${id}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
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
	},
};
