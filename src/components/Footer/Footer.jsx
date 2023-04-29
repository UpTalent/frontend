import React from 'react';
import styles from './Footer.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
import logo from '../../assets/upTalent.png';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h2 className={styles.footer__header}>CONTACTS</h2>
			<div className={styles.bigflex}>
				<div className={`${styles.smallflex} ${styles.info}`}>
					<div>
						<img src={logo} alt='logo' />
						<p>UPTALENT</p>
					</div>
					<div>
						<Link to='' className={styles.smallflex__item}>
							<LinkedInIcon />
						</Link>
						<Link to='' className={styles.smallflex__item}>
							<FacebookIcon />
						</Link>
						<Link to='' className={styles.smallflex__item}>
							<TwitterIcon />
						</Link>
					</div>
				</div>

				<div className={`${styles.smallflex} ${styles.names}`}>
					<h3>FRONTEND</h3>
					<p>Anastasiia Bahinska</p>
					<p>Iryna Bibik</p>
					<p>Artem Burakov</p>
					<p>Glieb Lytvynenko</p>
				</div>

				<div className={`${styles.smallflex} ${styles.names}`}>
					<h3>BACKEND</h3>
					<p>Dmytro Teliukov</p>
					<p>Mark Himonov</p>
					<p>Vadym Pratsybuda</p>
					<p>Andrii Cherkasov</p>
				</div>
				<div className={`${styles.smallflex} ${styles.names}`}>
					<h3>QA</h3>
					<p>Artem Shulak</p>
					<p>Myroslav Shashkin</p>
					<p>Liliia Bozhenko</p>
					<p>Anton Romanenko</p>
					<p>Anton Masalov</p>
				</div>

				<div className={styles.smallflex}>
					<Link
						to='https://www.softserveinc.com/uk-ua'
						target='blank'
						className={styles.smallflex__item}
					>
						© Copyright 2023 SoftServe
					</Link>
				</div>
			</div>
		</footer>
	);
};
