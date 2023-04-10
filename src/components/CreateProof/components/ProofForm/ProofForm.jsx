import React from 'react';
import { Formik } from 'formik';
import { validationSchema } from './validation';
import { FormInsideFormik } from './FormInsideFormik/FormInsideFormik';
import { proofAPI } from '../../../../api/proofAPI';
import { useParams } from 'react-router-dom';

export const ProofForm = ({ proof, saveProof, mode }) => {
	const { talentId } = useParams();

	const createProof = async (data) => {
		try {
			const response = await proofAPI.createProof(talentId, data);
			console.log(response);
			return response;
		} catch (err) {
			console.log(err.message);
		}
	};

	// const editProof = async data => {
	// 	try {
	// 		const response = await proofAPI.editProof(talentId, data);
	// 		return response;
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// };

	const submitHandler = values => {
		saveProof({ ...values });
		console.log(proof);
		if (mode === 'create') {
			createProof({ ...proof, status: 'DRAFT' });
		} else {
			//editProof();
		}
	};

	return (
		<>
			<Formik
				initialValues={proof}
				validationSchema={validationSchema}
				validateOnChange={true}
				validateOnBlur={true}
				onSubmit={submitHandler}
			>
				<FormInsideFormik
					proof={proof}
					saveProof={saveProof}
					mode={mode}
				/>
			</Formik>
		</>
	);
};
