import { axiosInstance, baseRequest } from './index';

export const proofAPI = {
	async getProof(talent_Id, proof_Id) {
		return baseRequest(() =>
			axiosInstance.get(`talents/${talent_Id}/proofs/${proof_Id}`),
		);
	},

	async createProof(talent_Id, data) {
		return baseRequest(() =>
			axiosInstance.post(`talents/${talent_Id}/proofs`, data),
		);
	},

	async editProof(talent_Id, proof_Id, data) {
		return baseRequest(() =>
			axiosInstance.patch(`talents/${talent_Id}/proofs/${proof_Id}`, data),
		);
	},

	async getTalentProofs(
		talent_Id,
		currentPage = 0,
		status = 'PUBLISHED',
		pageSize = 3,
	) {
		return baseRequest(() =>
			axiosInstance.get(`talents/${talent_Id}/proofs`, {
				params: {
					page: currentPage,
					size: pageSize,
					status: status,
				},
			}),
		);
	},

	async getAllProofs(
		currentPage = 0,
		sorting = 'desc',
		skills = [],
		pageSize = 9,
	) {
		return baseRequest(() =>
			axiosInstance.get(`proofs`, {
				params: {
					page: currentPage,
					size: pageSize,
					sort: sorting,
					skills,
				},
				paramsSerializer: { indexes: null },
			}),
		);
	},

	async deleteProof(talent_Id, proof_Id) {
		return baseRequest(() =>
			axiosInstance.delete(`talents/${talent_Id}/proofs/${proof_Id}`),
		);
	},
};
