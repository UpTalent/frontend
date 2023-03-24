import axios from './index';

export const talensAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axios.get(`talents?page=${currentPage}&size=${pageSize}`);
		} catch (error) {
			return console.log(error);
		}
	},
	getTalent(id) {
		return axios.get(`talents/${id}`);
	},
};
