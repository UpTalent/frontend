import React from 'react';
import { AddBtn } from './AddBtn';

export const ButtonGroup = ({ setFieldValue, kudosCurrent }) => {
	const handleClick = quantity => {
		setFieldValue('kudos', kudosCurrent + quantity);
	};
	return (
		<div>
			<AddBtn increase={50} {...{ handleClick }} />
			<AddBtn increase={100} {...{ handleClick }} />
			<AddBtn increase={500} {...{ handleClick }} />
		</div>
	);
};
