import { Button, TextField } from '@mui/material';
import React from 'react';
import styles from './Form.module.css';
import { Formik } from 'formik';
import { validationSchema } from './validation';

export const Form = ({ proof }) => {
	let initialData = {
		icon_number: proof.icon_number,
        title: proof.title,
        summary: proof.summary,
        content: proof.content
	};

	return (
        <>
            <Formik
				initialValues={initialData}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
				validateOnMount={true}
				onSubmit={()=>console.log('It works')}
			></Formik>
			{/* <TextField margin='dense' id='icon' label='Choose an icon' type='icon' />

			<TextField margin='dense' id='icon' label='Title of proof' type='icon' />

			<TextField
				margin='dense'
				id='icon'
				label='Add some annotation, what your proof is about?'
				type='icon'
				fullWidth
			/>

			<TextField
				margin='dense'
				id='icon'
				label='Content of proof'
				type='icon'
				fullWidth
			/>

			<Button
				type='submit'
				variant='contained'
				className={styles.publishButton}
			>
				Publish
			</Button>

			<Button type='submit' variant='contained' className={styles.saveButton}>
				Save changes
			</Button> */}
		</>
	);
};
