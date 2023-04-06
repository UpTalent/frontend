import { axiosInstance } from './index'

export const proofAPI = {

    async getProof(talent_Id, proof_Id) {
        try {
            return await axiosInstance.get(`talents/${talent_Id}/proofs/${proof_Id}`);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

