import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';

const initialState = {
	isAuth: false,
	id: null,
	name: '',
	error: null,
	isPending: true,
	role: '',
};

const authSlice = createSlice({
	name: 'authentification',
	initialState,
	reducers: {
		logOut: state => {
			state.isAuth = false;
			state.id = null;
			state.name = '';
			state.error = null;
			state.role = '';
			setAuthToken();
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

			const { exp, name, id } = parseJwt(jwt);
			const currentTime = new Date();
			const expire = new Date(exp * 1000);

			if (currentTime <= expire) {
				setAuthToken(jwt);
				state.id = id;
				state.name = name;
				state.isAuth = true;
			} else {
				localStorage.removeItem('jwt_token');
				state.isAuth = false;
			}
			state.isPending = false;
		},
		updateFirstName: (state, action) => {
			state.name = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authentificateTalent.fulfilled, (state, action) => {
				state.isAuth = true;
				state.id = action.payload.id;
				state.name = action.payload.name;
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
			const { talentInfo, role, method } = params;
			const { data } = await authAPI.authentificate(
				talentInfo,
				(role = 'talent'),
				method,
			);
			setAuthToken(data.jwt_token);

			const { name, id } = parseJwt(data.jwt_token);

			return { name, id };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const getErrors = state => state.authentification.error;
export const getAuthId = state => state.authentification.id;
export const getName = state => state.authentification.name;
export const getIsAuth = state => state.authentification.isAuth;
export const getIsPending = state => state.authentification.isPending;
export const getRole = state => state.authentification.role;

export const { logOut, clearError, authApp, updateFirstName } =
	authSlice.actions;

export default authSlice.reducer;
