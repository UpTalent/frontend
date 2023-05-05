import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './FormInsideFormik.module.css';
import { Form, Field, useFormikContext } from 'formik';
import { IconList } from './IconList/IconList';
import { useNavigate, useParams } from 'react-router-dom';
import {
	createDraftProof,
	editProof,
	publishDraftProof,
} from '../../../../../redux/reducers/proof';
import { ConfirmationMessage } from '../../../../shared/Proof/components/ConfirmationMessage';
import { profileAPI } from '../../../../../api/profileAPI';
import { useStoreDispatch } from '../../../../../redux/store';
import { Markdown } from '../../../../shared/FormField/components/Markdown/Markdown';

export const FormInsideFormik = ({ proof, saveProof, mode }) => {
	const { isValid, touched, errors, setFieldValue, values } =
		useFormikContext();
	const navigate = useNavigate();
	const dispatch = useStoreDispatch();
	const [skills, setSkills] = useState([]);
	const { talentId } = useParams();
	const [openConfirm, setOpenConfirm] = useState(false);

	const getSkills = async () => {
		try {
			const { data } = await profileAPI.getUser('talent', talentId);
			setSkills(data.skills);
		} catch (error) {
			console.log(error);
		}
	};

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	const handleChangesInFields = event => {
		const { name, value } = event.target;
		setFieldValue(name, value);
		saveProof({ ...proof, [name]: value });
	};

	const submitHandler = () => {
		if (mode === 'create') {
			dispatch(
				createDraftProof({ talentId, data: { ...values, status: 'DRAFT' } }),
			);
		} else if (mode === 'edit') {
			const data = {
				talentId,
				draftProof: { ...values },
				proofId: proof.id,
				status: 'DRAFT',
			};
			dispatch(editProof(data));
		}
		navigate(`/profile/talent/${talentId}/proofs?page=1&filter=DRAFT`);
	};

	const publishHandler = () => {
		if (mode === 'edit') {
			const data = {
				talentId,
				draftProof: { ...proof, status: 'PUBLISHED' },
				proofId: proof.id,
				status: 'PUBLISHED',
			};
			dispatch(editProof(data));
			navigate(`/profile/talent/${talentId}/proofs?page=1&filter=PUBLISHED`);
		} else if (mode === 'create') {
			dispatch(
				publishDraftProof({
					talentId,
					draftProof: { ...proof, status: 'DRAFT' },
				}),
			);
			navigate(`/profile/talent/${talentId}/proofs?page=1&filter=PUBLISHED`);
		}
	};

	useEffect(() => {
		if (skills.length === 0) {
			getSkills();
		}
	}, []);

	return (
		<Form className={styles.registrationForm}>
			<div className={styles.iconTitle}>
				<IconList
					proof={proof}
					setFieldValue={setFieldValue}
					saveIcon={saveProof}
					error={errors.icon_number}
					touched={touched.icon_number}
				/>
				<Field
					label='Title of proof'
					name='title'
					as={TextField}
					className={styles.title}
					error={touched.title && Boolean(errors.title)}
					helperText={touched.title && errors.title}
					onChange={handleChangesInFields}
				/>
			</div>

			<Field
				label='Add some annotation, what your proof is about?'
				name='summary'
				multiline
				fullWidth
				rows={4}
				onKeyDown={handleKeyDown}
				as={TextField}
				error={touched.summary && Boolean(errors.summary)}
				helperText={touched.summary && errors.summary}
				onChange={handleChangesInFields}
			/>
			<Field
				label='Content of proof'
				name='content'
				multiline
				fullWidth
				rows={4}
				as={TextField}
				error={touched.content && Boolean(errors.content)}
				helperText={touched.content && errors.content}
				onChange={handleChangesInFields}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Markdown />
						</InputAdornment>
					),
				}}
			/>
			<Field
				name='skills'
				component={Autocomplete}
				options={skills}
				getOptionLabel={option => option.name}
				renderInput={(params, i) => (
					<TextField
						label='Skills'
						key={i}
						{...params}
						name='skill'
						variant='outlined'
					/>
				)}
				sx={{
					'& .MuiAutocomplete-tag': {
						backgroundColor: '#48bde2',
						color: '#fff',
					},
					maxWidth: '500px',
				}}
				multiple
				limitTags={3}
				fullWidth
				onChange={(event, value) => {
					const selectedSkills = value.map(skill => ({
						id: skill.id,
						name: skill.name,
					}));
					setFieldValue('skills', selectedSkills);
					saveProof({ ...proof, skills: selectedSkills });
				}}
				value={values.skills}
				isOptionEqualToValue={(option, value) => option.id === value.id}
			/>
			<div className={styles.buttonGroup}>
				<Button
					variant='contained'
					className={`${isValid && styles.saveButton}`}
					disabled={!isValid}
					onClick={submitHandler}
				>
					{mode === 'create' ? 'SAVE AS DRAFT' : 'SAVE CHANGES'}
				</Button>

				<Button
					variant='contained'
					className={`${isValid && styles.publishButton}`}
					disabled={!isValid}
					onClick={() => setOpenConfirm(true)}
				>
					Publish
				</Button>
				{openConfirm && (
					<ConfirmationMessage
						action={'PUBLISH'}
						handleConfim={setOpenConfirm}
						confirmMessage={openConfirm}
						buttonHandler={publishHandler}
					/>
				)}
			</div>
		</Form>
	);
};
