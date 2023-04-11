import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('Title is required')
		.matches(
			/^[a-zA-Z0-9.]*$/,
			'Only English characters are allowed',
		)
		.max(255, 'Must be 15 characters or less'),
	summary: Yup.string()
		.required('Summary is required')
		.matches(
			/^[a-zA-Z0-9.]*$/,
			'Only English characters are allowed',
		)
		.max(255, 'Must be 15 characters or less'),
	content: Yup.string()
		.required('Content is required')
		.matches(
			/^[a-zA-Z0-9.]*$/,
			'Only English characters are allowed',
		)
		.max(5000, 'Must be 15 characters or less'),
	icon_number: Yup.number().typeError('Choose icon'),
});
