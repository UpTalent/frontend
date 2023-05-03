import { axiosInstance } from './index';

export const skillsAPI = {
	async getSkills() {
		try {
			return await axiosInstance.get(`skills`);
		} catch (error) {
			throw new Error(error.response.data);
		}
	},

	async getProofSkills(proofId) {
		try {
			return await axiosInstance.get(`proofs/${proofId}/skills`);
		} catch (error) {
			throw new Error(error.response.data);
		}
	},

	async getListWithSkills(dataArr, kindOfEl) {
		const dataWithSkills = await Promise.all(
			dataArr.map(async el => {
				const { data } = await this[`get${kindOfEl}Skills`](el.id);
				return { ...el, skills: data };
			}),
		);
		return dataWithSkills;
	},
};
