import moment from 'moment';
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
		.transform((value, rawValue) => {
			const correctDate = moment(rawValue, ['yyyy-mm-dd']).toDate();
			return correctDate
		})
		.max(moment().subtract(14, 'year'), 'Call your mommy sweetheart ;)')
		.min(
			moment().subtract(100, 'year'),
			'You are not a Jesus brother, aren`t you?',
		)
		.nullable(),
	about_me: Yup.string()
		.max(2250, 'Must be less than 2250 characters')
		.nullable(),
});
