import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from '../components/Home';
import { NotFound } from '../components/NotFound';
import { Profile } from '../components/Profile';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';
import TalentsPage from '../components/TalentsPage/TalentsPage';
import ProofPage from '../components/ProofPage/ProofPage';
import { CreateProof } from '../components/CreateProof';
import { Proofs } from '../components/Profile/components/MainInfo/components/Proofs';
import { MainInfo } from '../components/Profile/components/MainInfo';
import { AboutMe } from '../components/Profile/components/MainInfo/components/AboutMe';
import { SponsorProfile } from '../components/Profile/components/SponsorProfile';
import { TalentProfile } from '../components/Profile/components/TalentProfile/TalentProfile';
import { KudosHistory } from '../components/Profile/components/MainInfo/components/KudosHistory';
import { RestoreProfile } from '../components/RestoreProfile';
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
				path: 'profile/*',
				element: <Profile />,
				children: [
					{
						path: 'sponsor/:sponsorId/*',
						element: <SponsorProfile />,
						children: [
							{
								element: <MainInfo />,
								children: [
									{
										index: true,
										element: <KudosHistory />,
									},
								],
							},
						],
					},
					{
						path: 'talent/:talentId/*',
						element: <TalentProfile />,
						children: [
							{
								element: <MainInfo />,
								children: [
									{
										index: true,
										element: <AboutMe />,
									},
									{
										path: 'proofs/*',
										element: <Proofs />,
										children: [
											{
												path: 'createProof',
												element: <CreateProof />,
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				path: '/restore',
				element: <RestoreProfile />,
			},
		],
	},
]);
