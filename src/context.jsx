import React, { createContext, useState } from 'react';
import App from './App';

export const Context = createContext();

export const ContextHOC = () => {
	const [isTalent, setIsTalent] = useState(false);
	const [talentList, setTalentList] = useState({});
	const [authTalent, setAuthTalent] = useState({});

	const state = {
		isTalent,
		setIsTalent,
		talentList,
		setTalentList,
		authTalent,
		setAuthTalent
	};

	return (
		<Context.Provider value={state}>
			<App />
		</Context.Provider>
	);
};
