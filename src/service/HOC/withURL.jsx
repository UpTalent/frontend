import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
	clearList,
	getGridItem,
	getGridTotalPages,
	pendingStatus,
} from '../../redux/reducers/dataList';
import { CircularProgress } from '@mui/material';

export const withURL = (Component, getList, nameList) => () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useStoreDispatch();

	const total_pages = useSelector(getGridTotalPages);
	const isLoading = useSelector(pendingStatus);
	const gridItems = useSelector(getGridItem);

	const urlPage = Number(searchParams.get('page')) || 1;
	const value = searchParams.get('sort') || 'desc';
	const data =
		nameList === 'proofs'
			? { page: urlPage - 1, alignment: value }
			: urlPage - 1;

	useEffect(() => {
		dispatch(getList(data));
		nameList === 'proofs' && setSearchParams({ page: urlPage, sort: value });
		return () => dispatch(clearList());
	}, [urlPage]);

	useEffect(() => {
		if (
			urlPage < 0 ||
			(total_pages < urlPage && total_pages !== 0) ||
			!['desc', 'asc'].includes(value)
		) {
			setSearchParams({ page: '1', sort: 'desc' });
		}
	});

	return (
		<>
			{isLoading || gridItems !== nameList ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<Component total_pages={total_pages} getProofs={getList} />
			)}
		</>
	);
};
