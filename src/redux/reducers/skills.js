import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { skillsAPI } from '../../api/skillsAPI';

const initialState = {
	skills: [],
};

export const getSkills = createAsyncThunk('getSkills', async thunkAPI => {
	try {
		const { data } = await skillsAPI.getSkills();
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
});

const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {
		updateSkills: (state, action) => {
			state.skills = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(getSkills.fulfilled, (state, action) => {
			state.skills = action.payload;
		});
	},
});

export const getAllSkills = state => state.skills.skills;
export const { updateSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
