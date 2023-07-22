import React from 'react';
import { PagesGrid } from '../shared/Grid';
import { Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import { getGridList, getProofsList } from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';
import { useSelector } from 'react-redux';
import { getRole } from '../../redux/reducers/authentification';
import { SponsorsRating } from './components/SponsorsRating/SponsorsRating';
import styles from './ProofPage.module.css';
import { Filter } from '../TalentsPage/components/Filter/Filter';
import { NothingToDisplay } from '../shared/NothingToDisplay';

const ProofPage = ({ total_pages, filterHandler, filterItems }) => {
	const role = useSelector(getRole);
	const proofList = useSelector(getGridList);

	let proofsList = proofList?.map(proof => (
		<Grid item md={12} sm={12} lg={12} key={proof.id}>
			<Proof proof={proof} withContent={false} inForm={true} />
		</Grid>
	));
	return (
		<>
			<Filter
				{...{
					filterItems,
					filterHandler,
					showFilter: ['skills', 'sortByDate'],
				}}
			/>
			{proofList?.length ? (
				<div className={styles.gridContainer}>
					<PagesGrid gridItems={proofsList} total_pages={total_pages} />
					{role === 'talent' && <SponsorsRating />}
				</div>
			) : (
				<NothingToDisplay searchData={filterItems} />
			)}
		</>
	);
};

export default withURL(ProofPage, getProofsList, 'proofs');
