import React, { useEffect, useState } from 'react';
import { Proof } from '../../../../../shared/Proof';
import styles from '../../MainInfo.module.css';
import { proofAPI } from '../../../../../../api/proofAPI';
import { Fab, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CreateProof } from '../../../../../CreateProof';

export const Proofs = () => {
  const [proof, setProof] = useState(null);
  const navigate = useNavigate();
	const location = useLocation();
	
  const modalPathname = path => {
		navigate(`${location.pathname}/${path}`);
	};

	const getProof = async () => {
		try {
			const { data } = await proofAPI.getProof(1, 1);
			setProof(data);
		} catch (err) {
			console.log(err);
		}
  };

	// useEffect(() => {
	// 	getProof();
	// }, []);

	return (
		<>
			<div className={styles.proofContainer}>
				<Fab
					color='secondary'
					aria-label='add'
					onClick={() => {
						modalPathname('createProof');
					}}
				>
					<AddIcon />
				</Fab>
				{/* {proof ? (
					<>
						<Proof proof={proof} withContent={false} showControlls={false} />
						<Proof proof={proof} withContent={true} showControlls={true} />
						<Proof proof={proof} withContent={true} showControlls={false} />
					</>
				) : (
					<LinearProgress />
				)} */}
			</div>
			<Outlet />
			{location.pathname.endsWith('/createProof') && (
				//<CreateProof proof={proof} />
        		<CreateProof/>
			)}
		</>
	);
};
