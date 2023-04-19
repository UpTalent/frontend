import React, {useState } from 'react';
import styles from './Kudo.module.css';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import { useDispatch } from 'react-redux';
import presCat from '../../../../../../../assets/presCat.svg';
import notPresCat from '../../../../../../../assets/notPressedCat.svg';

export const Kudos = ({ is_pressed, amount }) => {
	const [count, setCount] = useState(amount);
	const [isPres, setIsPres] = useState(is_pressed);
	const dispatch = useDispatch();

	const handelClick = () => {
		console.log('I work');
		if (!isPres) {
			setCount(prev => prev + 1);
			setIsPres(true);
		} else {
			dispatch(setSystemMessage(true, 'Your already put kudos', 'error'));
		}
	};

	return (
		<div className={styles.background} onClick={handelClick}>
			{isPres ? (
				<>
					<img src={presCat} className={styles.presCat} alt='Cat' />
					<div className={styles.isPres}>{count} KUDO</div>
				</>
			) : (
				<>
					<img src={notPresCat} alt='notPresCat' />
					<div className={styles.notPres}>{count} KUDO</div>
				</>
			)}
		</div>
	);
};
