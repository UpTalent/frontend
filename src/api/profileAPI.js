import { axiosInstance } from './index';

export const profileAPI = {
	async uplaodPhoto(id, photo, option) {
		try {
			const formData = new FormData();
			formData.append('image', photo);

			return await axiosInstance.post(`/talents/${id}/image/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				params: {
					operation: option,
				},
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
