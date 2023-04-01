import { Grid, Pagination } from '@mui/material';
import React from 'react';
import styles from './TalentsPage.module.css';
import { GeneralTalent } from './components/GeneralTalent';

export const TalentsPage = ({
	content,
	total_pages,
	isTalent,
	requestTalent,
	setCurrentPage,
	currentPage,
}) => {
	const changePage = (e, page) => {
		setCurrentPage(page);
		requestTalent(page - 1);
	};

	let talentsList = content.map(talent => (
		<Grid item md={6} sm={12} lg={4} key={talent.id}>
			<GeneralTalent talent={talent} isTalent={isTalent} />
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
