import React from 'react';
import { Provider } from 'react-redux';
import '../App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../index.js';
import { store } from '../redux/store';
import { Router } from 'react-router-dom';

const decorator = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Provider store={store}>{children}</Provider>
			</Router>
		</ThemeProvider>
	);
};

export default decorator;
