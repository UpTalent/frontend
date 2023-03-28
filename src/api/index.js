import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export const setAuthToken = (token) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common['Authorization'];
	}
};