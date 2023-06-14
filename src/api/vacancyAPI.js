import { axiosInstance } from "."

export const vacancAPI = {
    async getVacancy(vacancyId) {
        try {
            return await axiosInstance.get(`vacancies/${vacancyId}`);
        } catch (error) {
            throw new Error(error.response.data);
        }
    }
}