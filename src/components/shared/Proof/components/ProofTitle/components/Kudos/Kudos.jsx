import React, { memo, useState } from 'react';
import styles from './Kudo.module.css';
import { ReactComponent as NotPresCat } from '../../../../../../../assets/notPressedCat.svg';
import tick from '../../../../../../../assets/tick.svg';
import paw from '../../../../../../../assets/paw.png';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { KudosList } from './components/KudosList';
import { KudosSelect } from './components/KudosSelect/KudosSelect';
import { formatNumber } from '../../../../../../../service/hooks/formatNumber';
import { Tooltip } from '@mui/material';

export const Kudos = memo(
	({
		sum_kudos_from_me,
		kudos = 0,
		addingKudos,
		isDisabled,
		kudosList,
		openList,
		setOpenList,
		openMenu,
		setOpenMenu,
		clickOnKudos,
	}) => {
		const [isPres, setIsPres] = useState(Boolean(sum_kudos_from_me));
		const [isActive, setIsActive] = useState(false);
		const disabled = isDisabled ? styles.disabled : null;
		const [confetti, setConfetti] = useState({ fire: false, reset: false });

		const [count, setCount] = useState(kudos);
		const [totalSposorKudos, setTotalSposorKudos] = useState(sum_kudos_from_me);

		const handelClick = async kudosAmount => {
			setConfetti(prev => ({ ...prev, reset: {} }));
			const data = await addingKudos(kudosAmount);
			if (data.status !== 200) return;

			setIsPres(true);
			setIsActive(true);
			setTimeout(() => {
				setIsActive(false);
				setCount(data.currentKudos);
				setTotalSposorKudos(data.sponsorKudos);
				setConfetti(prev => ({ ...prev, fire: {} }));
			}, 1000);
		};

		return (
			<div>
				<Tooltip
					title={totalSposorKudos && `Your kudos: ${totalSposorKudos}`}
					arrow
				>
					<div
						className={`${styles.background} ${disabled}`}
						onClick={disabled ? null : clickOnKudos}
					>
						<div className={styles.kitty}>
							<NotPresCat
								className={`${styles.cat} ${isPres && styles.isPressed}`}
							/>
							<img
								src={tick}
								className={`${isActive && styles.animation} ${
									isPres && !isActive ? styles.pressedTick : styles.tick
								}`}
								alt='tick'
							/>
						</div>
						<div className={isPres ? styles.isPres : styles.notPres}>
							{formatNumber(count)} KUDOS
						</div>
						<img
							src={paw}
							alt='paw'
							className={`${isActive && styles.animation} ${styles.paw}`}
						/>
						<ReactCanvasConfetti
							startVelocity={15}
							reset={confetti.reset}
							fire={confetti.fire}
							className={styles.confetti}
						/>
					</div>
				</Tooltip>
				<KudosList {...{ kudosList, openList, setOpenList }} />
				<KudosSelect
					open={openMenu}
					addKudos={handelClick}
					close={setOpenMenu}
				/>
			</div>
		);
	},
);
