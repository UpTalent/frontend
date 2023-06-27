import { axiosInstance, baseRequest } from './index';

export const sponsorApi = {
	async getKudosedProofs(sponsorId, currentPage = 0, pageSize = 3) {
		return baseRequest(() =>
			axiosInstance.get(`sponsors/${sponsorId}/kudos`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			}),
		);
	},

	async getKudosedProofHistory(
		sponsorId,
		proofId,
		currentPage = 0,
		pageSize = 9,
	) {
		return baseRequest(() =>
			axiosInstance.get(`sponsors/${sponsorId}/kudos/${proofId}/history`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			}),
		);
	},

	async updateKudosQuantity(sponsorId, balance) {
		return baseRequest(() =>
			axiosInstance.put(`sponsors/${sponsorId}/kudos`, {
				balance,
			}),
		);
	},

	async deleteProfile(sponsorId) {
		return baseRequest(() => axiosInstance.delete(`sponsors/${sponsorId}`));
	},
};
