import React from 'react';
import styles from './Home.module.css';
import rightside_image from '../../assets/5876834.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getAuthTalentId,
	getIsAuth,
} from '../../redux/reducers/authentification';
import { TalentsSlider } from './components/TalentsSlider';
import { ProofSlider } from './components/ProofSlider/ProofSlider';
import { useModalPathname } from '../../hooks/useModalPathname';
import { Proof } from '../shared/Proof';

export const Home = () => {
	const isTalent = useSelector(getIsAuth);
	const authTalent = useSelector(getAuthTalentId);

	const navigate = useNavigate();
	const modalPathname = useModalPathname();

	const testProof = {
		title: 'HELLO WORLD',
		summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,',
		content: 'sdfhjkekjhfjefgr',
		icon_number: 3,
		published: "2023-04-20T10:52:58.454Z",
		status: 'PUBLISHED',
		kudos: 10,
		is_pressed: false
	}

	return (
		<>
			{/* <div className={styles.container}>
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
						<span></span><span></span><span></span><span></span>
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
			</div> */}
			<Proof proof={testProof} withContent={true} showControlls={true} />
			<Proof proof={testProof} withContent={false} />
			<Proof proof={testProof} withContent={true} showControlls={false} />
			{/* <TalentsSlider />
			<ProofSlider /> */}
		</>
	);
};
