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
import Proofs from '../components/Profile/components/MainInfo/components/Proofs/Proofs';
import { MainInfo } from '../components/Profile/components/MainInfo';
import { AboutMe } from '../components/Profile/components/MainInfo/components/AboutMe';
import { SponsorProfile } from '../components/Profile/components/SponsorProfile';
import { TalentProfile } from '../components/Profile/components/TalentProfile/TalentProfile';
import { KudosHistory } from '../components/Profile/components/MainInfo/components/KudosHistory';
import { RestoreProfile } from '../components/RestoreProfile';
import { Statistics } from '../components/Profile/components/Statistics';
import { VerifyEmail } from '../components/VerifyEmail/VerifyEmail';
import { VacancyPage } from '../components/Vacancy';
import Vacancies from '../components/Profile/components/MainInfo/components/Vacancies/Vacancies';
import { CreateVacancy } from '../components/CreateVacancy';
import VacanciesPage from '../components/VacanciesPage/VacanciesPage';
import ResponsePage  from '../components/ResponsePage/ResponsePage';

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
									{
										path: 'vacancies/*',
										element: <Vacancies />,
										children: [
											{
												path: 'createVacancy',
												element: <CreateVacancy />,
											},
										],
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
									{
										path: 'statistics',
										element: <Statistics />,
									},
								],
							},
						],
					},
				],
			},
			{
				path: 'restore/*',
				element: <RestoreProfile />,
			},
			{
				path: 'verify/*',
				element: <VerifyEmail />,
			},
			{
				path: 'vacancy/:vacancyId/*',
				element: <VacancyPage />,
				children: [
					{
						path: 'createVacancy',
						element: <CreateVacancy />,
					},
				],
			},
			{
				path: 'vacancies',
				element: <VacanciesPage />,
			},
			{
				path: 'talent/:talentId/responses',
				element: <ResponsePage />,
			},
		],
	},
]);
