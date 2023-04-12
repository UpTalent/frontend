import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Profile } from '../components/Profile';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';
import { TalentsPage } from '../components/TalentsPage/TalentsPage';
import { ProofPage } from '../components/ProofPage/ProofPage';
import { CreateProof } from '../components/CreateProof';
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
				element: <TalentsPage />,
			},
			{
				path: 'proofs/*',
				element: <ProofPage />,
			},
			{
				path: 'talent/:talentId/*',
				element: <Profile />,
				children: [
					{
						path: 'createProof',
						element: <CreateProof />,
					},
				],
			},
		],
	},
]);
