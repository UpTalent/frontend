import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('Title is required')
		.matches(
			/^[,./:;'"|<>\w\s&?{}[\]^%$#@!*()_+=-]+$/,
			'Only latin letters, digits and special symbols are allowed',
		)
		.max(75, 'Must be 75 characters or less'),
	content: Yup.string()
		.trim()
		.required('Content is required')
		.max(5000, 'Must be 5000 characters or less'),
<<<<<<< HEAD
	skills: Yup.array().max(30, 'Max number of skills is 30'),
=======
	skills: Yup.array()
		.max(30, 'Max number of skills is 30')
		.min(1, 'Skills are required'),
>>>>>>> dev
});
