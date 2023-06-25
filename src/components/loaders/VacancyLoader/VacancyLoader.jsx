import { Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';
import React from 'react';

export const VacancyLoader = ({ amount = 3 }) => {
	const SingleVacancy = () => {
		return (
			<Grid item sm={12} md={12} lg={12}>
				<Card>
					<CardHeader
						avatar={
							<Skeleton
								animation='wave'
								variant='circular'
								width={45}
								height={45}
							/>
						}
						title={
							<Skeleton
								animation='wave'
								height={10}
								width='50%'
								style={{ marginBottom: 6 }}
							/>
						}
						subheader={<Skeleton animation='wave' height={10} width='20%' />}
						sx={{ boxShadow: '-1px 22px 0px -20px rgba(0, 0, 0, 0.11)' }}
					/>
					<CardContent>
						<Skeleton
							sx={{ height: 50 }}
							animation='wave'
							variant='rectangular'
						/>
					</CardContent>
				</Card>
			</Grid>
		);
	};
	return (
		<Grid container rowSpacing={4} columnSpacing={3}>
			{[...Array(amount)].map((el, i) => (
				<SingleVacancy key={i} />
			))}
		</Grid>
	);
};
