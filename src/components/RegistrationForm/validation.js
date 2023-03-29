import * as Yup from 'yup';

export const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters long'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	firstname: Yup.string()
		.required('Firstname is required')
		.max(15, "Must be 15 characters or less")
		.matches(/^[a-zA-Z]+$/, "Only English letters allowed"),
	lastname: Yup.string()
		.required('Lastname is required')
		.max(15, "Must be 15 characters or less")
		.matches(/^[a-zA-Z]+$/, "Only English letters allowed"),
	skills: Yup.array()
		.min(1,'This filed is required')
});