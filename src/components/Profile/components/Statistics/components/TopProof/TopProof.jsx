import React from 'react';
import { StatsElement } from '../StatsElement/StatsElement';
import { Proof } from '../../../../../shared/Proof';
import { NothingToShow } from '../NothingToShow/NothingToShow';

export const TopProof = ({ proof }) => {
	return (
		<StatsElement title={'Top proof: '}>
			{proof ? (
				<Proof proof={proof} withContent={true} />
			) : (
				<NothingToShow />
			)}
		</StatsElement>
	);
};
