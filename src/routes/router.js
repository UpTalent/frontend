import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from './Home';
import { NotFound } from './NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: <Home />
			},
			{
				path: 'talents',
				element: <div>Talents grid</div>
			},
			{
				path: 'talent/:talentId',
				element: <div>Talent's page</div>
			}
		]

	},
]);
