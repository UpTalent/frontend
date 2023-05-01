import React from 'react';
import { AddBtn } from './AddBtn';
import { MAX_KUDOS } from '../../../../service/constants';

export const ButtonGroup = ({ prevValue, setValue, currentKudos }) => {
	const handleClick = quantity => {
		if (prevValue + quantity > MAX_KUDOS - currentKudos) {
			setValue(MAX_KUDOS - currentKudos);
		} else {
			setValue(prev => prev + quantity);
		}
	};
	return (
		<div>
			<AddBtn increase={50} {...{ handleClick }} />
			<AddBtn increase={100} {...{ handleClick }} />
			<AddBtn increase={500} {...{ handleClick }} />
		</div>
	);
};
