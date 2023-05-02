import { axiosInstance } from './index';

export const authAPI = {
	async authentificate(data, role, method) {
		const  url = method ? `auth/login` : `${role}s`;
		try {
			return await axiosInstance.post(url, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
