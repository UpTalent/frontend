import React, { useEffect } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { Fab, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateProof } from '../../../../../CreateProof';
import { FilterStatus } from './components';
import { useSelector } from 'react-redux';
import {
	getProofList,
	getTalentsProofs,
	proofsPendingStatus,
} from '../../../../../../redux/reducers/talentsProof';
import { useStoreDispatch } from '../../../../../../redux/store';

export const Proofs = ({ isTalentProfile }) => {
	const proofs = useSelector(getProofList);
	const isFetching = useSelector(proofsPendingStatus);
	const dispatch = useStoreDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const { talentId } = useParams();

	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`);
	};

	useEffect(() => {
		const fetchData = { talentId };
		dispatch(getTalentsProofs(fetchData));
	}, [location.pathname]);

	return (
		<>
			<div className={styles.proofContainer}>
				{isTalentProfile && (
					<div className={styles.proofContolls}>
						<Fab
							color='secondary'
							aria-label='add'
							onClick={() => {
								modalPathname('createProof');
							}}
						>
							<AddIcon />
						</Fab>
						<FilterStatus talentId={talentId} />
					</div>
				)}
				{!isFetching ? (
					<>
						{proofs.map(el => (
							<Proof
								key={el.id}
								proof={el}
								withContent={true}
								showControlls={isTalentProfile}
							/>
						))}
					</>
				) : (
					<LinearProgress />
				)}
			</div>
			<Outlet />
			{location.pathname.endsWith('/createProof') && <CreateProof />}
		</>
	);
};
