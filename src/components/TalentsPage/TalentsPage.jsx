import { Grid, Pagination } from '@mui/material';
import React, { useState } from 'react';
import styles from './TalentsPage.module.css';
import { GeneralTalent } from './components/GeneralTalent';

export const TalentsPage = ({
	content,
	page_number,
	total_pages,
	isTalent,
    requestTalent
}) => {
	const [currentPage, setPage] = useState(page_number + 1);
	const changePage = (e, page) => {
		setPage(page);
		requestTalent(page - 1);
	};

	let talentsList = content.map(talent => (
		<Grid item md={4} xs={12} key={talent.id}>
			<GeneralTalent talent={talent} isTalent={isTalent} />
		</Grid>
	));
	return (
		<div className={styles.TalentsPage}>
			<Grid container rowSpacing={3} align='center'>
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
