import React, { useEffect, useState } from 'react';
import styles from '../Proof/Proof.module.css';
import { ControllButton } from './ControllButton';
import { ConfirmationMessage } from '../Proof/components/ConfirmationMessage';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const PostControl = ({
	status,
	id,
	deleteHandler,
	changeVisabilityHandler,
	editHandler,
}) => {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [action, setAction] = useState({ action: '', buttonHandler: null });

	const [searchParams, setSearchParams] = useSearchParams();
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
			const redirect = editHandler();
			navigate({
				pathname: `${location.pathname}/${redirect}`,
				search: location.search,
			});
		}
	};

	const changeVisibility = status => {
		setSearchParams({
			...Object.fromEntries([...searchParams]),
			filter: status,
		});
		changeVisabilityHandler(status);
		setOpenConfirm(false);
	};

	return (
		<div className={styles.talentsControls}>
			<ControllButton status={status} handleClick={handleControllClick} />
			<Tooltip
				title='Delete item'
				onClick={() => {
					setAction({
						action: 'DELETE',
						buttonHandler: () => deleteHandler(id),
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
