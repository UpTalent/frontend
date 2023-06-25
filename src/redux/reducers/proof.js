import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { proofAPI } from '../../api/proofAPI';
import { setSystemMessage } from './systemMessages';
import { deleteItemFromList, getItemsList } from './userItems';

export const prepareItem = item => {
	const updatedItem = { ...item };

	if (item.skills) {
		const formatSkills = item.skills.map(el => el?.id);

		delete updatedItem.skills;

		updatedItem.skillIds = formatSkills;
	}
	return updatedItem;
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
				prepareItem(draftProof),
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
			await proofAPI.createProof(talentId, prepareItem(data));
			thunkAPI.dispatch(
				setSystemMessage(true, 'Proof was successfully created'),
			);
			thunkAPI.dispatch(clearProof());
			thunkAPI.dispatch(
				getItemsList({ id: talentId, status: data.status, item: 'proofs' }),
			);
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
					.userItems.itemsList.find(i => i.id === proofId);
				draftProof = { ...draftProof, status };
			}

			const { data } = await proofAPI.editProof(
				talentId,
				proofId,
				prepareItem(draftProof),
			);
			await thunkAPI.dispatch(
				getItemsList({ id: talentId, status, item: 'proofs' }),
			);
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

			thunkAPI.dispatch(
				deleteItemFromList({
					status,
					itemId: proofId,
					id: talentId,
					item: 'proofs',
				}),
			);
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
				.userItems.itemsList.find(i => i.id === proofId);
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
