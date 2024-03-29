import React from 'react';
import styles from './Filter.module.css';
import { Button, Chip } from '@mui/material';
import { BySkills } from './components/BySkills/BySkills';
import { setFilter } from '../../../../redux/reducers/dataList';
import { useDispatch } from 'react-redux';
import { SortButtons } from '../../../ProofPage/components/SortButtons/SortButtons';
import { useSearchParams } from 'react-router-dom';
import { FilterList } from '@mui/icons-material';
import { DisabledText } from '../../../shared/DisabledText/DisabledText';

export const Filter = ({ filterItems, filterHandler, showFilter }) => {
	const dispatch = useDispatch();
	const [, setSearchParams] = useSearchParams();

	const disableButton = {
		condition: filterItems.length === 0,
		helperText: 'Please select filter options',
	};

	const setFilterItems = filterItem => {
		dispatch(setFilter('skills', filterItem));
	};

	const handleDelete = id => {
		setFilterItems(filterItems.filter(el => el.id !== id));
	};

	const reset = () => {
		setFilterItems([]);
		setSearchParams({ page: 1 });
	};

	const filters = [
		{
			filter: 'sortByDate',
			element: <SortButtons key={0} />,
		},
		{
			filter: 'skills',
			element: (
				<BySkills key={1} {...{ setFilterItems, filterItems, handleDelete }} />
			),
		},
	];
	return (
		<div className={styles.filterBox}>
			<div className={styles.controlls}>
				{filters.map(el => showFilter.includes(el.filter) && el.element)}
				<DisabledText {...disableButton}>
					<Button
						variant='contained'
						onClick={filterHandler}
						endIcon={<FilterList />}
						disabled={disableButton.condition}
					>
						Apply filter
					</Button>
				</DisabledText>
				<Button
					variant='contained'
					sx={{ background: '#aba9a7' }}
					color='warning'
					onClick={reset}
				>
					Reset All
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
