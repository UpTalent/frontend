import { Grid, Pagination } from '@mui/material';
import React, { useState } from 'react';
import styles from './Grid.module.css';
import { useSearchParams } from 'react-router-dom';

export const PagesGrid = ({ gridItems, total_pages }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) : 1;

	const [currentPage, setCurrentPage] = useState(page);

	const changePage = (e, page) => {
		setSearchParams({ page });
		setCurrentPage(page);
	};

	return (
		<div className={styles.Grid}>
			<Grid container rowSpacing={4} align='center'>
				{gridItems}
			</Grid>
			<Pagination
				color='primary'
				count={total_pages}
				page={currentPage}
				onChange={changePage}
				variant='outlined'
				shape='rounded'
			/>
		</div>
	);
};
