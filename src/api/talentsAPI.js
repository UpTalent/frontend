import { axiosInstance } from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(
				`talents`, {
				params: {
					page: currentPage,
					size: pageSize
				}
			}
			);
		} catch (error) {
			return console.log(error);
		}
	}
};
