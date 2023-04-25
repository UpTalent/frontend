import { axiosInstance } from './index';

export const sponsorApi = {
	async getKudosedProofs(sponsorId, currentPage = 0, pageSize = 3) {
		try {
			return await axiosInstance.get(`/api/v1/sponsors/${sponsorId}/kudos`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async getKudosedProofHistory(sponsorId, proofId, currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(
				`/api/v1/sponsors/${sponsorId}/kudos/${proofId}/history`,
				{
					params: {
						page: currentPage,
						size: pageSize,
					},
				},
			);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
