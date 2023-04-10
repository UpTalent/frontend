import { axiosInstance } from './index';

export const proofAPI = {
	async getProof(talent_Id, proof_Id) {
		try {
			return await axiosInstance.get(`talents/${talent_Id}/proofs/${proof_Id}`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async createProof(talent_Id, data) {
		try {
			return await axiosInstance.post(`talents/${talent_Id}/proofs`, data);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async editProof(talent_Id, proof_Id, data) {
		try {
			return await axiosInstance.patch(
				`talents/${talent_Id}/proofs${proof_Id}`,
				data,
			);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async getTalentProofs(talent_Id, currentPage = 0, status, pageSize = 3) {
		try {
			return await axiosInstance.get(`talents/${talent_Id}/proofs`, {
				params: {
					page: currentPage,
                    size: pageSize,
					status: status
				},
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
