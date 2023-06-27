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

	async getAllVacancies(
		currentPage = 0,
		sorting = 'desc',
		skills = [],
		pageSize = 9,
	) {
		try {
			return await axiosInstance.get(`vacancies`, {
				params: {
					page: currentPage,
					size: pageSize,
					sort: sorting,
					skills,
				},
				paramsSerializer: { indexes: null },
			});
		} catch (error) {
			throw new Error(error.response.data.error);
		}
	},

	async createVacancy(data) {
		try {
			return await axiosInstance.post(`vacancies`, data);
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

	async deleteVacancy(vacancyId) {
		try {
			return await axiosInstance.delete(`vacancies/${vacancyId}`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
