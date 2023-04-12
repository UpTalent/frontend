import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';
import { setSystemMessage } from './systemMessages';
import { deleteProofFromList, getTalentsProofs } from './talentsProof';

const initialState = {
	id: 0,
	icon_number: 0,
	title: '',
	summary: '',
	content: '',
	published: null,
	status: '',
	isFetching: false,
};

export const publishDraftProof = createAsyncThunk(
	'publishDraftProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, draftProof } = params;

			const { headers } = await proofAPI.createProof(talentId, draftProof);

			const proofId = Number(headers.get('Location').split('/').splice(-1)[0]);
			thunkAPI.dispatch(
				editProof({
					talentId,
					proofId,
					draftProof: { ...draftProof, status: 'PUBLISHED' },
					status: 'PUBLISHED',
				}),
			);

			return proofId;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const editProof = createAsyncThunk(
	'editProof',
	async (params, thunkAPI) => {
		try {
			let { talentId, proofId, status, draftProof } = params;
			const action = status !== 'DRAFT' ? 'published' : 'edited';
			if (!draftProof) {
				draftProof = thunkAPI
					.getState()
					.talentsProofs.proofsList.find(i => i.id === proofId);
				draftProof = { ...draftProof, status };
			}

			const { data } = await proofAPI.editProof(talentId, proofId, draftProof);
			await thunkAPI.dispatch(getTalentsProofs({ talentId, status }));
			thunkAPI.dispatch(
				setSystemMessage(true, `Proof was successfully ${action}`),
			);
			thunkAPI.dispatch(clearProof());

			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const deleteProof = createAsyncThunk(
	'deleteProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, proofId } = params;

			await proofAPI.deleteProof(talentId, proofId);
			thunkAPI.dispatch(
				setSystemMessage(true, 'Your proof was succesfully deleted'),
			);
			const amountOfProofs =
				thunkAPI.getState().talentsProofs.proofsList.length;
			let page = thunkAPI.getState().talentsProofs.currentPage - 1;
			thunkAPI.dispatch(deleteProofFromList(proofId));
			if (amountOfProofs === 1) {
				page -= 1;
			}
			thunkAPI.dispatch(getTalentsProofs({ talentId, page }));
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

export const fetchProof = createAsyncThunk(
	'fetchProof',
	async (params, thunkAPI) => {
		try {
			const { proofId } = params;
			const data = thunkAPI
				.getState()
				.talentsProofs.proofsList.find(i => i.id === proofId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);

const proofSlice = createSlice({
	name: 'talentsProofs',
	initialState,
	reducers: {
		updateProof: (state, action) => {
			Object.keys(state).forEach(key => {
				state[key] = action.payload[key];
			});
		},
		clearProof: state => {
			Object.keys(state).forEach(key => {
				state[key] = initialState[key];
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(deleteProof.fulfilled, state => {
				Object.keys(state).forEach(key => {
					state[key] = initialState[key];
				});
			})
			.addCase(fetchProof.fulfilled, (state, action) => {
				Object.keys(state).forEach(key => {
					if (key === 'isFetching') {
						state.isFetching = false;
					} else {
						state[key] = action.payload[key];
					}
				});
			})
			.addCase(fetchProof.pending, state => {
				state.isFetching = true;
			});
	},
});

export const getProof = state => state.proof;
export const { updateProof, clearProof } = proofSlice.actions;

export default proofSlice.reducer;
