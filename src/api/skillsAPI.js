import { axiosInstance } from './index';

export const skillsAPI = {
	async getSkills() {
		try {
			return await axiosInstance.get(`skills`);
		} catch (error) {
			throw new Error(error.response.data);
		}
	},
};
