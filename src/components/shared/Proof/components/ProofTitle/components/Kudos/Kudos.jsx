import React, { memo, useState } from 'react';
import styles from './Kudo.module.css';
import { ReactComponent as NotPresCat } from '../../../../../../../assets/notPressedCat.svg';
import tick from '../../../../../../../assets/tick.svg';
import paw from '../../../../../../../assets/paw.png';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { KudosList } from './components/KudosList';
import { useFormat } from '../../../../../../../hooks/useFormat';
import { KudosSelect } from './components/KudosSelect/KudosSelect';

export const Kudos = memo(
	({
		kudosed_by_me,
		kudos = 0,
		handleKudosClick,
		isDisabled,
		kudosList,
		openList,
		setOpenList,
	}) => {
		const [isPres, setIsPres] = useState(kudosed_by_me);
		const [isActive, setIsActive] = useState(false);
    
		const [openMenu, setOpenMenu] = useState(false);
		const disabled = isDisabled ? styles.disabled : null;
		const [confetti, setConfetti] = useState({ fire: false, reset: false });

		const [count, setCount, currentKudos] = useFormat(kudos);

		const handelClick = async kudosAmount => {
			setConfetti(prev => ({ ...prev, reset: {} }));
			setOpenMenu(false);
			const status = await handleKudosClick(kudosAmount);
			if (status !== 204) return;

			setIsPres(true);
			setIsActive(true);
			setTimeout(() => {
				setIsActive(false);
				setCount(currentKudos + kudosAmount);
				setConfetti(prev => ({ ...prev, fire: {} }));
			}, 1000);
		};

		return (
			<div>
				<div
					className={`${styles.background} ${disabled}`}
					onClick={disabled ? null : () => setOpenMenu(true)}
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
						{count} KUDOS
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
