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
	inSlider,
}) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(inForm);

	const summaryForSlider =
		proof.summary.length > 100
			? proof.summary.substring(0, 100) + '...'
			: proof.summary;

	const handleAccordionClick = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	return (
		<div
			className={`${styles.Proof} ${className} ${
				proof.my_proof && inForm && styles.myProof
			}`}
		>
			{!inSlider ? (
				<Accordion
					expanded={isAccordionOpen}
					sx={{ borderRadius: '10px !important' }}
				>
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
							openContent={handleAccordionClick}
							{...{ ...proof, withContent, inSlider, showControlls }}
						/>
					</AccordionSummary>
					<AccordionDetails>
						<ProofSummary summary={proof.summary} />
						{withContent && <ProofBody content={proof.content} />}
					</AccordionDetails>
				</Accordion>
			) : (
				<div className={styles.General}>
					<ProofTitle {...{ ...proof, inSlider, showControlls }} />
					<ProofSummary
						summary={summaryForSlider}
						withKudos={true}
						kudos={proof.kudos}
						skills={proof.skills}
						proofId={proof.id}
						sum_kudos_from_me={proof.sum_kudos_from_me}
					/>
				</div>
			)}
		</div>
	);
};
