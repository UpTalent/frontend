import React from 'react';
import styles from '../../Proof.module.css';
import { ProofIcons } from '../../../../../assets/ProofIcons';
import { IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import { ControllButton } from './components/ControllButton';

export const ProofTitle = ({
	title,
	published,
	icon_number,
	status,
	showControlls,
	openContent,
}) => {
	return (
		<div className={styles.ProofTitle}>
			<div className={styles.controls}>
				<div className={styles.timeStamp}>
					{published && (
						<>
							<AccessTimeIcon color='action' />
							{published}
						</>
					)}
				</div>
				{showControlls && (
					<div className={styles.talentsControls}>
						<ControllButton
							status={status}
							handleClick={() => console.log('hello')}
						/>
						<Tooltip title='Delete proof'>
							<IconButton>
								<DeleteIcon color='action' />
							</IconButton>
						</Tooltip>
					</div>
				)}
			</div>
			<div className={styles.title} onClick={openContent}>
				<img src={ProofIcons[icon_number].icon} alt={`${icon_number}`} />
				<p>{title}</p>
			</div>
			{showControlls && (
				<div className={`${styles.status} ${styles[status]}`}>
					<p>{status}</p>
				</div>
			)}
		</div>
	);
};
