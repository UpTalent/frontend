import React, { useEffect, useState } from 'react';
import { PagesGrid } from '../shared/Grid';
import { CircularProgress, Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import { useSearchParams } from 'react-router-dom';
import { proofAPI } from '../../api/proofAPI';
import { SortButtons } from './components/SortButtons/SortButtons';

export const ProofPage = () => {
	const [proofList, setProofList] = useState([]);
	const [total_pages, setTotalPages] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const [alignment, setAlignment] = useState('desc');

	const urlPage = Number(searchParams.get('page')) || 1;

	const getProofs = async (page, sort) => {
		setIsLoading(true);
		const { data } = await proofAPI.getAllProofs(page, sort);
		setProofList(data.content);
		setTotalPages(data.total_pages);
		setIsLoading(false);
	};

	useEffect(() => {
		getProofs(urlPage - 1, alignment);
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
				<>
					<SortButtons
						alignment={alignment}
						setAlignment={setAlignment}
						setSearchParams={setSearchParams}
						urlPage={urlPage}
						getProofs={getProofs}
					/>
					<PagesGrid gridItems={proofsList} total_pages={total_pages} />
				</>
			)}
		</>
	);
};
