import { axiosInstance, baseRequest } from './index';

export const authAPI = {
	async authentificate(data, role, method) {
		const url = method ? `auth/login` : `${role}s`;
		return baseRequest(() => axiosInstance.post(url, data));
	},

	async restoreProfile(token) {
		return baseRequest(() =>
			axiosInstance.post(`email/restore?token=${token}`),
		);
	},
	async verifyEmail(token) {
		return baseRequest(() => axiosInstance.post(`email/verify?token=${token}`));
	},
};
