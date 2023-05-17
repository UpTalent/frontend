import React from 'react';
import styles from '../../KudosSelect.module.css';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SpeedDial,
	SpeedDialIcon,
	TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

export const SelectSkills = ({
	skills,
	error,
	checkValidKudos,
	updateKudosTotal,
	list,
	setList,
}) => {
	const handleDeleteItem = value => {
		setList(
			list.filter(el => {
				return el.name !== value.name;
			}),
		);
	};

	const changeItemInList = (id, changedFiled) => {
		setList(prev =>
			prev.map((el, index) => {
				if (index === id) {
					return { ...el, ...changedFiled };
				}
				return el;
			}),
		);
	};

	const addItemToList = (id, value) => {
		const selected = skills.find(skill => skill.name === value);
		changeItemInList(id, selected);
	};

	const addKudos = (event, id) => {
		const kudosAmount = { kudos: Number(event.target.value) };
		if (checkValidKudos(kudosAmount.kudos)) {
			changeItemInList(id, kudosAmount);
			updateKudosTotal(kudosAmount.kudos);
		}
	};
	return (
		<>
			{list.length &&
				list.map((el, id) => (
					<div className={styles.listItem} key={id}>
						<FormControl fullWidth>
							<InputLabel id='select-label'>Skills</InputLabel>
							<Select
								labelId='select-label'
								label='Skills'
								value={el.name}
								renderValue={selected => el.name}
								onChange={event => {
									addItemToList(id, event.target.value);
								}}
							>
								{skills?.map(skill => (
									<MenuItem
										value={skill.name}
										key={skill.id}
										disabled={!!list.find(item => item.id === skill.id)}
									>
										{skill.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							disabled={!el.name}
							value={el.kudos}
							onChange={event => addKudos(event, id)}
							label='Kudos'
							error={error}
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							helperText={error && 'Kudos number must be positive integer'}
						/>
						<ClearIcon
							onClick={() => {
								handleDeleteItem(el);
							}}
						/>
					</div>
				))}
			{skills.length > list.length && (
				<SpeedDial
					ariaLabel='add item'
					icon={<SpeedDialIcon />}
					onClick={() =>
						setList(prev => prev.concat({ name: '', kudos: '', id: 0 }))
					}
				/>
			)}
		</>
	);
};
