import { Tooltip } from '@mui/material';
import React from 'react';

export const DisabledText = ({ helperText, condition, children }) => {
	return (
		<>
			{condition ? (
				<Tooltip title={helperText} arrow>
					<span>{children}</span>
				</Tooltip>
			) : (
				children
			)}
		</>
	);
};
