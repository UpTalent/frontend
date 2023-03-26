import React from 'react';
import styles from './Home.module.css'
import rightside_image from '../../assets/5876834.jpg'
import { Button } from '@mui/material';

export const Home = () => {
	return (
		<>
		<div className={styles.container}>
			<div className={styles.water}>
				<div className={styles.water__leftside}>
					<h1 className={styles.water__header}>Develop anything your business needs.</h1>
					<p className={styles.water__paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
					<Button className={styles.getstarted} variant="contained">Get started</Button>
				</div>

				<div className={styles.water__rightside}>
					<img src={rightside_image } alt="Water image" className={styles.rightside__image} />
				</div>
			</div>
		</div>
		</>
	);
};
