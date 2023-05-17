import {
	Autocomplete,
	Button,
	Dialog,
	Slider,
	SpeedDial,
	SpeedDialIcon,
	TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../Kudo.module.css';
import kitty from '../../../../../../../../../assets/kudosKitty.png';
import { ReactComponent as NotPresCat } from '../../../../../../../../../assets/notPressedCat.svg';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../../../../../../redux/reducers/authentification';
import { MAX_KUDOS } from '../../../../../../../../../service/constants';
import ClearIcon from '@mui/icons-material/Clear';

export const KudosSelect = ({ open, close, addKudos, skills }) => {
	const [value, setValue] = useState(0);
	const [error, setError] = useState(false);
	const balance = useSelector(getUserKudos);
	const [skillsList, setSkillList] = useState(skills.map(el => el.name));
	const [list, setList] = useState([{ name: '', kudos: 0 }]);

	const marks = [
		{
			value: 0,
			label: (
				<div className={styles.inputs}>
					<NotPresCat />
					<b>0</b>
				</div>
			),
		},
		{
			value: balance,
			label: (
				<div className={styles.inputs}>
					<NotPresCat />
					<b>{balance}</b>
				</div>
			),
		},
	];

	const handleChange = e => {
		const current = e.target.value;
		if (current <= balance && current <= MAX_KUDOS) {
			setValue(Number(current));
		} else if (current > balance || current > MAX_KUDOS) {
			setValue(balance);
		}
	};
	const putKudos = () => {
		if (value > 0 && Number.isInteger(value)) {
			addKudos(value);
			setValue(0);
		} else {
			setError(true);
			setTimeout(() => setError(false), 3000);
		}
	};

	// useEffect(() => {
	// 	setSkillList(prev =>
	// 		prev.filter(skill => !list.some(item => item.name === skill.name)),
	// 	);
	// 	//console.log('useEffect', skillsList);
	// 	// const skillNames = skillsList.map(skill => skill.name);

	// 	// const updatedSkillsList = skillsList.filter(
	// 	// 	skill => !list.some(item => item.name === skill.name),
	// 	// );

	// 	// list.forEach(item => {
	// 	// 	if (!skillNames.includes(item.name)) {
	// 	// 		updatedSkillsList.push(item);
	// 	// 	}
	// 	// });

	// 	// setSkillList(updatedSkillsList);
	// 	// console.log('SkillsList:', skillsList);
	// }, [list]);

	// useEffect(() => {
	// 	setSkillList(skills);
	// 	setList([{ name: '', kudos: 0 }]);
	// }, [open]);

	return (
		<>
			<Dialog
				open={open}
				onClose={() => close(false)}
				sx={{
					'& .MuiPaper-root': {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<img src={kitty} alt='kitten' className={styles.selectCat} />
				<div className={styles.selectKudos}>
					<p>How many kudos you want to give?</p>
					{list.length &&
						list.map((el, id) => (
							<div className={styles.listItem} key={id}>
								<Autocomplete
									disablePortal
									id='choose-skill'
									options={skillsList}
									renderInput={params => (
										<TextField {...params} label='Skills' />
									)}
									fullWidth
									onChange={(event, value) => {
										setSkillList(prev => prev.filter(skill => skill !== value));
										setList(prev => [...prev, (prev[id].name = value)]);
										console.log(list);
									}}
								/>
								<TextField
									value={el.kudos}
									// onChange={handleChange}
									error={error}
									inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
									helperText={error && 'Kudos number must be positive integer'}
								/>
								<ClearIcon
									onClick={() => {
										setList(prev =>
											prev.filter(skill => skill.name !== el.name),
										);

										setSkillList(prev => prev.push(el.name));
										console.log(el);
										console.log('list: ', list);
										console.log('skillList', skillsList);
									}}
								/>
							</div>
						))}
					{skills.length > list.length && (
						<SpeedDial
							ariaLabel='add item'
							icon={<SpeedDialIcon />}
							onClick={() =>
								setList(prev => prev.concat({ name: '', kudos: '' }))
							}
						/>
					)}

					{/* <TextField
						value={value}
						onChange={handleChange}
						error={error}
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						helperText={error && 'Kudos number must be positive integer'}
					/>

					<Slider
						className={styles.slider}
						marks={marks}
						value={value}
						onChange={handleChange}
						max={balance}
						aria-labelledby='input-slider'
					/> */}

					<Button onClick={putKudos} variant='outlined'>
						Put kudos
					</Button>
				</div>
			</Dialog>
		</>
	);
};
