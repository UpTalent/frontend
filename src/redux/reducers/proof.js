import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';
import { setSystemMessage } from './systemMessages';
import { deleteProofFromList, getTalentsProofs } from './talentsProof';

const prepareProof = proof => {
	if (proof.skills) {
		const formatSkills = proof.skills.map(el => el?.id);
		delete proof.skills;
		proof.skillIds = formatSkills;
	}
	return proof;
};

const initialState = {
	proof: {
		id: 0,
		icon_number: 0,
		title: '',
		summary: '',
		content: '',
		published: null,
		status: '',
		skills: [],
	},
	isFetching: false,
	error: null,
};

export const publishDraftProof = createAsyncThunk(
	'publishDraftProof',
	async (params, thunkAPI) => {
		try {
			const { talentId, draftProof } = params;

			const { headers } = await proofAPI.createProof(
				talentId,
				prepareProof(draftProof),
			);

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
			thunkAPI.dispatch(setSystemMessage(true, error.message, 'error'));
		}
	},
);

export const createDraftProof = createAsyncThunk(
	'createDraftProf',
	async (params, thunkAPI) => {
		try {
			let { talentId, data } = params;
			await proofAPI.createProof(talentId, prepareProof(data));
			thunkAPI.dispatch(
				setSystemMessage(true, 'Proof was successfully created'),
			);
			thunkAPI.dispatch(clearProof());
			thunkAPI.dispatch(getTalentsProofs({ talentId, status: data.status }));
		} catch (err) {
			thunkAPI.dispatch(setSystemMessage(true, err.message, 'error'));
		}
	},
);

export const editProof = createAsyncThunk(
	'editProof',
	async (params, thunkAPI) => {
		try {
			let { talentId, proofId, status, draftProof } = params;
			const action =
				status !== 'DRAFT'
					? status === 'PUBLISHED'
						? 'published'
						: 'hidden'
					: 'edited';
			if (!draftProof) {
				draftProof = thunkAPI
					.getState()
					.talentsProofs.proofsList.find(i => i.id === proofId);
				draftProof = { ...draftProof, status };
			}

			const { data } = await proofAPI.editProof(
				talentId,
				proofId,
				prepareProof(draftProof),
			);
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
			const { talentId, proofId, status } = params;

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
			thunkAPI.dispatch(getTalentsProofs({ talentId, page, status }));
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
			Object.keys(state.proof).forEach(key => {
				state.proof[key] = action.payload[key];
			});
		},
		clearProof: state => {
			Object.keys(state.proof).forEach(key => {
				state.proof[key] = initialState.proof[key];
			});
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(deleteProof.fulfilled, state => {
				Object.keys(state.proof).forEach(key => {
					state.proof[key] = initialState.proof[key];
				});
			})
			.addCase(fetchProof.fulfilled, (state, action) => {
				Object.keys(state.proof).forEach(
					key => (state.proof[key] = action.payload[key]),
				);
				state.isFetching = false;
			})
			.addCase(fetchProof.pending, state => {
				state.isFetching = true;
			})
			.addCase(publishDraftProof.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const getProof = state => state.proof.proof;
export const isFetching = state => state.proof.isFetching;
export const proofError = state => state.proof.error;
export const { updateProof, clearProof, setError } = proofSlice.actions;

export default proofSlice.reducer;
