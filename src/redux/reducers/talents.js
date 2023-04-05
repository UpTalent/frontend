import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { talentsAPI } from '../../api/talentsAPI';

const initialState = {
	talentsList: [],
	total_pages: 0,
};

export const getTalentsList = createAsyncThunk(
    'getTalents', 
    async page => {
	const { data } = await talentsAPI.getTalents(page);
	return data;
});

const talentsSlice = createSlice({
	name: 'talents',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getTalentsList.fulfilled, (state, action) => {
			state.talentsList = action.payload.content;
			state.total_pages = action.payload.total_pages;
		});
	},
});

export const getTalentList = state => state.talents.talentsList;
export const getTotalePages = state => state.talents.total_pages;

export default talentsSlice.reducer;
