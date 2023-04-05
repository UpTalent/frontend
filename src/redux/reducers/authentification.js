import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';

const initialState = {
	isAuth: false,
	talent_id: null,
	firstName: '',
};

const authSlice = createSlice({
	name: 'authentification',
	initialState,
	reducers: {
		setAuthTalent: (state, action) => (state.isAuth = action.payload),
		setAuthTalentData: {
			reducer: (state, action) => (state = action.payload),
			prepare: (firstName, talent_id, isAuth) => ({
				payload: { firstName, talent_id, isAuth },
			}),
		},
	},
});

export const authentificateTalent = createAsyncThunk(
	'authentificateTalent',
	async (params, { dispatch }) => {
		const { method, talentInfo } = params;
		const { data } = await authAPI[method](talentInfo);
		setAuthToken(data.jwt_token);

		const { firstname, talent_id } = parseJwt(data.jwt_token);

		dispatch(setAuthTalentData(firstname, talent_id, true));
	},
);

export const { setAuthTalentData, setAuthTalent } = authSlice.actions;

export default authSlice.reducer;
