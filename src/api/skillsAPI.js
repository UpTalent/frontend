import { axiosInstance, baseRequest } from './index';

export const skillsAPI = {
	async getSkills() {
		return baseRequest(() => axiosInstance.get(`skills`));
	},
};
