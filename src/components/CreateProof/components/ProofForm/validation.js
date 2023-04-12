import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('Title is required')
		.matches(
			/^(?!\s+$).+/,
			'Please write something',
		)
		.max(255, 'Must be 255 characters or less'),
	summary: Yup.string()
		.required('Summary is required')
		.matches(
			/^(?!\s+$).+/,
			'Please write something',
		)
		.max(255, 'Must be 255 characters or less'),
	content: Yup.string()
		.required('Content is required')
		.matches(
			/^(?!\s+$).+/,
			'Please write something',
		)
		.max(5000, 'Must be 5000 characters or less'),
	icon_number: Yup.number().typeError('Choose icon'),
});
