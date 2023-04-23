import * as Yup from 'yup';

export const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required')
		.max(100, 'Max length of email is 100 symbols'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters long')
		.max(32, 'Max password length is 32 characters long'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	firstname: Yup.string()
		.required('Firstname is required')
		.max(15, 'Must be 15 characters or less')
		.matches(
			/^[a-zA-Z]+(-[a-zA-Z]+)?[a-zA-Z]*$/,
			'Only English letters and one "-" character in the middle allowed ',
		),
	lastname: Yup.string()
		.required('Lastname is required')
		.max(15, 'Must be 15 characters or less')
		.matches(
			/^[a-zA-Z]+(-[a-zA-Z]+)?[a-zA-Z]*$/,
			'Only English letters and one "-" character in the middle allowed ',
		),
	skills: Yup.array().min(1, 'This filed is required'),
});
