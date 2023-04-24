import { axiosInstance } from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(`talents`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async edit(id, data, role) {
		try {
			return await axiosInstance.patch(`${role}s/${id}`, data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
