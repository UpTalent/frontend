import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { vacancyAPI } from '../../api/vacancyAPI';

const initialState = {
	vacanciesList: [],
	total_pages: 0,
	isFetching: false,
};

export const getVacancies = createAsyncThunk('getVacancies', async page => {
	const { data } = await vacancyAPI.getAllVacancies(page);
	return data;
});

const vacanciesSlice = createSlice({
	name: 'vacancies',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getVacancies.fulfilled, (state, action) => {
				state.vacanciesList = action.payload.content;
				state.total_pages = action.payload.total_pages;
				state.isFetching = false;
			})
			.addCase(getVacancies.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getVacanciesList = state => state.vacancies.vacanciesList;
export const getVacanciesTotalPages = state => state.vacancies.total_pages;
export const pendingVacanciesStatus = state => state.vacancies.isFetching;

export default vacanciesSlice.reducer;
