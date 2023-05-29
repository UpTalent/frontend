import React, { useState } from 'react';
import styles from '../../KudosSelect.module.css';
import {
	Button,
	Menu,
	MenuItem,
	SpeedDialIcon,
	TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { AddToAll } from '../AddToAll/AddToAll';
import { MAX_KUDOS } from '../../../../../../../../../../../service/constants';

export const SelectSkills = ({
	skills,
	list,
	setList,
	balance,
	setTotalKudos,
	value,
	setValue,
	kudosedAll,
	setKudosAll,
}) => {
	const [openSkillList, setOpenSkillList] = useState(null);
	const handleDeleteItem = value => {
		setList(list.filter(el => el.name !== value.name));
	};

	const isKudosValid = (kudos, maxValue) => {
		return (
			kudos <= maxValue &&
			kudos <= MAX_KUDOS &&
			Number.isInteger(Number(kudos)) &&
			kudos >= 0
		);
	};

	const addKudos = (event, id) => {
		const current = event.target.value;
		let kudosAmount = 0;    
		if (isKudosValid(current, balance)) {
			kudosAmount = Number(current);
		} else if (current >= balance || current >= MAX_KUDOS) {
			kudosAmount = balance;
		}

		setList(prev =>
			prev.map((el, index) => {
				if (index === id) {
					return { ...el, kudos: kudosAmount };
				}
				return el;
			}),
		);
	};

	const handleClose = () => setOpenSkillList(null);

	const handleClick = skill => {
		const preparedSkill = {
			name: skill.name,
			kudos: 0,
			id: skill.id,
		};
		setList(prev => prev.concat(preparedSkill));
		setKudosAll(false);
		handleClose();
	};

	return (
		<div className={styles.selectedSkillsList}>
			<p className={styles.infoText}>
				{kudosedAll
					? 'Some amount to all skills on this proof'
					: 'Choose skills you want to put kudos on'}
			</p>

			<div className={styles.listOfSkills}>
				{list.length > 0 &&
					list.map((el, id) => (
						<div className={styles.listItem} key={id}>
							<TextField
								label='Skills'
								value={el.name}
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
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
			</div>
			{kudosedAll && (
				<AddToAll {...{ balance, skills, setTotalKudos, value, setValue, isKudosValid }} />
			)}
			<div className={styles.selectButtons}>
				{skills.length > list.length && (
					<>
						<Button
							variant='contained'
							onClick={event => {
								setOpenSkillList(event.currentTarget);
							}}
						>
							<SpeedDialIcon />
						</Button>
						<Menu
							anchorEl={openSkillList}
							open={Boolean(openSkillList)}
							onClose={handleClose}
							PaperProps={{
								style: {
									maxHeight: '350px',
								},
							}}
						>
							{skills?.map(skill => (
								<MenuItem
									value={skill.name}
									key={skill.id}
									disabled={!!list.find(item => item.id === skill.id)}
									onClick={() => handleClick(skill)}
								>
									{skill.name}
								</MenuItem>
							))}
						</Menu>
					</>
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
