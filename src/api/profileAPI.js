import { axiosInstance, baseRequest } from './index';

export const profileAPI = {
	async getUser(role = 'talent', id) {
		return baseRequest(() => axiosInstance.get(`${role}s/${id}`));
	},

	async edit(id, data, role) {
		return baseRequest(() => axiosInstance.patch(`${role}s/${id}`, data));
	},

	async uplaodPhoto(id, photo, operation) {
		const makePhotoRequest = async () => {
			const formData = new FormData();
			formData.append('image', photo);
			formData.append('operation', operation);

			return await axiosInstance.post(`/images/${id}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		};
		return baseRequest(makePhotoRequest);
	},

	async deleteProfile(id) {
		return baseRequest(() => axiosInstance.delete(`talents/${id}`));
	},

	async getStatistics(id) {
		return baseRequest(() => axiosInstance.get(`talents/${id}/statistic`));
	},
};
