import React from 'react';
import { Formik } from 'formik';
import { validationSchema } from './validation';
import { FormInsideFormik } from './FormInsideFormik/FormInsideFormik';

export const ProofForm = ({ proof, updateTempProof, mode }) => {
	return (
		<>
			<Formik initialValues={proof} validationSchema={validationSchema}>
				<FormInsideFormik {...{ proof, mode }} saveProof={updateTempProof} />
			</Formik>
		</>
	);
};
