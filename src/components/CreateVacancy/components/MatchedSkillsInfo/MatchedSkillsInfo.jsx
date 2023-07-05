import React from 'react';
import { InfoModal } from '../../../shared/InfoModal/InfoModal';
import { DialogContent, DialogTitle } from '@mui/material';

export const MatchedSkillsInfo = () => {
	return (
		<InfoModal>
			<DialogTitle>
				Choose how many skills should talent have for applying on this vacancy
			</DialogTitle>
			<DialogContent>
				<p>
					f.e. if you have a vacancy for 3 skills - <b>Java, React and SQL</b>
				</p>
				<p>
					and mathed skills set for <b>2</b>
				</p>
				<p>
					Talents with skills <b>SQL and React</b> or <b>Java and SQL</b> would
					be able to apply on this vacancy
				</p>
			</DialogContent>
		</InfoModal>
	);
};
