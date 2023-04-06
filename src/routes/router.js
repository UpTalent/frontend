import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Profile } from '../components/Profile';

import { ContextHOC } from '../context';
import { TalentsPage } from '../components/TalentsPage/TalentsPage';
import { ProofPage } from '../components/ProofPage/ProofPage';
export const router = createBrowserRouter([
	{
		path: '/',
		element: <ContextHOC />,
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
			},
		],
	},
]);
