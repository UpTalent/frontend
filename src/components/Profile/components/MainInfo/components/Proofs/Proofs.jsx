import React, { useEffect, useState } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { proofAPI } from '../../../../../../api/proofAPI';
import { Fab, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateProof } from '../../../../../CreateProof';
import { FilterStatus } from './components';

export const Proofs = ({ isTalentProfile }) => {
	const [proofs, setProofs] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const { talentId } = useParams();

	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`);
	};

	// const [proof, setProof] = useState();

	// const getTalentProof = async () => {
	// 	try {
	// 		const { data } = await proofAPI.getProof(talentId, 48);

	// 		setProof(data)
	// 		console.log(data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const getTalentsProofs = async page => {
		try {
			const { data } = await proofAPI.getTalentProofs(talentId, page, 'DRAFT');
			setProofs(data.content);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTalentsProofs();
		//getTalentProof();
	}, [location]);

	return (
		<>
			<div className={styles.proofContainer}>
				{isTalentProfile && (
					<div className={styles.proofContolls}>
						<Fab
							color='secondary'
							aria-label='add'
							onClick={() => {
								modalPathname('createProof');
							}}
						>
							<AddIcon />
						</Fab>
						<FilterStatus/>
					</div>
				)}
				{proofs ? (
					<>
						{proofs.map(el => (
							<Proof
								key={el.id}
								proof={el}
								withContent={true}
								showControlls={isTalentProfile}
							/>
						))}
					</>
				) : (
					<LinearProgress />
				)}
				{/* <Proof
					proof={proof}
					withContent={true}
					showControlls={isTalentProfile}
				/> */}
			</div>
			<Outlet />
			{location.pathname.endsWith('/createProof') && <CreateProof />}
		</>
	);
};
