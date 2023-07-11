import * as Yup from 'yup';

export const validationSchema = Yup.object({
	contactInfo: Yup.string()
		.matches(
			/(^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$)|(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)/,
			'Enter here your phone number or email - f.e. (123)456-7890, 1234567890, expample@gmail.com',
		)
		.required('Contact info is required'),
	message: Yup.string()
		.required('This field is required')
		.max(1000, 'Express yourself in 1000 symbols maximum'),
});
