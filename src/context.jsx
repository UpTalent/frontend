import React, { createContext, useEffect, useState } from 'react';
import { parseJwt, setAuthToken } from './api';
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
		setAuthTalent,
	};

	useEffect(() => {
		const jwt = localStorage.getItem('jwt_token');
		if (jwt) {
			const { exp, firstname, talent_id } = parseJwt(jwt);
			const currentTime = new Date();
			const expire = new Date(exp * 1000);

			if (currentTime <= expire) {
				setAuthToken(jwt);
				setIsTalent(true);
				setAuthTalent({ firstname, talent_id });
			} else {
				setAuthToken();
				setIsTalent(false);
			}
		}
	}, []);

	return (
		<Context.Provider value={state}>
			<App />
		</Context.Provider>
	);
};
