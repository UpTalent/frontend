import React, { useEffect, useState } from 'react';
import styles from '../../../../Proof.module.css';
import { ControllButton } from './ControllButton';
import { ConfirmationMessage } from '../../../ConfirmationMessage';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreDispatch } from '../../../../../../../redux/store';
import { useSelector } from 'react-redux';
import { getAuthTalentId } from '../../../../../../../redux/reducers/authentification';
import {
	deleteProof,
	editProof,
	fetchProof,
} from '../../../../../../../redux/reducers/proof';
import { useLocation, useNavigate } from 'react-router-dom';

export const TalentsControl = ({ status, proofId }) => {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [action, setAction] = useState({ action: '', buttonHandler: null });

	const dispatch = useStoreDispatch();
	const talentId = useSelector(getAuthTalentId);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		switch (status) {
			case 'HIDDEN':
				setAction({
					action: 'PUBLISH',
					buttonHandler: () => changeVisibility('PUBLISHED'),
				});
				break;
			case 'PUBLISHED':
				setAction({
					action: 'HIDE',
					buttonHandler: () => changeVisibility('HIDDEN'),
				});
				break;
			default:
				break;
		}
	}, []);

	const handleControllClick = () => {
		if (status !== 'DRAFT') {
			setOpenConfirm(true);
		} else {
			dispatch(fetchProof({ talentId, proofId }));
			navigate(`${location.pathname}/createProof`);
		}
	};
	const deleteTalentProof = () => {
		dispatch(deleteProof({ talentId, proofId }));
	};

	const changeVisibility = status => {
		const data = { talentId, proofId, status };
		dispatch(editProof(data));
		setOpenConfirm(false);
	};

	return (
		<div className={styles.talentsControls}>
			<ControllButton status={status} handleClick={handleControllClick} />
			<Tooltip
				title='Delete proof'
				onClick={() => {
					setOpenConfirm(true);
					setAction({
						action: 'DELETE',
						buttonHandler: deleteTalentProof,
					});
				}}
			>
				<IconButton>
					<DeleteIcon color='action' />
				</IconButton>
			</Tooltip>
			{openConfirm && (
				<ConfirmationMessage
					action={action.action}
					handleConfim={setOpenConfirm}
					confirmMessage={openConfirm}
					buttonHandler={action.buttonHandler}
				/>
			)}
		</div>
	);
};
