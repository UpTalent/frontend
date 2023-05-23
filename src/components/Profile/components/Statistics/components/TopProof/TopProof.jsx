import React from 'react';
import { StatsElement } from '../StatsElement/StatsElement';
import { Proof } from '../../../../../shared/Proof';

export const TopProof = ({ proof }) => {
	return (
		<StatsElement title={'Top proof: '}>
			<Proof proof={proof} withContent={true} />
		</StatsElement>
	);
};
