import { Breadcrumbs, Link, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';

export const CustomBreadcrumbs = ({ relatedLinks }) => {
	const breadcrumbs = relatedLinks?.map((el, i) => {
		if (i === relatedLinks.length - 1) {
			return (
				<Typography key={i} color={'primary'}>
					{el.name}
				</Typography>
			);
		} else {
			return (
				<Link key={i} underline='hover' color='inherit' href={el?.link || '#'}>
					{el?.name}
				</Link>
			);
		}
	});

	return (
		<Breadcrumbs
			separator={<ChevronRightIcon fontSize='small' />}
			aria-label='breadcrumb'
		>
			{breadcrumbs}
		</Breadcrumbs>
	);
};
