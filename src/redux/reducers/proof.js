import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';
import { setSystemMessage } from './systemMessages';
import { deleteProofFromList, getTalentsProofs } from './talentsProof';

const initialState = {
	id: 0,
	icon_number: 0,
	title: '',
	summary: '',
	content: '',
	published: null,
	status: '',
	isFetching: false,
};

export const createProof = createAsyncThunk(
	'createProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, proof } = params;
			const { data } = await proofAPI.createProof(talentId, proof);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const editProof = createAsyncThunk(
	'editProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, proofId, status } = params;
			let proof = thunkAPI
				.getState()
				.talentsProofs.proofsList.find(i => i.id === proofId);
			proof = { ...proof, status };
			const { data } = await proofAPI.editProof(talentId, proofId, proof);

			await thunkAPI.dispatch(getTalentsProofs({ talentId, status }));
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const deleteProof = createAsyncThunk(
	'deleteProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, proof_Id } = params;
			const { data } = await proofAPI.deleteProof(talentId, proof_Id);
			thunkAPI.dispatch(
				setSystemMessage(true, 'Your proof was succesfully deleted'),
			);
			thunkAPI.dispatch(deleteProofFromList(proof_Id));
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const fetchProof = createAsyncThunk(
	'fetchProof',
	async (params, thunkAPI) => {
		try {
			const { proofId } = params;
			const data = thunkAPI
				.getState()
				.talentsProofs.proofsList.find(i => i.id === proofId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const proofSlice = createSlice({
	name: 'talentsProofs',
	initialState,
	reducers: {
		updateProof: (state, action) => {
			Object.keys(state).forEach(key => {
				state[key] = action.payload[key];
			});
		},
		clearProof: state => {
			Object.keys(state).forEach(key => {
				state[key] = initialState[key];
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(deleteProof.fulfilled, state => {
				Object.keys(state).forEach(key => {
					state[key] = initialState[key];
				});
			})
			.addCase(fetchProof.fulfilled, (state, action) => {
				Object.keys(state).forEach(key => {
					if (key === 'isFetching') {
						state.isFetching = false;
					} else {
						state[key] = action.payload[key];
					}
				});
			})
			.addCase(fetchProof.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getProof = state => state.proof;
export const { updateProof, clearProof } = proofSlice.actions;

export default proofSlice.reducer;
