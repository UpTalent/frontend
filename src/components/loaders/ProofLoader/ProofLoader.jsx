import { Skeleton } from '@mui/material';
import React from 'react';

export const ProofLoader = () => {
	return (
		<div>
			<Skeleton variant='circular' width={40} height={40} />
			<Skeleton variant='rectangular' width={210} height={60} />
			<Skeleton variant='rounded' width={210} height={60} />
		</div>
	);
};
