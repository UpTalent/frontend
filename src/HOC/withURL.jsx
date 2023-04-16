import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStoreDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import {
	clearList,
	getGridItem,
	getGridTotalPages,
	pendingStatus,
} from '../redux/reducers/dataList';
import { CircularProgress } from '@mui/material';

export const withURL = (Component, getList, nameList) => () => {
	const [searchParams, setSearchParams] = useSearchParams();
    const [alignment, setAlignment] = useState('desc');
    const dispatch = useStoreDispatch();

	const total_pages = useSelector(getGridTotalPages);
	const isLoading = useSelector(pendingStatus);
	const gridItems = useSelector(getGridItem);

    const urlPage = Number(searchParams.get('page')) || 1;

	useEffect(() => {
		const data =
			nameList === 'talents' ? urlPage - 1 : { page: urlPage - 1, alignment };
		dispatch(getList(data));
		return () => dispatch(clearList());
	}, [urlPage, alignment]);

	useEffect(() => {
		if (urlPage < 0 || (total_pages < urlPage && total_pages !== 0)) {
			setSearchParams({ page: '1'});
		}
	});

	return (
		<>
			{isLoading || gridItems !== nameList ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<Component
					total_pages={total_pages}
					urlPage={urlPage}
					setSearchParams={setSearchParams}
					alignment={alignment}
					setAlignment={setAlignment}
				/>
			)}
		</>
	);
};
