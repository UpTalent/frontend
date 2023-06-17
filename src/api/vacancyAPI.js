<<<<<<< HEAD
import { axiosInstance } from "."

export const vacancyAPI = {
    async getVacancy(vacancyId) {
        try {
            return await axiosInstance.get(`vacancies/${vacancyId}`);
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
}
=======
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
			console.log(data);
			return await axiosInstance.post(`vacancies`, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async editVacancy(vacancyId, data) {
		try {
			console.log(data);
			return await axiosInstance.patch(`vacancies/${vacancyId}`, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async getVacancies() {
		try {
			return await axiosInstance.get(`vacancies`);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
>>>>>>> 040541ad4b3114efe9b851743329c0636b634ed0
