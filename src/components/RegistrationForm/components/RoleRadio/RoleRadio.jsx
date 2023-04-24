import { ButtonGroup } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { RadioButton } from './RadioButton';

export const RoleRadio = ({ handleTalent, handleSponsor }) => {
	const [isChecked, setIsChecked] = useState(null);
	const buttonInfo = [
		{ id: 0, text: 'Talent', handleClick: handleTalent },
		{ id: 1, text: 'Sponsor', handleClick: handleSponsor },
	];
	return (
		<ButtonGroup color='primary' sx={{ fontSize: '32px' }}>
			{buttonInfo.map((button, i) => (
				<RadioButton
					{...button}
					key={i}
					current={isChecked}
					setCurrent={setIsChecked}
				/>
			))}
		</ButtonGroup>
	);
};
