import { Tooltip } from '@mui/material';
import React from 'react';

export const DisabledText = ({ helperText, condition, children, className }) => {
	return (
		<>
			{condition ? (
				<Tooltip title={helperText} arrow>
					<span className={className}>{children}</span>
				</Tooltip>
			) : (
				children
			)}
		</>
	);
};
