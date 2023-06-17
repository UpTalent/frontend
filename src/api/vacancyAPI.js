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