import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import talents from './reducers/talents';
import authentification from './reducers/authentification';
import systemMessage from './reducers/systemMessages';
import talentsProof from './reducers/talentsProof';

export const store = configureStore({
	reducer: {
		talents,
		authentification,
		systemMessage,
		talentsProof,
	},
	devTools: true,
});

export const useStoreDispatch = () => useDispatch();
