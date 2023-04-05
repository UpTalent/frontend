import { Grid, Pagination } from '@mui/material';
import React, { useState } from 'react';
import styles from './TalentsPage.module.css';
import { GeneralTalent } from './components/GeneralTalent';
import { useSearchParams } from 'react-router-dom';

export const TalentsPage = ({
	talentList,
	total_pages
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get('page')) || 1;

	const [currentPage, setCurrentPage] = useState(page);

	const changePage = (e, page) => {
		setSearchParams({ page });
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	let talentsList = talentList.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} />
		</Grid>
	));
	return (
		<div className={styles.TalentsPage}>
			<Grid container rowSpacing={4} align='center'>
				{talentsList}
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
