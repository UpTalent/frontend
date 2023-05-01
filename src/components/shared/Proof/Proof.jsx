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
	const handleAccordionClick = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	return (
		<div className={`${styles.Proof} ${className}`}>
			{!inSlider ? (
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
						summary={proof.summary}
						withKudos={true}
						kudos={proof.kudos}
						proofId={proof.id}
						sum_kudos_from_me={proof.sum_kudos_from_me}
					/>
				</div>
			)}
		</div>
	);
};
