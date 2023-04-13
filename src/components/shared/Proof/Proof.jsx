import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';
import styles from './Proof.module.css';
import { ProofTitle } from './components/ProofTitle';
import { ProofSummary } from './components/ProofSummary/ProofSummary';
import { ProofBody } from './components/ProofBody/ProofBody';

export const Proof = ({ proof, withContent, showControlls, className }) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const handleAccordionClick = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	return (
		<div className={`${styles.Proof} ${className}`}>
			{withContent ? (
				<Accordion expanded={isAccordionOpen}>
					<AccordionSummary
						onClick={e => e.stopPropagation()}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							margin: 0,
							padding: 0,
							'& .MuiAccordionSummary-content': {
								margin: 0,
								width: '100%',
							},
						}}
					>
						<ProofTitle
							icon_number={proof.icon_number}
							title={proof.title}
							published={proof.published}
							status={proof.status}
							showControlls={showControlls}
							openContent={handleAccordionClick}
							proofId={proof.id}
						/>
					</AccordionSummary>
					<AccordionDetails>
						<ProofSummary summary={proof.summary} />
						<ProofBody content={proof.content} />
					</AccordionDetails>
				</Accordion>
			) : (
				<div className={styles.General}>
					<ProofTitle
						icon_number={proof.icon_number}
						title={proof.title}
						published={proof.published}
						status={proof.status}
						showControlls={showControlls}
					/>
					<ProofSummary summary={proof.summary} />
				</div>
			)}
		</div>
	);
};
