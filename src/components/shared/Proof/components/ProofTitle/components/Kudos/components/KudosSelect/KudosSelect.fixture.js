import React from 'react';
import { KudosSelect } from './KudosSelect';

export default {
	KudosSelectWithoutProps: <KudosSelect open={true} skills={[]} />,
	KudosSelectWithProps: (
		<KudosSelect
			open={true}
			skills={[
				{ id: 1, name: 'Java' },
				{ id: 2, name: 'React' },
				{ id: 3, name: 'Js' },
			]}
		/>
	),
};
