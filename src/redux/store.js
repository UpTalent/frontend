import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import dataList from './reducers/dataList';
import authentification from './reducers/authentification';
import systemMessage from './reducers/systemMessages';
import proof from './reducers/proof';
import skills from './reducers/skills';
import userItems from './reducers/userItems';

export const store = configureStore({
	reducer: {
		dataList,
		authentification,
		systemMessage,
		proof,
		skills,
		userItems,
	},
	devTools: true,
});

export const useStoreDispatch = () => useDispatch();
