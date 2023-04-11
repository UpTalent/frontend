import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';

const initialState = {
	proofsList: [],
	total_pages: 0,
	isFetching: false,
	error: null,
};

export const getTalentsProofs = createAsyncThunk(
	'getTalentsProofs',
	async (params, thunkAPI) => {
		try {
			const { talentId, page, status } = params;
			const { data } = await proofAPI.getTalentProofs(talentId, page, status);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const proofsSlice = createSlice({
	name: 'talentsProofs',
	initialState,
	reducers: {
		deleteProofFromList: (state, action) => {
			state.proofsList = state.proofsList.filter(
				proof => proof.id !== action.payload,
			);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTalentsProofs.fulfilled, (state, action) => {
				state.proofsList = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
			})
			.addCase(getTalentsProofs.pending, state => {
				state.isFetching = true;
			})
			.addCase(getTalentsProofs.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const getProofList = state => state.talentsProofs.proofsList;
export const getProofsTotalPages = state => state.talentsProofs.total_pages;
export const proofsPendingStatus = state => state.talentsProofs.isFetching;
export const getProofError = state => state.talentsProofs.error;

export const { deleteProofFromList } = proofsSlice.actions;
export default proofsSlice.reducer;
