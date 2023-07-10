import * as Yup from 'yup';

export const validationSchema = Yup.object({
	contactInfo: Yup.string()
		.required('Contact info is required'),
	message: Yup.string()
		.required('This field is required')
		.max(1000, 'Express yourself in 1000 symbols maximum'),
});
