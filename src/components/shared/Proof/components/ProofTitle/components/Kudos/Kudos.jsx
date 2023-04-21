import React, { memo, useCallback, useMemo, useState } from 'react';
import styles from './Kudo.module.css';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import { useDispatch } from 'react-redux';
import { ReactComponent as NotPresCat } from '../../../../../../../assets/notPressedCat.svg';
import tick from '../../../../../../../assets/tick.svg';
import paw from '../../../../../../../assets/paw.png';
import ReactCanvasConfetti from 'react-canvas-confetti';

export const Kudos = memo(
	({ kudosed_by_me, kudos = 0, getKudoList, addKudos, isAuth }) => {
		const [isPres, setIsPres] = useState(kudosed_by_me);
		const disabled = isPres || !isAuth ? styles.disabled : null;
		const [isActive, setIsActive] = useState(false);
		const dispatch = useDispatch();

		const formatter = Intl.NumberFormat('en', { notation: 'compact' });
		const formatNumber = formatter.format(kudos);

		const [count, setCount] = useState(formatNumber);

		let confettiInstance;

		const getInstance = useCallback(instance => {
			confettiInstance = instance;
		}, []);

		const instance = useMemo(() => getInstance, []);

		const handelClick = async () => {
			try {
				await addKudos();
				setIsPres(true);
				setIsActive(true);
				setTimeout(() => {
					setIsActive(false);
					const newCount = formatter.format(kudos + 1);
					setCount(newCount);
					confettiInstance({
						startVelocity: 15,
					});
				}, 1000);
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};

		return (
			<div
				className={`${styles.background} ${disabled}`}
				onClick={disabled ? null : handelClick}
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
					{count} KUDO
				</div>
				<img
					src={paw}
					alt='paw'
					className={`${isActive && styles.animation} ${styles.paw}`}
				/>
				<ReactCanvasConfetti
					refConfetti={instance}
					className={styles.confetti}
				/>
			</div>
		);
	},
);
