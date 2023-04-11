import { axiosInstance } from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(
				`talents`, {
				params: {
					page: currentPage,
					size: pageSize
				}
			}
			);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	getTalent(id) {
		return axiosInstance.get(`talents/${id}`);
	},
	async edit(id, data) {
		try {
			return await axiosInstance.patch(`talents/${id}`, data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
