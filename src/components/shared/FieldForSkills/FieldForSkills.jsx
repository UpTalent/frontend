import React from 'react';
import { useSelector } from 'react-redux';
import { getAllSkills } from '../../../redux/reducers/skills';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { Field } from 'formik';

export const FieldForSkills = ({
	setFieldValue,
	setFieldTouched,
	values,
	proof,
	saveProof,
	errors,
	touched,
	required,
}) => {
	const skills = useSelector(getAllSkills);
	return (
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
					variant='outlined'
					required={required}
					error={touched?.skills && Boolean(errors?.skills)}
					helperText={errors?.skills && errors?.skills}
				/>
			)}
			disableCloseOnSelect
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox style={{ marginRight: 8 }} checked={selected} />
					{option.name}
				</li>
			)}
			sx={{
				'& .MuiAutocomplete-tag': {
					backgroundColor: '#48bde2',
					color: '#fff',
				},
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
				proof && saveProof({ ...proof, skills: selectedSkills });
			}}
			onBlur={() => setFieldTouched('skills', true)}
			value={values?.skills}
			isOptionEqualToValue={(option, value) => option.id === value.id}
		/>
	);
};
