import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from './Home/Home';
import { NotFound } from './NotFound';
import { Profile } from './Profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'talents',
				element: <div>Talents grid</div>,
			},
			{
				path: 'talent/:talentId',
				element: <Profile/>,
			},
		],
	},
]);
