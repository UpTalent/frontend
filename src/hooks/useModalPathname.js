import { useLocation, useNavigate } from 'react-router-dom';

export const useModalPathname = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const modalPathname = path => {
		navigate({
			pathname: `${location.pathname}/${path}`,
			search: location.search,
		});
	};
	return modalPathname;
};
