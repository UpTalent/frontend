import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';
import styles from './Proof.module.css';
import { ProofTitle } from './components/ProofTitle';
import { ProofSummary } from './components/ProofSummary/ProofSummary';
import { ProofBody } from './components/ProofBody/ProofBody';

export const Proof = ({
	proof,
	withContent,
	showControlls,
	className,
	inForm = false,
}) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(inForm);
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
								margin: '0 !important',
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
							// is_pressed={proof.is_pressed}
							is_pressed={false}
							// amount = {proof.kudos}
							amount={10}
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
