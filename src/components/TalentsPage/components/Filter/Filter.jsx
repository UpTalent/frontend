import React from 'react';
import styles from './Filter.module.css';
import { Button, Chip } from '@mui/material';
import { BySkills } from './components/BySkills/BySkills';
import { setFilter } from '../../../../redux/reducers/dataList';
import { useDispatch } from 'react-redux';
import { SortButtons } from '../../../ProofPage/components/SortButtons/SortButtons';

export const Filter = ({
	filterItems,
	alignment,
	filterHandler,
	setAlignment,
	setSearchParams,
	urlPage,
	getProofs,
	showFilter,
}) => {
	const dispatch = useDispatch();
	const setFilterItems = filterItem => {
		dispatch(setFilter('skills', filterItem));
	};
	const handleDelete = id => {
		setFilterItems(filterItems.filter(el => el.id !== id));
	};

	const filters = [
		{
			filter: 'sortByDate',
			element: (
				<SortButtons
					{...{ alignment, setAlignment, setSearchParams, urlPage, getProofs }}
				/>
			),
		},
		{
			filter: 'skills',
			element: <BySkills {...{ setFilterItems, filterItems }} />,
		},
	];
	return (
		<div className={styles.filterBox}>
			<div className={styles.controlls}>
				{filters.map(el => showFilter.includes(el.filter) && el.element)}
				<Button variant='contained' onClick={filterHandler}>
					Add filter
				</Button>
			</div>
			<div>
				<div className={styles.selected}>
					{filterItems.map(el => (
						<Chip
							variant='outlined'
							color='primary'
							label={el.name}
							key={el.id}
							onDelete={() => handleDelete(el.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
