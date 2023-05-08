import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStoreDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import {
	clearList,
	getFilter,
	getGridItem,
	getGridTotalPages,
	pendingStatus,
	setFilter,
} from '../../redux/reducers/dataList';
import { CircularProgress } from '@mui/material';
import { getAllSkills, getSkills } from '../../redux/reducers/skills';

export const withURL = (Component, getList, nameList) => () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useStoreDispatch();

	const total_pages = useSelector(getGridTotalPages);
	const skillsList = useSelector(getAllSkills);
	const filterItems = useSelector(getFilter).skills;
	const isLoading = useSelector(pendingStatus);
	const gridItems = useSelector(getGridItem);

	const urlPage = Number(searchParams.get('page')) || 1;
	const value = searchParams.get('sort') || 'desc';
	const filter = searchParams.getAll('filter');

	const validateUrl = () => {
		let validUrl = true;
		const params = ['default', total_pages, value, filter.length];
		for (let i = 0; i < params.length; i++) {
			if (!validUrl) break;
			if (!params[i]) continue;
			switch (params[i]) {
				case total_pages:
					validUrl = urlPage <= total_pages;
					break;
				case value:
					validUrl = ['desc', 'asc'].includes(value);
					break;
				case filter.length:
					validUrl = filter.every(el =>
						skillsList?.find(skill => skill.name === el),
					);
					break;
				default:
					validUrl = urlPage > 0;
			}
		}
		return validUrl;
	};

	const filterHandler = async () => {
		const filter = filterItems.map(el => el.name);
		setSearchParams({
			...Object.fromEntries([...searchParams]),
			filter,
		});
	};

	useEffect(() => {
		const data = { page: urlPage - 1, alignment: value, filter };
		dispatch(getList(data));
	}, [urlPage, filter.length, value]);

	useEffect(() => {
		return () => dispatch(clearList());
	}, [nameList]);

	useEffect(() => {
		if (!skillsList.length) {
			dispatch(getSkills);
		}
		dispatch(
			setFilter(
				'skills',
				skillsList.filter(el => filter.includes(el.name)),
			),
		);
		if (skillsList.length && !validateUrl()) {
			setSearchParams({ page: 1 });
		}
	}, [total_pages, skillsList.length]);

	return (
		<>
			{isLoading || gridItems !== nameList ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<Component {...{ total_pages, getList, filterHandler, filterItems }} />
			)}
		</>
	);
};
