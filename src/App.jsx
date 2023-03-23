import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App = () => {
	return (
		<>
			<Header />
			<div className="appContainer">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default App;
