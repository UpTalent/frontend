import { axiosInstance, baseRequest } from './index';

export const talentsAPI = {
	async getTalents(currentPage = 0, pageSize = 9, skills = []) {
		return baseRequest(() =>
			axiosInstance.get(`talents`, {
				params: {
					page: currentPage,
					size: pageSize,
					skills,
				},
				paramsSerializer: { indexes: null },
			}),
		);
	},

	async getTopSponsors() {
		return baseRequest(() => axiosInstance.get('sponsors/rating'));
	},
};
