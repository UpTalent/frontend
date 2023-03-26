import axiosInstance from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(
				`talents?page=${currentPage}&size=${pageSize}`,
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
			console.log(data);
			return await axiosInstance.post('/talents/login', data, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			});
			//return await axiosInstance.post('talents/login', data);
		} catch (error) {
			return error.message;
		}
	},

	async registrate(data) {
		try {
			return await axiosInstance.post('talents', data, {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			return error.message;
		}
	},
};
