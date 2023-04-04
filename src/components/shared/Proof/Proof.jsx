import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
} from '@mui/material';
import React from 'react';
import styles from './Proof.module.css';
import icon from '../../../assets/ProofIcons/haze-dry-flowers.png';

export const Proof = ({ proof }) => {
	return (
		<Accordion sx={{maxWidth:'450px', padding:0}}>
			<AccordionSummary
				expandIcon={
					<Button color='primary' variant='contained'>
						Continue reading...
					</Button>
				}
                sx={{display:'flex', flexDirection:'column'}}
			>
				<div className={styles.General}>
					<div className={styles.ProofTitle}>
						<div className={styles.timeStamp}></div>
						<div className={styles.title}>
							<img src={icon} alt='' />
							<p>{proof.title}</p>
						</div>
					</div>
					<div className={styles.annotation}>
						<p>{proof.annotation}</p>
					</div>
				</div>
			</AccordionSummary>
			<AccordionDetails>{proof.content}</AccordionDetails>
		</Accordion>
	);
};
