import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { LoginForm } from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { authApp, getIsPending } from './redux/reducers/authentification';
import { Loader } from './components/shared/Loader';

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isPending = useSelector(getIsPending);

	useEffect(() => {
		dispatch(authApp());
	}, []);

	return (
		<>
			{!isPending ? (
				<>
					<Header />
					<div className='appContainer'>
						<Outlet />
						{location.pathname.endsWith('/register') && <RegistrationForm />}
						{location.pathname.endsWith('/login') && <LoginForm />}
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
