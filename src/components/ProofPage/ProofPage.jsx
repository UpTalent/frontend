import React from 'react';
import { PagesGrid } from '../shared/Grid';
import { Grid } from '@mui/material';
import { Proof } from '../shared/Proof';
import { SortButtons } from './components/SortButtons/SortButtons';
import { getGridList, getProofsList } from '../../redux/reducers/dataList';
import { withURL } from '../../service/HOC/withURL';
import { useSelector } from 'react-redux';
import { useStoreDispatch } from '../../redux/store';

const ProofPage = ({
	total_pages,
	urlPage,
	setSearchParams,
	alignment,
	setAlignment,
}) => {
	const dispatch = useStoreDispatch();

	const proofList = useSelector(getGridList);

	let proofsList = proofList.map(proof => (
		<Grid item md={12} sm={12} lg={12} key={proof.id}>
			<Proof proof={proof} withContent={false} inForm={true}/>
		</Grid>
	));
	return (
		<>
			<SortButtons
				alignment={alignment}
				setAlignment={setAlignment}
				setSearchParams={setSearchParams}
				urlPage={urlPage}
				getProofs={(page, alignment) =>
					dispatch(getProofsList({ page, alignment }))
				}
			/>
			<PagesGrid gridItems={proofsList} total_pages={total_pages} />
		</>
	);
};

export default withURL(ProofPage, getProofsList, 'proofs');
