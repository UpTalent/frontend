import React from 'react';
import { PagesGrid } from '../shared/Grid';
import { Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import {
	getFilter,
	getGridList,
	getProofsList,
} from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';
import { useSelector } from 'react-redux';
import { useStoreDispatch } from '../../redux/store';
import { getRole } from '../../redux/reducers/authentification';
import { SponsorsRating } from './components/SponsorsRating/SponsorsRating';
import styles from './ProofPage.module.css';
import { Filter } from '../TalentsPage/components/Filter/Filter';

const ProofPage = ({
	total_pages,
	urlPage,
	setSearchParams,
	alignment,
	setAlignment,
}) => {
	const dispatch = useStoreDispatch();
	const role = useSelector(getRole);

	const proofList = useSelector(getGridList);
	const filterItems = useSelector(getFilter).skills;

	const filterHandler = async () => {
		const filter = filterItems.map(el => el.name);
		dispatch(getProofsList({ page: urlPage - 1, alignment, filter }));
	};

	let proofsList = proofList.map(proof => (
		<Grid item md={12} sm={12} lg={12} key={proof.id}>
			<Proof proof={proof} withContent={false} inForm={true} />
		</Grid>
	));
	return (
		<>
			<Filter
				{...{
					filterItems,
					alignment,
					setAlignment,
					setSearchParams,
					urlPage,
					filterHandler,
					showFilter: ['skills', 'sortByDate'],
				}}
				getProofs={(page, alignment) =>
					dispatch(getProofsList({ page, alignment }))
				}
			/>
			<div className={styles.gridContainer}>
				<PagesGrid gridItems={proofsList} total_pages={total_pages} />
				{role === 'talent' && <SponsorsRating />}
			</div>
		</>
	);
};

export default withURL(ProofPage, getProofsList, 'proofs');
