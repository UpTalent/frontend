import React, { useContext } from 'react';
import { Slider } from '../shared/Slider';
import styles from './Home.module.css';
import rightside_image from '../../assets/5876834.jpg';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import { PopUpMessage } from '../shared/PopUpMessage/PopUpMessage';

export const Home = () => {
	const { isTalent, authTalent } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	const modalPathname = path => {
		navigate(`${location.pathname}/${path}`, {
			state: { from: location.pathname },
		});
	};
	return (
		<>
			<div className={styles.container}>
				<div className={styles.water}>
					<div className={styles.waterLeftside}>
						<h1 className={styles.waterHeader}>
							Develop your rising talent with us!
						</h1>
						<p className={styles.waterParagraph}>
							On this platform, talents would be able to create profiles
							showcasing their professional experience, education, and skills.
							They could also connect with other professionals in their
							industry, join groups.
						</p>
						<Button
							className={styles.getstarted}
							variant='contained'
							onClick={() => {
								isTalent
									? navigate(`/talent/${authTalent.talent_id}`)
									: modalPathname('registrate');
							}}
						>
							Get started
						</Button>
					</div>

					<div className={styles.waterRightside}>
						<img
							src={rightside_image}
							alt='Water'
							className={styles.rightsideImage}
						/>
					</div>
				</div>
			</div>
			<PopUpMessage message='Your profile was deleted' status='success' />
			<Slider />
		</>
	);
};
