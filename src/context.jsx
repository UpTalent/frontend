import React, { createContext, useEffect, useState } from 'react';
import { parseJwt, setAuthToken } from './api';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const Context = createContext();

export const ContextHOC = () => {

	const [isTalent, setIsTalent] = useState(false);
	const [authTalent, setAuthTalent] = useState({});

	const state = {
		isTalent,
		setIsTalent,
		
		authTalent,
		setAuthTalent,
	
	};

	useEffect(() => {
		const jwt = localStorage.getItem('jwt_token');
		if (!jwt) return;

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
	}, []);

	return (
		<Context.Provider value={state}>
			<Provider store={store}>
				<App />
			</Provider>
		</Context.Provider>
	);
};
