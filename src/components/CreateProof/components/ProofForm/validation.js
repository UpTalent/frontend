import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('Title is required')
		.matches(/^[,./:;'"|<>\w\s&^%$#@!*()_+=-]+$/, 'Only latin letters, digits and special symbols are allowed')
		.max(90, 'Must be 90 characters or less'),
	summary: Yup.string()
		.required('Summary is required')
		.matches(/^[,./:;'"|<>\w\s&^%$#@!*()_+=-]+$/, 'Only latin letters, digits and special symbols are allowed')
		.max(150, 'Must be 150 characters or less'),
	content: Yup.string()
		.required('Content is required')
		.matches(/^(?!\s+$).+$/, 'Please write something')
		.max(5000, 'Must be 5000 characters or less'),
	icon_number: Yup.number().typeError('Choose icon'),
});
