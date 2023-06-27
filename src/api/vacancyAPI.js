import { axiosInstance, baseRequest } from './index';

export const vacancyAPI = {
	async getVacancy(vacancyId) {
		return baseRequest(() => axiosInstance.get(`vacancies/${vacancyId}`));
	},

	async getAllVacancies(
		currentPage = 0,
		sorting = 'desc',
		skills = [],
		pageSize = 9,
	) {
		return baseRequest(() =>
			axiosInstance.get(`vacancies`, {
				params: {
					page: currentPage,
					size: pageSize,
					sort: sorting,
					skills,
				},
				paramsSerializer: { indexes: null },
			}),
		);
	},

	async createVacancy(data) {
		return baseRequest(() => axiosInstance.post(`vacancies`, data));
	},

	async editVacancy(vacancyId, data) {
		return baseRequest(() =>
			axiosInstance.patch(`vacancies/${vacancyId}`, data),
		);
	},

	async getSponsorsVacancies(
		id,
		currentPage = 0,
		status = 'PUBLISHED',
		pageSize = 3,
	) {
		return baseRequest(() =>
			axiosInstance.get(`vacancies/sponsors/${id}`, {
				params: {
					page: currentPage,
					size: pageSize,
					status: status,
				},
			}),
		);
	},

	async deleteVacancy(vacancyId) {
		return baseRequest(() => axiosInstance.delete(`vacancies/${vacancyId}`));
	},
};
