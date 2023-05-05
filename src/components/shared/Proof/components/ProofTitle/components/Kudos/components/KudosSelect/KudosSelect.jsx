import { Button, Dialog, Slider, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styles from '../../Kudo.module.css';
import kitty from '../../../../../../../../../assets/kudosKitty.png';
import { ReactComponent as NotPresCat } from '../../../../../../../../../assets/notPressedCat.svg';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../../../../../../redux/reducers/authentification';
import { MAX_KUDOS } from '../../../../../../../../../service/constants';

export const KudosSelect = ({ open, close, addKudos }) => {
	const [value, setValue] = useState(0);
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

	const handleChange = e => {
		const current = e.target.value;
		if (current < balance && current < MAX_KUDOS) {
			setValue(Number(current));
		} else if (current > balance || current > MAX_KUDOS) {
			setValue(balance);
		}
	};
	const putKudos = () => {
		if (value > 0 && Number.isInteger(value)) {
			addKudos(value);
		} else {
			setError(true);
			setTimeout(() => setError(false), 3000);
		}
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

					<TextField
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
					/>

					<Button onClick={putKudos} variant='outlined'>
						Put kudos
					</Button>
				</div>
			</Dialog>
		</>
	);
};
