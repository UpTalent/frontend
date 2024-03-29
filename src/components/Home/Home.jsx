import React from 'react';
import styles from './Home.module.css';
import rightside_image from '../../assets/5876834.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getAuthId,
	getIsAuth,
	getRole,
} from '../../redux/reducers/authentification';
import { TalentsSlider } from './components/TalentsSlider';
import { ProofSlider } from './components/ProofSlider/ProofSlider';
import { useModalPathname } from '../../service/hooks/useModalPathname';

export const Home = () => {
	const isTalent = useSelector(getIsAuth);
	const authTalent = useSelector(getAuthId);
	const authRole = useSelector(getRole);

	const navigate = useNavigate();
	const modalPathname = useModalPathname();

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
									? navigate(`/profile/${authRole}/${authTalent}`)
									: modalPathname('register');
							}}
						>
							Get started
							<span></span>
							<span></span>
							<span></span>
							<span></span>
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
			<TalentsSlider />
			<ProofSlider />
		</>
	);
};
