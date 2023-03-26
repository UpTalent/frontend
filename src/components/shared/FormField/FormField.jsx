import React from 'react';
import { Field, useField } from 'formik';
import { TextField, InputAdornment } from '@mui/material';

export const FormField = props => {
	const [field, meta] = useField(props.name);
	return (
		<Field
			{...field}
			type={props.type}
			label={props.label}
			required={props.required}
			as={TextField}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>{props.icon}</InputAdornment>
				),
			}}
			fullWidth
			error={meta.touched && !!meta.error}
			helperText={meta.touched && meta.error}
		/>
	);
};
