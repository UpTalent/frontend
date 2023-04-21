import { axiosInstance } from './index';

export const kudosAPI = {
	async addKudos(proof_Id, kudosAmount = 1) {
		try {
			return await axiosInstance.post(`proofs/${proof_Id}/kudos`, {
				kudos: kudosAmount,
			});
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},

	async getProofsKudos(proof_Id) {
		try {
			return await axiosInstance.get(`proofs/${proof_Id}/kudos`);
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
