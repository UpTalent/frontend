import React, { useCallback, useState } from 'react';
import styles from './Kudo.module.css';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import { useDispatch } from 'react-redux';
import { ReactComponent as NotPresCat } from '../../../../../../../assets/notPressedCat.svg';
import tick from '../../../../../../../assets/tick.svg';
import paw from '../../../../../../../assets/paw.png';
import ReactCanvasConfetti from 'react-canvas-confetti';

export const Kudos = ({ is_pressed, amount }) => {
	const [isPres, setIsPres] = useState(is_pressed);
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const formatNumber = formatter.format(amount);

	const [count, setCount] = useState(formatNumber);

	let confettiInstance;

	const getInstance = useCallback(
		instance => {
			confettiInstance = instance;
		},
		[confettiInstance],
	);

	const handelClick = () => {
		if (!isPres) {
			const newCount = formatter.format(amount + 1);
			setCount(newCount);
			setIsPres(true);
			setIsActive(true);
		} else {
			dispatch(setSystemMessage(true, 'Your already put kudos', 'error'));
		}
		setTimeout(() => {
			setIsActive(false);
			confettiInstance({
				startVelocity: 15,
			});
		}, 1000);
	};

	return (
		<div className={styles.background} onClick={handelClick}>
			<div className={styles.kitty}>
				<NotPresCat className={`${styles.cat} ${isPres && styles.isPressed}`} />
				<img
					src={tick}
					className={`${isActive && styles.animation} ${
						isPres && !isActive ? styles.pressedTick : styles.tick
					}`}
					alt='tick'
				/>
			</div>
			<div className={isPres ? styles.isPres : styles.notPres}>
				{count} KUDO
			</div>
			<img
				src={paw}
				alt='paw'
				className={`${isActive && styles.animation} ${styles.paw}`}
			/>
			<ReactCanvasConfetti
				refConfetti={getInstance}
				className={styles.confetti}
			/>
		</div>
	);
};
