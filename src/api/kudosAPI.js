import { axiosInstance, baseRequest } from './index';

export const kudosAPI = {
	async addKudos(proof_Id, kudosedSkills) {
		return baseRequest(() =>
			axiosInstance.post(`proofs/${proof_Id}/kudos`, {
				post_kudos_skills: kudosedSkills,
			}),
		);
	},

	async getProofsKudos(proof_Id) {
		return baseRequest(() => axiosInstance.get(`proofs/${proof_Id}/kudos`));
	},
};
