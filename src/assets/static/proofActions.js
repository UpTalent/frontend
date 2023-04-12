import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const proofActions = [
	{
		action: 'DELETE',
		icon: <ErrorOutlineIcon color='secondary' />,
		text: 'Proof will be impossible to recover',
	},
	{
		action: 'PUBLISH',
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to publish a proof?',
	},
	{
		action: 'HIDE',
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to hide a proof?',
	},
];
