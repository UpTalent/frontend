import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ProofTitle } from '../../../../../../shared/Proof/components/ProofTitle';
import styles from '../../../../../../shared/Proof/Proof.module.css';
import { KudosedProofItem } from './KudosedProofItem';
import { proofAPI } from '../../../../../../../api/proofAPI';
import { ProofLoader } from '../../../../../../loaders/ProofLoader/ProofLoader';

export const KudosedProof = ({ proofInfo }) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [proofSkills, setProofSkills] = useState([]);

	const handleAccordionClick = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	useEffect(() => {
		const fetchFullProof = async () => {
			try {
				const { data } = await proofAPI.getProof(
					proofInfo.author.id,
					proofInfo.proof_id,
				);
				setProofSkills(data.skills);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchFullProof();
	}, []);
	
	return (
		<>
			{proofSkills.length ? (
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
								{...{ ...proofInfo, skills: proofSkills }}
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
			): <ProofLoader amount={1} />}
		</>
	);
};
