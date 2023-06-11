import React from 'react';
import { KudosSelect } from './KudosSelect';
import { forCosmos } from '../../../../../../../../../service/HOC/forCosmos';

const Kudosselect = () => {
	return (
		<KudosSelect
			open={true}
			skills={[
				{ id: 1, name: 'Java' },
				{ id: 2, name: 'React' },
				{ id: 3, name: 'Js' },
			]}
		/>
	);
};

export default forCosmos(Kudosselect);
