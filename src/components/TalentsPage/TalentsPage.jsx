import { Grid } from '@mui/material';
import React from 'react';
import styles from './TalentsPage.module.css';
import { GeneralTalent } from './components/GeneralTalent';

export const TalentsPage = ({
	content,
	page_number,
	total_pages,
	isTalent,
}) => {
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
		</div>
	);
};
