import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	proofsList: [],
	total_pages: 0,
	isFetching: false,
	error: null,
};

const getTalentsProofs = createAsyncThunk(
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
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTalentsProofs.fulfilled, (state, action) => {
				state.proofsList = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
			})
			.addCase(getTalentsProofs.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getProofList = state => state.talentsProofs.proofsList;
export const getTotalPages = state => state.talentsProofs.total_pages;

export default proofsSlice.reducer;
