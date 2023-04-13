import React, { useEffect, useState } from 'react';
import { PagesGrid } from '../shared/Grid';
import { CircularProgress, Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import { useSearchParams } from 'react-router-dom';
import { SortButtons } from './components/SortButtons/SortButtons';
import { useSelector } from 'react-redux';
import {
	clearList,
	getGridItem,
	getGridList,
	getGridTotalPages,
	getProofsList,
	pendingStatus,
} from '../../redux/reducers/dataList';
import { useStoreDispatch } from '../../redux/store';

export const ProofPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [alignment, setAlignment] = useState('desc');

	const urlPage = Number(searchParams.get('page')) || 1;

	const proofList = useSelector(getGridList);
	const total_pages = useSelector(getGridTotalPages);
	const isLoading = useSelector(pendingStatus);
	const gridItems = useSelector(getGridItem);
	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(getProofsList({ page: urlPage - 1, alignment }));

		return () => dispatch(clearList());
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
			{isLoading || gridItems !== 'proofs' ? (
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
						getProofs={(page, alignment) =>
							dispatch(getProofsList({ page, alignment }))
						}
					/>
					<PagesGrid gridItems={proofsList} total_pages={total_pages} />
				</>
			)}
		</>
	);
};
