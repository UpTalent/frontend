import React, { useState } from 'react';
import styles from '../../KudosSelect.module.css';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SpeedDialIcon,
	TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { AddToAll } from '../AddToAll/AddToAll';

export const SelectSkills = ({
	skills,
	checkValidKudos,
	list,
	setList,
	balance,
	setTotalKudos,
	value,
	setValue,
}) => {
	const [kudosedAll, setKudosAll] = useState(false);
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
		}
	};

	return (
		<div className={styles.selectedSkillsList}>
			{list.length > 0 &&
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
							inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						/>
						<ClearIcon
							onClick={() => {
								handleDeleteItem(el);
							}}
						/>
					</div>
				))}
			{kudosedAll && (
				<AddToAll {...{ balance, skills, setTotalKudos, value, setValue }} />
			)}
			<div className={styles.selectButtons}>
				{skills.length > list.length && (
					<Button
						variant='contained'
						onClick={() => {
							setList(prev => prev.concat({ name: '', kudos: '', id: 0 }));
							setKudosAll(false);
						}}
					>
						<SpeedDialIcon />
					</Button>
				)}
				<Button
					onClick={() => {
						setKudosAll(true);
						setList([]);
					}}
					variant='contained'
				>
					Add to all
				</Button>
			</div>
		</div>
	);
};
