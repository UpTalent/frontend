import React from 'react';
import styles from './Home.module.css';
import rightside_image from '../../assets/5876834.jpg';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { PopUpMessage } from '../shared/PopUpMessage/PopUpMessage';
import { useSelector } from 'react-redux';
import {
	getAuthTalentId,
	getIsAuth,
} from '../../redux/reducers/authentification';
import { TalentsSlider } from './components/TalentsSlider';
import { ProofSlider } from './components/ProofSlider/ProofSlider';

export const Home = () => {
	const isTalent = useSelector(getIsAuth);
	const authTalent = useSelector(getAuthTalentId);
	const systemMessage = useSelector(state => state.systemMessage.messageText);

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
									? navigate(`/talent/${authTalent}`)
									: modalPathname('register');
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
			<PopUpMessage message={systemMessage} status='success' />

			<TalentsSlider />
			<ProofSlider />
		</>
	);
};
