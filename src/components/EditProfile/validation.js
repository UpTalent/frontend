import * as Yup from 'yup';

export const validationSchema = Yup.object({
	firstname: Yup.string()
		.required('Firstname is required')
		.max(15, 'Must be 15 characters or less')
		.matches(/^[a-zA-Z]+$/, 'Only English letters allowed'),
	lastname: Yup.string()
		.required('Lastname is required')
		.max(15, 'Must be 15 characters or less')
		.matches(/^[a-zA-Z]+$/, 'Only English letters allowed'),
	skills: Yup.array().min(1, 'This filed is required'),
	location: Yup.string().max(256, 'Must be less than 256 characters'),
	birthday: Yup.date().max(new Date(), 'Cannot select a future date'),
});
