import { Button } from '@mui/material';
import React from 'react';

export const RadioButton = ({ text, handleClick, current, id, setCurrent }) => {
	const selectButton = e => {
		setCurrent(Number(e.target.id));
		handleClick();
	};
	return (
		<Button
			id={id}
			onClick={selectButton}
			variant={current === id ? 'contained' : 'outlined'}
		>
			{text}
		</Button>
	);
};
