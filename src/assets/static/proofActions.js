import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const proofActions = [
	{
		action: 'DELETE',
		icon: <ErrorOutlineIcon color='secondary' />,
		text: 'Proof will be impossible to recover',
	},
	{
		action: 'SHOW',
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to make a proof visible to everyone ?',
	},
	{
		action: 'HIDE',
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to hide a proof?',
	},
	{
		action: 'PUBLISH',
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to publish a proof? You won`t be able to edit it',
	},
];
