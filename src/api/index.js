import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
	},
});

export const setAuthToken = token => {
	if (token) {
		localStorage.setItem('jwt_token', token);
		console.log(localStorage);
	} else {
		localStorage.clear();
	}
};

export const parseToken = token => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);

	return JSON.parse(jsonPayload);
};
