import React, { useEffect } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { Fab, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
	Outlet,
	useOutletContext,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import { FilterStatus } from './components/FilterStatus';
import { useSelector } from 'react-redux';
import {
	getProofList,
	getProofsCurrentPage,
	getProofsTotalPages,
	getTalentsProofs,
	proofsPendingStatus,
	resetList,
} from '../../../../../../redux/reducers/talentsProof';
import { useStoreDispatch } from '../../../../../../redux/store';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { ProofLoader } from '../../../../../loaders/ProofLoader/ProofLoader';

export const Proofs = () => {
	const { isTalentProfile, skills } = useOutletContext();

	const [searchParams, setSearchParams] = useSearchParams();

	const proofs = useSelector(getProofList);
	const isFetching = useSelector(proofsPendingStatus);
	const total_pages = useSelector(getProofsTotalPages);
	const currentPage = useSelector(getProofsCurrentPage);
	const dispatch = useStoreDispatch();

	const modalPathname = useModalPathname();
	const { talentId } = useParams();
	const urlPage = Number(searchParams.get('page')) || 1;
	const filter = searchParams.get('filter');

	const getProofs = (status, page) => {
		const fetchData = { talentId, status, page };
		dispatch(getTalentsProofs(fetchData));
	};

	useEffect(() => {
		const page = urlPage - 1;
		getProofs(filter, page);

		return () => {
			dispatch(resetList());
		};
	}, [talentId, searchParams.get('filter'), urlPage]);

	useEffect(() => {
		if (urlPage < 0 || (total_pages < urlPage && total_pages !== 0)) {
			setSearchParams({
				...Object.fromEntries([...searchParams]),
				page: 1,
			});
		}
	});

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
						<FilterStatus />
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
					<ProofLoader amount={3} />
				)}
				{Boolean(proofs.length) && (
					<Pagination
						page={currentPage}
						count={total_pages}
						sx={{ alignSelf: 'center' }}
						color='primary'
						size='small'
						onChange={(e, page) =>
							setSearchParams({
								...Object.fromEntries([...searchParams]),
								page,
							})
						}
					/>
				)}
			</div>
			<Outlet context={{ skills }} />
		</>
	);
};
