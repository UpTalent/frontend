import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { DELETE, HIDE, PUBLISH, SHOW } from '../../service/constants';

const defaultIcon = <AssignmentIcon color='primary' />;

export const Actions = [
	{
		action: DELETE,
		icon: <ErrorOutlineIcon color='secondary' />,
		text: "You won't be able to recover it",
	},
	{
		action: SHOW,
		icon: defaultIcon,
		text: 'Do you want to make this item visible to everyone?',
	},
	{
		action: HIDE,
		icon: defaultIcon,
		text: 'Do you want to hide this item?',
	},
	{
		action: PUBLISH,
		icon: defaultIcon,
		text: 'Do you want to publish this item? You won`t be able to edit it',
	},
	{
		action: 'APPLY',
		icon: defaultIcon,
		text: 'You can apply to vacancy only once, be sure to double check your response',
	},
	{
		action: 'REPLY',
		icon: defaultIcon,
		text: 'Do you really want to send this response?',
	},
];
