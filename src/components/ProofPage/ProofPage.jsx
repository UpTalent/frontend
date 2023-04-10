import React, { useEffect, useState } from 'react';
import { PagesGrid } from '../shared/Grid';
import { CircularProgress, Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import { useSearchParams } from 'react-router-dom';
import { proofAPI } from '../../api/proofAPI';

export const ProofPage = () => {
	const [proofList, setProofList] = useState([]);
	const [total_pages, setTotalPages] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);

	const urlPage = Number(searchParams.get('page')) || 1;

	const getProofs = async page => {
		setIsLoading(true);
		const { data } = await proofAPI.getAllProofs(page);
		setProofList(data.content);
		setTotalPages(data.total_pages);
		setIsLoading(false);
	};

	useEffect(() => {
		getProofs(urlPage - 1);
	}, [urlPage]);

	useEffect(() => {
		if (urlPage < 0 || (total_pages < urlPage && total_pages !== 0)) {
			setSearchParams({ page: '1' });
		}
	});

	let proofsList = proofList.map(proof => (
		<Grid item md={6} sm={12} lg={4} key={proof.id}>
			<Proof proof={proof} withContent={false} />
		</Grid>
	));
	return (
		<>
			{isLoading ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<PagesGrid gridItems={proofsList} total_pages={total_pages} />
			)}
		</>
	);
};
