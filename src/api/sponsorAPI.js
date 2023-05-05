import { axiosInstance } from './index';

export const sponsorApi = {
	async getKudosedProofs(sponsorId, currentPage = 0, pageSize = 3) {
		try {
			return await axiosInstance.get(`sponsors/${sponsorId}/kudos`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			});
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async getKudosedProofHistory(
		sponsorId,
		proofId,
		currentPage = 0,
		pageSize = 9,
	) {
		try {
			return await axiosInstance.get(
				`sponsors/${sponsorId}/kudos/${proofId}/history`,
				{
					params: {
						page: currentPage,
						size: pageSize,
					},
				},
			);
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async updateKudosQuantity(sponsorId, balance) {
		try {
			return await axiosInstance.put(`sponsors/${sponsorId}/kudos`, {
				balance,
			});
		} catch (error) {
			const field = Object.keys(error.response.data)[0];
			throw new Error(`${error.response.data[field]}`);
		}
	},

	async deleteProfile(sponsorId) {
		// try {
		// 	return await axiosInstance.delete(`sponsors/${sponsorId}`);
		// } catch (error) {
		// 	throw new Error(error.response.data.message);
		// }
		alert('Hello there ' + sponsorId);
	},
};
