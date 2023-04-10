import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import talents from './reducers/talents';
import authentification from './reducers/authentification';
import systemMessage from './reducers/systemMessages';
import talentsProofs from './reducers/talentsProof';
import proof from './reducers/proof';

export const store = configureStore({
	reducer: {
		talents,
		authentification,
		systemMessage,
		talentsProofs,
		proof,
	},
	devTools: true,
});

export const useStoreDispatch = () => useDispatch();
