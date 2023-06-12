import React from 'react';
import { Provider } from 'react-redux';
import '../../App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../index.js';
import { store } from '../../redux/store';

export const forCosmos = Component => props => {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Component {...props} />
			</Provider>
		</ThemeProvider>
	);
};
