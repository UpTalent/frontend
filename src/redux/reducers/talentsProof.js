import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';

const initialState = {
	proofsList: [],
	total_pages: 0,
	currentPage: 1,
	isFetching: false,
	error: null,
	status: 'PUBLISHED',
};

export const getTalentsProofs = createAsyncThunk(
	'getTalentsProofs',
	async (params, thunkAPI) => {
		try {
			const { talentId, page } = params;
			let { status } = params;
			if (!status) {
				status = thunkAPI.getState().talentsProofs.status;
			}
			const { data } = await proofAPI.getTalentProofs(talentId, page, status);
			const formatPage = page >= 0 ? page : 0;
			return { ...data, formatPage };
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
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		resetList: state => {
			Object.keys(state).forEach(key => {
				state[key] = initialState[key];
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTalentsProofs.fulfilled, (state, action) => {
				state.proofsList = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
				state.status = action.payload.content[0]?.status;
				state.currentPage = action.payload.formatPage + 1;
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
export const getProofsCurrentPage = state => state.talentsProofs.currentPage;
export const proofsPendingStatus = state => state.talentsProofs.isFetching;
export const getProofError = state => state.talentsProofs.error;
export const getListStatus = state => state.talentsProofs.status;

export const { deleteProofFromList, setCurrentPage, resetList } = proofsSlice.actions;
export default proofsSlice.reducer;
