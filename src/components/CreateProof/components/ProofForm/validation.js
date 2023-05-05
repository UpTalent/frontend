import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('Title is required')
		.matches(/^[,./:;'"|<>\w\s&?{}[\]^%$#@!*()_+=-]+$/, 'Only latin letters, digits and special symbols are allowed')
		.max(75, 'Must be 75 characters or less'),
	summary: Yup.string()
		.required('Summary is required')
		.matches(/^[,./:;'"|<>\w\s&?{}[\]^%$#@!*()_+=-]+$/, 'Only latin letters, digits and special symbols are allowed')
		.max(255, 'Must be 255 characters or less'),
	content: Yup.string()
		.trim().required('Content is required')
		.max(5000, 'Must be 5000 characters or less'),
	icon_number: Yup.number().typeError('Choose icon'),
});