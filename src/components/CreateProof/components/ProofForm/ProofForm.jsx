import React from 'react';
import { Formik } from 'formik';
import { validationSchema } from './validation';
import { FormInsideFormik } from './FormInsideFormik/FormInsideFormik';

export const ProofForm = ({ proof, saveProof, mode, setError}) => {
	return (
		<>
			<Formik
				initialValues={proof}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
			>
				<FormInsideFormik
					proof={proof}
					saveProof={saveProof}
					mode={mode}
					setError={setError}
				/>
			</Formik>
		</>
	);
};
