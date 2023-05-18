import { axiosInstance } from './index';

export const kudosAPI = {
	async addKudos(proof_Id, kudosedSkills) {
		try {
			return await axiosInstance.post(`proofs/${proof_Id}/kudos`, {
				post_kudos_skills: kudosedSkills,
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
