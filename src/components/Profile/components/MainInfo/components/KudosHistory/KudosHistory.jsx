import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { sponsorApi } from '../../../../../../api/sponsorAPI';
import styles from '../../MainInfo.module.css';
import { KudosedProof } from './components/KudosedProof';
import { Pagination } from '@mui/material';
import { ProofLoader } from '../../../../../loaders/ProofLoader/ProofLoader';

export const KudosHistory = () => {
	const { sponsorId } = useParams();
	const [proofs, setProofs] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [total_pages, setTotalPages] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();

	const urlPage = Number(searchParams.get('page')) || 1;
	const [currentPage, setCurrentPage] = useState(urlPage);

	const getProofs = async page => {
		try {
			setIsFetching(true);
			const { data } = await sponsorApi.getKudosedProofs(sponsorId, page);
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
				<div className={styles.items}>
					{proofs.map(el => (
						<KudosedProof key={el.proof_id} proofInfo={el}/>
					))}
				</div>
			) : (
				<ProofLoader />
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
