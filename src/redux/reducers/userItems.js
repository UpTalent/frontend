import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setSystemMessage } from './systemMessages';
import { vacancyAPI } from '../../api/vacancyAPI';
import { proofAPI } from '../../api/proofAPI';

const initialState = {
	itemsList: [],
	total_pages: 0,
	currentPage: 1,
	isFetching: false,
	error: null,
};

export const getItemsList = createAsyncThunk(
	'getItemsList',
	async (params, thunkAPI) => {
		try {
			const { id, page, status, item } = params;
			const formatPage = page >= 0 ? page : 0;
			const { data } =
				item === 'proofs'
					? await proofAPI.getTalentProofs(id, formatPage, status)
					: await vacancyAPI.getSponsorsVacancies(id, formatPage, status);
			return { ...data, formatPage };
		} catch (error) {
			thunkAPI.dispatch(setSystemMessage(true, error.message, 'error'));
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const itemsSlice = createSlice({
	name: 'userItems',
	initialState,
	reducers: {
		deleteItemFromList: (state, action) => {
			state.proofsList = state.itemsList.filter(
				item => item.id !== action.payload,
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
			.addCase(getItemsList.fulfilled, (state, action) => {
				state.itemsList = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
				state.currentPage = action.payload.formatPage + 1;
			})
			.addCase(getItemsList.pending, state => {
				state.isFetching = true;
			})
			.addCase(getItemsList.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const getItemList = state => state.userItems.itemsList;
export const getItemsTotalPages = state => state.userItems.total_pages;
export const getItemsCurrentPage = state => state.userItems.currentPage;
export const itemsPendingStatus = state => state.userItems.isFetching;
export const getItemError = state => state.userItems.error;

export const { deleteItemFromList, setCurrentPage, resetList } =
	itemsSlice.actions;
export default itemsSlice.reducer;
