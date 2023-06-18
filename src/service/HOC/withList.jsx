import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import {
	getItemList,
	getItemsCurrentPage,
	getItemsList,
	getItemsTotalPages,
	itemsPendingStatus,
	resetList,
} from '../../redux/reducers/userItems';
import { useStoreDispatch } from '../../redux/store';
import { Pagination } from '@mui/material';

export const withList = (Component, item) => () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const items = useSelector(getItemList);
	const isFetching = useSelector(itemsPendingStatus);
	const total_pages = useSelector(getItemsTotalPages);
	const currentPage = useSelector(getItemsCurrentPage);
	const dispatch = useStoreDispatch();

	const { talentId } = useParams();
	const { sponsorId } = useParams();

	const urlPage = Number(searchParams.get('page')) || 1;
	const filter = searchParams.get('filter');

	const getItems = (status, page) => {
		const id = item === 'proofs' ? talentId : sponsorId;
		const fetchData = { id, status, page, item };
		dispatch(getItemsList(fetchData));
	};

	useEffect(() => {
		const page = urlPage - 1;
		getItems(filter, page);

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
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Component {...{ isFetching, items }} />
			{Boolean(items.length) && (
				<Pagination
					page={currentPage}
					count={total_pages}
					sx={{ alignSelf: 'center', marginTop: 2 }}
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
