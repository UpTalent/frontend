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
	fullname: Yup.string()
		.required('Fullname is required')
		.max(30, 'Must be 30 characters or less')
		.matches(
			/^[a-zA-Z\s.]+(-[a-zA-Z\s.]+)?[a-zA-Z\s.]*$/,
			'Only English letters and one special symbol in a row ',
		),
});
