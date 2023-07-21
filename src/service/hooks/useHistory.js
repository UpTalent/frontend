import { useLocation} from 'react-router-dom';

export const useHistory = () => {
	const location = useLocation();

	const linkTitle = location.pathname.split('/').at(-1);
	const currentPath = {
		link: location.pathname + location.search,
		name: linkTitle[0].toUpperCase() + linkTitle.substring(1, linkTitle.length),
	};

	return currentPath;
};
