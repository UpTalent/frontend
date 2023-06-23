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
<<<<<<< HEAD
			console.log(data);
			return await axiosInstance.post(`vacancies`, data);
=======
			return await axiosInstance.post(`vacancies`, data);
			// return await axiosInstance.post(`vacancies`, {
			// 	...data,
			// 	countMatchedSkills: 1,
			// });
>>>>>>> dev
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async editVacancy(vacancyId, data) {
		try {
<<<<<<< HEAD
			console.log(data);
=======
>>>>>>> dev
			return await axiosInstance.patch(`vacancies/${vacancyId}`, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

<<<<<<< HEAD
	async getVacancies() {
		try {
			return await axiosInstance.get(`vacancies`);
=======
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
>>>>>>> dev
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
