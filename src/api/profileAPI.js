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
			const message = error.response.data.message || error.response.data.error;
			throw new Error(message);
		}
	},

	async deleteProfile(id) {
		try {
			return await axiosInstance.delete(`talents/${id}`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async getStatistics (id) {
		try {
			return await axiosInstance.get(`talents/${id}/statistic`);
		} catch(error) {
			throw new Error(error.response.data.message)
		}
	}
};
