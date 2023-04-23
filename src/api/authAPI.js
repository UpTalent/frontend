import { axiosInstance } from './index';

export const authAPI = {
	async authentificate(data, role, method) {
		let url;
		if (role === 'talent') {
			url = method ? `talents/login` : `talents`;
		} else if (role === 'sponsor') {
			url = method ? `sponsors/login` : `sponsors`;
		}
		try {
			return await axiosInstance.post(url, data);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},
};
