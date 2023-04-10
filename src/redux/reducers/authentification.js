import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';

const initialState = {
	isAuth: false,
	talent_id: null,
	firstName: '',
	error: null,
	isPending: true,
};

const authSlice = createSlice({
	name: 'authentification',
	initialState,
	reducers: {
		logOut: state => {
			state.isAuth = false;
			state.talent_id = null;
			state.firstName = '';
			state.error = null;
			localStorage.removeItem('jwt_token');
		},
		clearError: state => {
			state.error = null;
		},
		authApp: state => {
			const jwt = localStorage.getItem('jwt_token');
			if (!jwt) {
				state.isPending = false;
				return state;
			}

			const { exp, firstname, talent_id } = parseJwt(jwt);
			const currentTime = new Date();
			const expire = new Date(exp * 1000);

			if (currentTime <= expire) {
				setAuthToken(jwt);
				state.talent_id = talent_id;
				state.firstName = firstname;
				state.isAuth = true;
			} else {
				localStorage.removeItem('jwt_token');
				state.isAuth = false;
			}
			state.isPending = false;
		},
		updateFirstName: (state, action) => {
			state.firstName = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authentificateTalent.fulfilled, (state, action) => {
				state.isAuth = true;
				state.talent_id = action.payload.talent_id;
				state.firstName = action.payload.firstname;
			})
			.addCase(authentificateTalent.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const authentificateTalent = createAsyncThunk(
	'authentificateTalent',
	async (params, thunkAPI) => {
		try {
			const { method, talentInfo } = params;
			const { data } = await authAPI.authentificate(talentInfo, method);
			setAuthToken(data.jwt_token);

			const { firstname, talent_id } = parseJwt(data.jwt_token);

			return { firstname, talent_id };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const getErrors = state => state.authentification.error;
export const getAuthTalentId = state => state.authentification.talent_id;
export const getFirstName = state => state.authentification.firstName;
export const getIsAuth = state => state.authentification.isAuth;
export const getIsPending = state => state.authentification.isPending;

export const { logOut, clearError, authApp, updateFirstName } =
	authSlice.actions;

export default authSlice.reducer;
