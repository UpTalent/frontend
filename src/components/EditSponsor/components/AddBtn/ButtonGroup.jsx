import React from 'react';
import { AddBtn } from './AddBtn';

export const ButtonGroup = ({ setValue }) => {
	const handleClick = quantity => {
		setValue(prev => prev + quantity);
	};
	return (
		<div>
			<AddBtn increase={50} {...{ handleClick }} />
			<AddBtn increase={100} {...{ handleClick }} />
			<AddBtn increase={500} {...{ handleClick }} />
		</div>
	);
};
