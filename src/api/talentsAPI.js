import axiosInstance from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(`talents?page=${currentPage}&size=${pageSize}`);
		} catch (error) {
			return console.log(error);
		}
	},
	getTalent(id) {
		return axiosInstance.get(`talents/${id}`);
	},
};
