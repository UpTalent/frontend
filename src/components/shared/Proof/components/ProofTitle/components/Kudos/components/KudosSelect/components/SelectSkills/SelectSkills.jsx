import React from 'react';
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
import { DisabledText } from '../../../../../../../../../DisabledText/DisabledText';

export const SelectSkills = ({
	skills,
	checkValidKudos,
	list,
	setList,
	balance,
	setTotalKudos,
	value,
	setValue,
	kudosedAll,
	setKudosAll,
}) => {
	const handleDeleteItem = value => {
		setList(list.filter(el => el.name !== value.name));
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
			<p className={styles.infoText}>
				{kudosedAll
					? 'Some amount to all skills on this proof'
					: 'At some on skills of your choice'}
			</p>

			<div className={styles.listOfSkills}>
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
							<DisabledText condition={!el.name} helperText={'Please choose skill first'}>
								<TextField
									disabled={!el.name}
									value={el.kudos}
									onChange={event => addKudos(event, id)}
									label='Kudos'
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								/>
							</DisabledText>
							<ClearIcon
								onClick={() => {
									handleDeleteItem(el);
								}}
							/>
						</div>
					))}
			</div>
			{kudosedAll && (
				<AddToAll {...{ balance, skills, setTotalKudos, value, setValue }} />
			)}
			<div className={styles.selectButtons}>
				{skills.length > list.length && (
					<Button
						variant='contained'
						onClick={() => {
							setList(prev => prev.concat({ name: '', kudos: 0, id: 0 }));
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
					disabled={kudosedAll}
				>
					Add to all
				</Button>
			</div>
		</div>
	);
};
