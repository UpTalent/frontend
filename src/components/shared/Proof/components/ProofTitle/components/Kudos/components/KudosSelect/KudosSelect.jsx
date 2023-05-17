import { Button, Dialog } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styles from './KudosSelect.module.css';
import kitty from '../../../../../../../../../assets/kudosKitty.png';
import { ReactComponent as NotPresCat } from '../../../../../../../../../assets/notPressedCat.svg';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../../../../../../redux/reducers/authentification';
import { MAX_KUDOS } from '../../../../../../../../../service/constants';
import { SelectSkills } from './components/SelectSkills';
import { TotalKudos } from './components/TotalKudos/TotalKudos';

export const KudosSelect = ({ open, close, addKudos, skills }) => {
	const [totalKudos, setTotalKudos] = useState(0);
	const [error, setError] = useState(false);
	const balance = useSelector(getUserKudos);

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

	const updateKudosTotal = additionalKudos => {
		setTotalKudos(totalKudos + Number(additionalKudos));
	};

	// const handleKudosChange = additionalKudos => {
	// 	const current = e.target.value;
	// 	if (current <= balance && current <= MAX_KUDOS) {
	// 		setValue(Number(current));
	// 	} else if (current > balance || current > MAX_KUDOS) {
	// 		setValue(balance);
	// 	}
	// };
	// const putKudos = () => {
	// 	if (value > 0 && Number.isInteger(value)) {
	// 		addKudos(value);
	// 		setValue(0);
	// 	} else {
	// 		setError(true);
	// 		setTimeout(() => setError(false), 3000);
	// 	}
	// };

	const checkValidKudos = kudos => {
		return Number.isInteger(kudos) && kudos <= balance && kudos <= MAX_KUDOS;
	};

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
					<SelectSkills
						{...{
							error,
							skills,
							checkValidKudos,
							updateKudosTotal
						}}
					/>

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
					<TotalKudos {...{ balance, totalKudos }} />
					<Button onClick={()=>{}} variant='outlined'>
						Put kudos
					</Button>
				</div>
			</Dialog>
		</>
	);
};
