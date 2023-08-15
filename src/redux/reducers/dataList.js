import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { talentsAPI } from '../../api/talentsAPI';
import { proofAPI } from '../../api/proofAPI';
import { vacancyAPI } from '../../api/vacancyAPI';

const initialState = {
	listWithData: [],
	total_pages: 0,
	isFetching: false,
	content: null,
	filter: {
		skills: [],
	},
};

export const getTalentsList = createAsyncThunk(
	'getTalents',
	async (params, thunkAPI) => {
		try {
			const { page, filter } = params;
			const { data } = await talentsAPI.getTalents(page, null, filter);
			thunkAPI.dispatch(updateList('talents', data));
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
			const { page, alignment, filter } = params;
			const { data } = await proofAPI.getAllProofs(page, alignment, filter);
			thunkAPI.dispatch(updateList('proofs', data));
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	},
);

export const getVacanciesList = createAsyncThunk(
	'getVacancies',
	async (params, thunkAPI) => {
		try {
			const { page, alignment, filter } = params;
			const { data } = await vacancyAPI.getAllVacancies(
				page,
				alignment,
				filter,
			);
			thunkAPI.dispatch(updateList('vacancies', data));
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	},
);

export const getResponsesList = createAsyncThunk(
	'getResponses',
	async (params, thunkAPI) => {
		try {
			const { page } = params;
			const { data } = await talentsAPI.getTalentResponses(page);
			thunkAPI.dispatch(updateList('responses', data));
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
		updateList: {
			reducer: (state, action) => {
				state.listWithData = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
				state.content = action.payload.listName;
			},
			prepare: (listName, data) => ({
				payload: { listName, ...data },
			}),
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
		deleteResponseItem: (state, action) => {
			state.listWithData = state?.listWithData?.filter(item => item?.vacancy_submission?.id !== action.payload)
		},
		setFilter: {
			reducer: (state, action) => {
				state.filter[action.payload.filterBy] = action.payload.data;
			},
			prepare: (filterBy, data) => ({ payload: { filterBy, data } }),
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTalentsList.pending, state => {
				state.isFetching = true;
			})

			.addCase(getProofsList.pending, state => {
				state.isFetching = true;
			})

			.addCase(getVacanciesList.pending, state => {
				state.isFetching = true;
			})

			.addCase(getResponsesList.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getGridList = state => state.dataList.listWithData;
export const getGridTotalPages = state => state.dataList.total_pages;
export const pendingStatus = state => state.dataList.isFetching;
export const getGridItem = state => state.dataList.content;
export const getFilter = state => state.dataList.filter;

export const { updateList, clearList, setFilter, deleteResponseItem } = dataListSlice.actions;
export default dataListSlice.reducer;
