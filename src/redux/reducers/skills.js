import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { skillsAPI } from '../../api/skillsAPI';

const colorList = [
	'#FFBF5B',
	'#449DD1',
	'#F4AFB4',
	'#FE5F55',
	'#12BA60',
	'#9000B3',
	'#E3655B',
	'#C84630',
	'#09E85E',
	'#D67AB1',
	'#FFA938',
	'#0D69FF',
	'#A42CD6',
	'#FFB6C1',
	'#FFC0CB',
	'#FFA07A',
	'#FFD700',
	'#FF8C00',
	'#FF4500',
	'#FF69B4',
	'#00FA9A',
	'#00BFFF',
	'#9400D3',
	'#FF00FF',
	'#008080',
	'#008000',
	'#32CD32',
	'#800080',
	'#FF1493',
	'#8A2BE2',
	'#FF7F50',
	'#7B68EE',
	'#FF6347',
	'#DC143C',
	'#FFC125',
	'#00CED1',
	'#FF4500',
	'#FFA500',
	'#9ACD32',
];
const pickColor = () => colorList[Math.floor(Math.random() * colorList.length)];

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

	extraReducers: builder => {
		builder.addCase(getSkills.fulfilled, (state, action) => {
			state.skills = action.payload.map(el => ({ ...el, color: pickColor() }));
		});
	},
});

export const getAllSkills = state => state.skills.skills;

export default skillsSlice.reducer;
