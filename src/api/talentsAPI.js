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
			return console.log(error);
		}
	},

	getTalent(id) {
		return axiosInstance.get(`talents/${id}`);
	},

	async login(data) {
		try {
			return await axiosInstance.post('/talents/login', data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	async registrate(data) {
		try {
			return await axiosInstance.post('talents', data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	async edit(id, data) {
		try {
			return await axiosInstance.patch(`talents/${id}`, data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
