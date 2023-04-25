import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	authApp,
	getIsPending,
	getKudos,
	getRole,
} from './redux/reducers/authentification';
import { Loader } from './components/shared/Loader';
import { PopUpMessage } from './components/shared/PopUpMessage';

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const role = useSelector(getRole);
	const isPending = useSelector(getIsPending);

	useEffect(() => {
		dispatch(authApp());
		if (role === 'sponsor') {
			dispatch(getKudos());
		}
	}, [role]);

	return (
		<>
			{!isPending ? (
				<>
					<Header />
					<div className='appContainer'>
						<Outlet />
						{location.pathname.endsWith('/register') && <RegistrationForm />}
						{location.pathname.endsWith('/login') && <LoginForm />}
						<PopUpMessage />
					</div>
					<Footer />
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export default App;
