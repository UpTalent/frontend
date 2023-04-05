import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	IconButton,
	Tooltip,
} from '@mui/material';
import React from 'react';
import styles from './Proof.module.css';
import icon from '../../../assets/ProofIcons/haze-dry-flowers.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

export const Proof = ({ proof, withContent }) => {
	return (
		<Accordion sx={{ maxWidth: '450px' }}>
			<AccordionSummary
				sx={{ display: 'flex', flexDirection: 'column', margin: 0, padding: 0, '& .MuiAccordionSummary-content': {
					margin:0
				}}}
			>
				<div className={styles.General}>
					<div className={styles.ProofTitle}>
						<div className={styles.controls}>
							<div className={styles.timeStamp}>
								<AccessTimeIcon color='action' />
								{proof.published}
							</div>
							<div className={styles.controls1}>
								<Tooltip title='Hide'>
									<IconButton>
										<VisibilityIcon color='action' />
									</IconButton>
								</Tooltip>
								<Tooltip title='Delete proof'>
									<IconButton>
										<DeleteIcon color='action' />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						<div className={styles.title}>
							<img src={icon} alt='' />
							<p>{proof.title}</p>
						</div>
					</div>

					<div className={styles.annotation}>
						<p>{proof.summary}</p>
					</div>
				</div>
			</AccordionSummary>
			<AccordionDetails>{proof.content}</AccordionDetails>
		</Accordion>
	);
};
