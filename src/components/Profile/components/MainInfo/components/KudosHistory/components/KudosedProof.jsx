import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ProofTitle } from '../../../../../../shared/Proof/components/ProofTitle';
import styles from '../../../../../../shared/Proof/Proof.module.css';
import { KudosedProofItem } from './KudosedProofItem';
import { useSelector } from 'react-redux';
import { getAllSkills } from '../../../../../../../redux/reducers/skills';

export const KudosedProof = ({ proofInfo }) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const handleAccordionClick = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};
	const allSkills = useSelector(getAllSkills);
	const newSkills = proofInfo.skills.map(el => ({
		...el,
		id: allSkills.find(skill => skill.name === el.name).id,
	}));
	return (
		<div className={styles.Proof}>
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
						{...{ ...proofInfo, skills: newSkills }}
						kudos={proofInfo.total_sum_kudos}
						withContent={true}
						id={proofInfo.proof_id}
						inSlider={false}
					/>
				</AccordionSummary>
				<AccordionDetails>
					{isAccordionOpen && <KudosedProofItem id={proofInfo.proof_id} />}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
