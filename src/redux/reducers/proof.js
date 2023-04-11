import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';
import { setSystemMessage } from './systemMessages';
import { deleteProofFromList } from './talentsProof';

const initialState = {
	id: 0,
	icon_number: 0,
	title: '',
	summary: '',
	content: '',
	published: null,
	status: '',
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
			const { talentId, proof } = params;
			const { data } = await proofAPI.editProof(talentId, proof);
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
			const { talent_Id, proof_Id } = params;
			const { data } = await proofAPI.deleteProof(talent_Id, proof_Id);
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

const proofSlice = createSlice({
	name: 'talentsProofs',
	initialState,
	reducers: {
		updateProof: (state, action) => {
			Object.keys(state).forEach(key => {
				state[key] = action.payload[key];
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(editProof.fulfilled, (state, action) => {
				Object.keys(state).forEach(key => {
					state[key] = action.payload[key];
				});
			})
			.addCase(deleteProof.fulfilled, state => {
				Object.keys(state).forEach(key => {
					state[key] = initialState[key];
				});
			});
	},
});

export const getProof = state => state.proof;
export const { updateProof } = proofSlice.actions;

export default proofSlice.reducer;
