import React from 'react';
import styles from './ResponsePage.module.css';
import { PagesGrid } from '../shared/Grid';
import { withURL } from '../../service/HOC/withURL';
import { getGridList, getResponsesList } from '../../redux/reducers/dataList';
import { ResponseGeneral } from './components/ResponseGeneral/ResponseGeneral';
import { useSelector } from 'react-redux';
import { Chip, Grid } from '@mui/material';

const ResponsePage = ({ total_pages }) => {
	const responses = useSelector(getGridList);
	const gridItems = responses?.map((response, index) => (
		<Grid item md={12} sm={12} lg={12} key={index}>
			<ResponseGeneral {...response} withControll={true} />
		</Grid>
	));

	return (
		<>
			<div className={styles.title}>
				<p>My jobs</p>
				<Chip color='primary' label='Applied' />
			</div>
			<PagesGrid {...{ total_pages, gridItems }} />
		</>
	);
};

export default withURL(ResponsePage, getResponsesList, 'responses');
