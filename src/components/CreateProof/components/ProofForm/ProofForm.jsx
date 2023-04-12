import React from 'react';
import { Formik } from 'formik';
import { validationSchema } from './validation';
import { FormInsideFormik } from './FormInsideFormik/FormInsideFormik';

export const ProofForm = ({ proof, updateTempProof, mode, setError }) => {
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
					saveProof={updateTempProof}
					mode={mode}
					setError={setError}
				/>
			</Formik>
		</>
	);
};
