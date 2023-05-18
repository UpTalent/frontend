import React, { useEffect, useState } from 'react';
import styles from '../../KudosSelect.module.css';
import { ReactComponent as NotPresCat } from '../../../../../../../../../../../assets/notPressedCat.svg';
import { Slider, TextField } from '@mui/material';
import { MAX_KUDOS } from '../../../../../../../../../../../service/constants';

export const AddToAll = ({
	balance,
	skills,
	setTotalKudos,
	value,
	setValue,
}) => {
	const [max] = useState(Math.floor(balance / skills.length));
	const handleChange = e => {
		const current = e.target.value;
		if (current <= max && current <= MAX_KUDOS) {
			setValue(Number(current));
		} else if (current > max || current > MAX_KUDOS) {
			setValue(max);
		}
	};
	useEffect(() => {
		setTotalKudos(value * skills.length);
	}, [value]);
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
			value: max,
			label: (
				<div className={styles.inputs}>
					<NotPresCat />
					<b>{max}</b>
				</div>
			),
		},
	];
	return (
		<div className={styles.AddToAll}>
			<TextField
				value={value}
				label='Kudos'
				inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
				onChange={handleChange}
			/>
			<Slider
				className={styles.slider}
				marks={marks}
				value={value}
				onChange={handleChange}
				max={max}
				aria-labelledby='input-slider'
			/>
		</div>
	);
};
