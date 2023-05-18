import { Button, Dialog } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './KudosSelect.module.css';
import kitty from '../../../../../../../../../assets/kudosKitty.png';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../../../../../../redux/reducers/authentification';
import { SelectSkills } from './components/SelectSkills';
import { TotalKudos } from './components/TotalKudos/TotalKudos';

export const KudosSelect = ({ open, close, addKudos, skills }) => {
	const [totalKudos, setTotalKudos] = useState(0);
	const [value, setValue] = useState(0);
	const balance = useSelector(getUserKudos);
	const [list, setList] = useState([{ name: '', kudos: 0, id: 0 }]);

	const checkValidKudos = kudos => {
		return Number.isInteger(kudos) && kudos <= balance;
	};

	useEffect(() => {
		var sum = 0;
		list.map(el => (sum += el.kudos));
		setTotalKudos(sum);
	}, [list]);

	const putKudos = async () => {
		try {
			const kudosedSkillArray =
				list.length === 0
					? skills.map(el => {
							return { kudos: value, skill_id: el.id };
					  })
					: list.map(el => {
							return { kudos: el.kudos, skill_id: el.id };
					  });
			await addKudos(kudosedSkillArray);
		} catch (error) {
			console.log(error.message);
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
						minWidth: '500px',
					},
				}}
			>
				<img src={kitty} alt='kitten' className={styles.selectCat} />
				<div className={styles.selectKudos}>
					<p>How many kudos you want to give?</p>
					<SelectSkills
						{...{
							skills,
							checkValidKudos,
							list,
							setList,
							balance,
							setTotalKudos,
							value,
							setValue,
						}}
					/>
					<TotalKudos {...{ balance, totalKudos }} />
					<Button
						onClick={putKudos}
						variant='outlined'
						disabled={balance < totalKudos}
					>
						Put kudos
					</Button>
					{balance < totalKudos && (
						<p className={styles.error}>You do not have enough kudos</p>
					)}
				</div>
			</Dialog>
		</>
	);
};
