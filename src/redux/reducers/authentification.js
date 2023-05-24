import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseJwt, setAuthToken } from '../../api';
import { authAPI } from '../../api/authAPI';
import { profileAPI } from '../../api/profileAPI';
import { setSystemMessage } from './systemMessages';

const initialState = {
	isAuth: false,
	id: null,
	name: '',
	error: null,
	isPending: true,
	role: '',
	email: '',
	kudos: 0,
};

const authSlice = createSlice({
	name: 'authentification',
	initialState,
	reducers: {
		logOut: state => {
			Object.keys(state).forEach(key => {
				state[key] = initialState[key];
			});
			state.isPending = false;
			setAuthToken();
		},
		clearError: state => {
			state.error = null;
		},
		authApp: state => {
			const jwt = localStorage.getItem('jwt_token');
			const name = localStorage.getItem('userName');
			if (!jwt) {
				state.isPending = false;
				return state;
			}

			const { exp, id, role, sub } = parseJwt(jwt);
			const currentTime = new Date();
			const expire = new Date(exp * 1000);

			if (currentTime <= expire) {
				setAuthToken(jwt);
				state.id = id;
				state.name = name;
				state.isAuth = true;
				state.role = role.toLowerCase();
				state.email = sub;
			} else {
				localStorage.removeItem('jwt_token');
				localStorage.removeItem('userName');
				state.isAuth = false;
			}
			state.isPending = false;
		},
		updateFirstName: (state, action) => {
			state.name = action.payload;
			localStorage.setItem('userName', action.payload);
		},
		setKudos: (state, action) => {
			state.kudos = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authentificateTalent.fulfilled, (state, action) => {
				state.isAuth = true;
				state.id = action.payload.id;
				state.name = action.payload.name;
				state.role = action.payload.role;
				state.email = action.payload.sub;
			})
			.addCase(saveUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.id = action.payload.id;
				state.name = action.payload.name;
				state.role = action.payload.role;
				state.email = action.payload.sub;
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
			const { userInfo, userRole, method } = params;

			const { data } = await authAPI.authentificate(userInfo, userRole, method);
			setAuthToken(data.jwt_token);

			const { name, id, role, sub } = parseJwt(data.jwt_token);

			localStorage.setItem('userName', name);
			if (role === 'sponsor') {
				thunkAPI.dispatch(getKudos(id));
			}
			return { name, id, role, sub };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const saveUser = createAsyncThunk(
	'saveUser',
	async (params, thunkAPI) => {
		try {
			const { token } = params;
			setAuthToken(token);

			const { name, id, role, sub } = parseJwt(token);

			localStorage.setItem('userName', name);
			if (role === 'sponsor') {
				thunkAPI.dispatch(getKudos(id));
			}
			return { name, id, role, sub };
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const getKudos = createAsyncThunk('getKudos', async (id, thunkAPI) => {
	const idOfUser = id || thunkAPI.getState().authentification.id;
	const { data } = await profileAPI.getUser('sponsor', idOfUser);
	thunkAPI.dispatch(setKudos(data.kudos));
});

export const getErrors = state => state.authentification.error;
export const getAuthId = state => state.authentification.id;
export const getName = state => state.authentification.name;
export const getIsAuth = state => state.authentification.isAuth;
export const getIsPending = state => state.authentification.isPending;
export const getRole = state => state.authentification.role;
export const getUserKudos = state => state.authentification.kudos;
export const getUserEmail = state => state.authentification.email;

export const getAuthUser = state => ({
	name: state.authentification.name,
	id: state.authentification.id,
	role: state.authentification.role,
	isAuth: state.authentification.isAuth,
});

export const { logOut, clearError, authApp, updateFirstName, setKudos } =
	authSlice.actions;

export default authSlice.reducer;
