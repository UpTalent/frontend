import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
