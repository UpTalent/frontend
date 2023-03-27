import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		navigate('home');
	}, []);
	return (
		<>
			<Header />
			<div className='appContainer'>
				<Outlet />
				{location.pathname.endsWith('/registrate') && <RegistrationForm />}
				{location.pathname.endsWith('/login') && <LoginForm />}
			</div>
			<Footer />
		</>
	);
};

export default App;
