import * as Yup from 'yup';

export const validationSchema = Yup.object({
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
	location: Yup.string()
		.max(255, 'Must be less than 255 characters')
		.nullable(),
	birthday: Yup.date()
		.max(new Date().getFullYear() - 10, 'Call your mommy sweetheart ;)')
		.min(
			new Date().getFullYear() - 100,
			'You are not a Jesus brother, aren`t you?',
		)
		.nullable(),
	about_me: Yup.string()
		.max(2250, 'Must be less than 2250 characters')
		.nullable(),
});
