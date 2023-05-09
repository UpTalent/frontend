import { Card, CardHeader, Skeleton } from '@mui/material';
import React from 'react';

export const ProofLoader = ({ amount }) => {
	const amountOfProofs = Array.from({ length: amount }, (_, index) => index);
	return (
		<>
			{amountOfProofs.map((el, id) => (
				<Card
					key={id}
					sx={{
						height: 180,
						marginY: '15px',
					}}
				>
					<CardHeader
						avatar={
							<Skeleton
								animation='wave'
								variant='circular'
								width={100}
								height={100}
							/>
						}
						title={<Skeleton animation='wave' height={120} />}
					/>
				</Card>
			))}
		</>
	);
};
