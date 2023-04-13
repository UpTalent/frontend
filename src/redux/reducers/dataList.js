import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { talentsAPI } from '../../api/talentsAPI';
import { proofAPI } from '../../api/proofAPI';

const initialState = {
	listWithData: [],
	total_pages: 0,
	isFetching: false,
	content: null
};

export const getTalentsList = createAsyncThunk(
	'getTalents',
	async (page, thunkAPI) => {
		try {
			const { data } = await talentsAPI.getTalents(page);
			thunkAPI.dispatch(updateList(data));
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	},
);

export const getProofsList = createAsyncThunk(
	'getProofs',
	async (params, thunkAPI) => {
		try {
			const { page, alignment } = params;
			const { data } = await proofAPI.getAllProofs(page, alignment);
			thunkAPI.dispatch(updateList(data));
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	},
);

const dataListSlice = createSlice({
	name: 'dataList',
	initialState,
	reducers: {
		updateList: (state, action) => {
			state.listWithData = action.payload.content;
			state.total_pages = action.payload.total_pages;
			state.isFetching = false;
		},
		clearList: state => {
			Object.keys(state).forEach(key => {
				if (key === 'isFetching') {
					state[key] = true;
				} else {
					state[key] = initialState[key];
				}
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTalentsList.pending, state => {
				state.isFetching = true;
			})
			.addCase(getTalentsList.fulfilled, state => {
				state.content = 'talents';
			})
			.addCase(getProofsList.fulfilled, state => {
				state.content = 'proofs';
			})
			.addCase(getProofsList.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getGridList = state => state.dataList.listWithData;
export const getGridTotalPages = state => state.dataList.total_pages;
export const pendingStatus = state => state.dataList.isFetching;
export const getGridItem = state => state.dataList.content;

export const { updateList, clearList } = dataListSlice.actions;
export default dataListSlice.reducer;
