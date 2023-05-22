import { Button, Dialog } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './KudosSelect.module.css';
import kitty from '../../../../../../../../../assets/kudosKitty.png';
import kittyPaw from '../../../../../../../../../assets/kudosKittyPaw.png';
import kittyTail from '../../../../../../../../../assets/kudosKittyTail.png';
import { useSelector } from 'react-redux';
import { getUserKudos } from '../../../../../../../../../redux/reducers/authentification';
import { SelectSkills } from './components/SelectSkills';
import { TotalKudos } from './components/TotalKudos/TotalKudos';
import { DisabledText } from '../../../../../../../DisabledText/DisabledText';

export const KudosSelect = ({ open, close, addKudos, skills }) => {
	const [list, setList] = useState([{ name: '', kudos: 0, id: 0 }]);
	const [totalKudos, setTotalKudos] = useState(0);
	const [kudosedAll, setKudosAll] = useState(false);
	const [value, setValue] = useState(0);
	const balance = useSelector(getUserKudos);

	const disableButton = {
		condition: [
			balance < totalKudos,
			totalKudos === 0,
			list.some(el => el.kudos === 0),
		],
		helperText: [
			"You don't have enough kudos",
			'Add at least 1 kudos',
			'Put kudos on all chosen skills',
		],
	};

	const checkValidKudos = kudos => {
		return Number.isInteger(kudos) && kudos <= balance && kudos >= 0;
	};

	useEffect(() => {
		var sum = 0;
		list.map(el => (sum += el.kudos));
		setTotalKudos(sum);
	}, [list]);

	useEffect(() => {
		return () => {
			setList([]);
			setTotalKudos(0);
			setKudosAll(false);
		};
	}, [open]);

	const putKudos = async () => {
		const kudosedSkillArray =
			list.length === 0
				? skills.map(el => {
						return {
							kudos: value,
							skill_id: el.id,
						};
				  })
				: list.map(el => {
						return { kudos: el.kudos, skill_id: el.id };
				  });
		await addKudos(kudosedSkillArray);
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
						maxHeight: '500px',
						overflow: 'visible',
					},
				}}
			>
				<img src={kitty} alt='kitten' className={styles.selectCat} />
				<img
					src={kittyPaw}
					alt='kitten'
					className={`${styles.kittyParts} ${styles.paw}`}
				/>
				<img
					src={kittyPaw}
					alt='kitten'
					className={`${styles.kittyParts} ${styles.paw} ${styles.Right}`}
				/>
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
							kudosedAll,
							setKudosAll,
						}}
					/>
					<TotalKudos
						{...{
							balance,
							totalKudos,
							totalItems: !kudosedAll ? list.length : skills.length,
						}}
					/>
					<DisabledText
						{...{
							helperText:
								disableButton.helperText[disableButton.condition.indexOf(true)],
							condition: disableButton.condition.some(el => el),
						}}
					>
						<Button
							onClick={putKudos}
							variant='outlined'
							disabled={disableButton.condition.some(el => el)}
						>
							Put kudos
						</Button>
					</DisabledText>
				</div>
				<img
					src={kittyTail}
					alt='kitten'
					className={`${styles.kittyParts} ${styles.tail}`}
				/>
			</Dialog>
		</>
	);
};
