import React, { createContext, useState } from 'react';
import App from './App';

export const Context = createContext();

export const ContextHOC = () => {
	const testUser = {};
	const [isTalent, setIsTalent] = useState(false);
	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState(testUser);
	const [talentList, setTalentList] = useState({});
	const [authTalent, setAuthTalent] = useState({});

	const state = {
		isTalent,
		setIsTalent,
		isTalentProfile,
		setIsTalentProfile,
		talent,
		setTalent,
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
