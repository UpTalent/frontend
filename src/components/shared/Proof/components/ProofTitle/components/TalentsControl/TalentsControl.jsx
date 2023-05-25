import React, { useEffect, useState } from 'react';
import styles from '../../../../Proof.module.css';
import { ControllButton } from './ControllButton';
import { ConfirmationMessage } from '../../../ConfirmationMessage';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreDispatch } from '../../../../../../../redux/store';
import { useSelector } from 'react-redux';
import { getAuthId } from '../../../../../../../redux/reducers/authentification';
import {
	deleteProof,
	editProof,
	fetchProof,
} from '../../../../../../../redux/reducers/proof';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const TalentsControl = ({ status, proofId }) => {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [action, setAction] = useState({ action: '', buttonHandler: null });
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useStoreDispatch();
	const talentId = useSelector(getAuthId);

	const navigate = useNavigate();
	const location = useLocation();

	const changeAction = status => {
		switch (status) {
			case 'HIDDEN':
				setAction({
					action: 'SHOW',
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
	};

	useEffect(() => {
		changeAction(status);
	}, []);

	const handleControllClick = () => {
		if (status !== 'DRAFT') {
			changeAction(status);
			setOpenConfirm(true);
		} else {
			dispatch(fetchProof({ talentId, proofId }));
			navigate({
				pathname: `${location.pathname}/createProof`,
				search: location.search,
			});
		}
	};
	const deleteTalentProof = () => {
		dispatch(deleteProof({ talentId, proofId, status }));
	};

	const changeVisibility = status => {
		const data = { talentId, proofId, status };
		setSearchParams({
			...Object.fromEntries([...searchParams]),
			filter: status,
		});
		dispatch(editProof(data));
		setOpenConfirm(false);
	};

	return (
		<div className={styles.talentsControls}>
			<ControllButton status={status} handleClick={handleControllClick} />
			<Tooltip
				title='Delete proof'
				onClick={() => {
					setAction({
						action: 'DELETE',
						buttonHandler: deleteTalentProof,
					});
					setOpenConfirm(true);
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
