import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { authApp } from './redux/reducers/authentification';


const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authApp());
	}, []);

	return (
		<>
			<Header />
			<div className='appContainer'>
				<Outlet />
				{location.pathname.endsWith('/register') && <RegistrationForm />}
				{location.pathname.endsWith('/login') && <LoginForm />}
			</div>
			<Footer />
		</>
	);
};

export default App;
