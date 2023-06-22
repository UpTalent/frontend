import { axiosInstance } from './index';

export const vacancyAPI = {
	async getVacancy(vacancyId) {
		try {
			return await axiosInstance.get(`vacancies/${vacancyId}`);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async createVacancy(data) {
		try {
			return await axiosInstance.post(`vacancies`, data);
			// return await axiosInstance.post(`vacancies`, {
			// 	...data,
			// 	countMatchedSkills: 1,
			// });
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async editVacancy(vacancyId, data) {
		try {
			return await axiosInstance.patch(`vacancies/${vacancyId}`, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async getSponsorsVacancies(
		id,
		currentPage = 0,
		status = 'PUBLISHED',
		pageSize = 3,
	) {
		try {
			return await axiosInstance.get(`vacancies/sponsors/${id}`, {
				params: {
					page: currentPage,
					size: pageSize,
					status: status,
				},
			});
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
