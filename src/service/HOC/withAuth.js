import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../redux/reducers/authentification';
import { useNavigate } from 'react-router-dom';

export const withAuth = (Component, ...props) => {
	const isAuth = useSelector(getIsAuth);
	const navigate = useNavigate();

	if (!isAuth) {
		navigate('/login');
	}

	return <Component {...props} />;
};
