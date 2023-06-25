import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { DELETE, HIDE, PUBLISH, SHOW } from '../../service/constants';

export const Actions = [
	{
		action: DELETE,
		icon: <ErrorOutlineIcon color='secondary' />,
		text: 'You won\'t be able to recover it',
	},
	{
		action: SHOW,
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to make this item visible to everyone?',
	},
	{
		action: HIDE,
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to hide this item?',
	},
	{
		action: PUBLISH,
		icon: <AssignmentIcon color='primary' />,
		text: 'Do you want to publish this item? You won`t be able to edit it',
	},
];