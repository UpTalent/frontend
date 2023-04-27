import * as Yup from 'yup';
import { MAX_KUDOS } from '../../service/constants';

export const validationSchema = Yup.object({
	fullname: Yup.string()
		.required('Fullname is required')
		.max(30, 'Must be 30 characters or less')
		.matches(
			/^[a-zA-Z\s.]+(-[a-zA-Z\s.]+)?[a-zA-Z\s.]*$/,
			'Only English letters and one special symbol in a row ',
		),
	kudos: Yup.number()
		.min(0, 'Kudos cannot be less than 0')
		.max(MAX_KUDOS, `Mr. Richman contact us, please! (Maximum number: ${MAX_KUDOS})`),
});
