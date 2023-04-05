import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Profile } from '../components/Profile';
import { TalentPageContainer } from '../components/TalentsPage/TalentPageContainer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Provider store={store}>
				<App />
			</Provider>
		),
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Navigate to='/home' replace={true} />,
			},
			{
				path: 'home/*',
				element: <Home />,
			},
			{
				path: 'talents/*',
				element: <TalentPageContainer />,
			},
			{
				path: 'talent/:talentId/*',
				element: <Profile />,
			},
		],
	},
]);
