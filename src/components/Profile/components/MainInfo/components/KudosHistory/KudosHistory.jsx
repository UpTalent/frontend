import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { sponsorApi } from '../../../../../../api/sponsorAPI';
import styles from '../../../../../shared/Proof/Proof.module.css';

import { KudosedProof } from './components/KudosedProof';
import { CircularProgress, Pagination } from '@mui/material';

export const KudosHistory = () => {
	const { sponsorId } = useParams();
	const [proofs, setProofs] = useState(test);
	const [isFetching, setIsFetching] = useState(false);
	const [total_pages, setTotalPages] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();

	const urlPage = Number(searchParams.get('page')) || 1;
	const [currentPage, setCurrentPage] = useState(urlPage);

	const getProofs = async page => {
		try {
			setIsFetching(true);
			const { data } = await sponsorApi.getKudosedProofs(sponsorId, page);
			console.log(data);
			setProofs(data.content);
			setTotalPages(data.total_pages);
			setIsFetching(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		setCurrentPage(urlPage);
		getProofs(urlPage - 1);
	}, [urlPage]);

	useEffect(() => {
		if (urlPage < 0 || (total_pages < urlPage && total_pages !== 0)) {
			setSearchParams({
				page: 1,
			});
		}
	});

	return (
		<div className={styles.proofContainer}>
			{!isFetching ? (
				<div className={styles.proofs}>
					{proofs.map(el => (
						<KudosedProof key={el.proof_id} proofInfo={el} />
					))}
				</div>
			) : (
				<CircularProgress />
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
	);
};

const test = [
	{
		proof_id: 81,
		icon_number: 3,
		title: 'Proof PUBLISHED',
		total_sum_kudos: 232,
	},
	{
		proof_id: 9,
		icon_number: 9,
		title: 'Proof of Rosendo Luettgen',
		total_sum_kudos: 53,
	},
	{
		proof_id: 8,
		icon_number: 2,
		title: 'Proof of Gricelda Mann',
		total_sum_kudos: 24,
	},
];
