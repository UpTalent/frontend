import * as Yup from 'yup';

export const validationSchema = Yup.object({
	firstname: Yup.string()
		.required('Firstname is required')
		.max(15, 'Must be 15 characters or less')
		.matches(
			/^[a-zA-Z]+(-[a-zA-Z]+)?[a-zA-Z]*$/,
			'Only English letters and one "-" character in the middle allowed ',
		),
});
