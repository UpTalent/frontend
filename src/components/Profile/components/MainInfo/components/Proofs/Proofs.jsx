import React, { useEffect } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { Fab, LinearProgress, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FilterStatus } from './components';
import { useSelector } from 'react-redux';
import {
	getListStatus,
	getProofList,
	getProofsCurrentPage,
	getProofsTotalPages,
	getTalentsProofs,
	proofsPendingStatus,
	resetList,
} from '../../../../../../redux/reducers/talentsProof';
import { useStoreDispatch } from '../../../../../../redux/store';

export const Proofs = ({ isTalentProfile }) => {
	const proofs = useSelector(getProofList);
	const statusList = useSelector(getListStatus);
	const isFetching = useSelector(proofsPendingStatus);
	const total_pages = useSelector(getProofsTotalPages);
	const currentPage = useSelector(getProofsCurrentPage);
	const dispatch = useStoreDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const { talentId } = useParams();

	const getProofs = (status, page) => {
		const fetchData = { talentId, status, page };
		dispatch(getTalentsProofs(fetchData));
	};

	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`);
	};

	useEffect(() => {
		getProofs();
		return () => {
			dispatch(resetList());
		};
	}, [talentId]);

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
						<FilterStatus handleChange={getProofs} status={statusList} />
					</div>
				)}
				{!isFetching ? (
					<div className={styles.proofs}>
						{!proofs.length && (
							<p className={styles.emptyProofList}>
								It's empty in here...for now
							</p>
						)}
						{proofs.map(el => (
							<Proof
								key={el.id}
								proof={el}
								withContent={true}
								showControlls={isTalentProfile}
							/>
						))}
					</div>
				) : (
					<LinearProgress />
				)}
				{Boolean(proofs.length) && (
					<Pagination
						page={currentPage}
						count={total_pages}
						sx={{ alignSelf: 'center' }}
						color='primary'
						size='small'
						onChange={(e, page) => getProofs(null, page - 1)}
					/>
				)}
			</div>
			<Outlet />
		</>
	);
};
