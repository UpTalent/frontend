import { axiosInstance } from './index';

export const proofAPI = {
	async getProof(talent_Id, proof_Id) {
		try {
			return await axiosInstance.get(`talents/${talent_Id}/proofs/${proof_Id}`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async getAllProofs(currentPage = 0, pageSize = 9) {
		try {
			return await axiosInstance.get(`proofs`, {
				params: {
					page: currentPage,
					size: pageSize,
				},
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
