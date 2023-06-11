import React from 'react';
import { Provider } from 'react-redux';
import '../App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../index.js';
import { store } from '../redux/store';

const decorator = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>{children}</Provider>
		</ThemeProvider>
	);
};

export default decorator;
