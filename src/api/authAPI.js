import { axiosInstance } from './index';

export const authAPI = {
	async authentificate(data, role='talent', method) {
		const  url = method ? `${role}s/login` : `${role}s`;
		try {
			return await axiosInstance.post(url, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
