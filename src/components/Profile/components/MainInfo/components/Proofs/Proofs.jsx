import React from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useOutletContext } from 'react-router-dom';
import { FilterStatus } from './components/FilterStatus';
import { useModalPathname } from '../../../../../../service/hooks/useModalPathname';
import { ProofLoader } from '../../../../../loaders/ProofLoader/ProofLoader';
import { withList } from '../../../../../../service/HOC/withList';

const Proofs = ({ isFetching, items }) => {
	const { isUserProfile } = useOutletContext();

	const modalPathname = useModalPathname();

	return (
		<>
			{isUserProfile && (
				<div className={styles.itemsContolls}>
					<Fab
						color='secondary'
						aria-label='add'
						onClick={() => {
							modalPathname('createProof');
						}}
					>
						<AddIcon />
					</Fab>
					<FilterStatus />
				</div>
			)}
			{!isFetching ? (
				<div className={styles.items}>
					{!items.length && (
						<p className={styles.emptyList}>It's empty in here...for now</p>
					)}
					{items.map(el => (
						<Proof
							key={el.id}
							proof={el}
							withContent={true}
							showControlls={isUserProfile}
						/>
					))}
				</div>
			) : (
				<ProofLoader />
			)}
			<Outlet />
		</>
	);
};

export default withList(Proofs, 'proofs');
