import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Profile } from '../components/Profile';
import { TalentPageContainer } from '../components/TalentsPage/TalentPageContainer';
import { ContextHOC } from '../context';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <ContextHOC />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'talents',
				element: <TalentPageContainer />,
			},
			{
				path: 'talent/:talentId',
				element: <Profile />,
			},
		],
	},
]);
