import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';

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

const proofSlice = createSlice({
	name: 'talentsProofs',
	initialState,
	reducers: {
		updateProof: (state, action) => {
			state = { ...state, ...action.payload };
		},
		// ред'юсер для очищення???
	},
	extraReducers: builder => {
		builder.addCase(editProof.fulfilled, (state, action) => {
			state = action.payload;
		})
		.addCase(createProof.fulfilled, (state, action) => {
			state = action.payload;
		});
	},
});

export const getProof = state => state.proof;
export const { updateProof } = proofSlice.actions;

export default proofSlice.reducer;
