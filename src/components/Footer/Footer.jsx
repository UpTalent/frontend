import React from 'react';
import styles from './Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h2 className={styles.footer__header}>CONTACTS</h2>
        
        <div className={styles.footer__wraper}>
			<div className={`${styles.footer__bigflex} ${styles.bigflex}`}>
		
				<div className={`${styles.bigflex__smallflex} ${styles.smallflex}`}>
					<Link to="https://www.softserveinc.com/uk-ua" target="blank" className={styles.smallflex__item}>© Copyright 2023 SoftServe</Link>
				</div>
				
				<div className={`${styles.bigflex__smallflex} ${styles.smallflex}`}>
					<Link to="" className={styles.smallflex__item}>LVIV HQ</Link>
					<Link to="" className={styles.smallflex__item}>2D Sadova StreetLviv 79021</Link>
					<Link to="" className={styles.smallflex__item}>+380-32-240-9999</Link>
					<Link to="" className={styles.smallflex__item}>uptalentinfo@gmail.com</Link>
				</div>
				
				<div className={`${styles.bigflex__smallflex} ${styles.smallflex}`}> 
					<Link to="" className={styles.smallflex__item}>USA HQ – AUSTIN</Link>
					<Link to="" className={styles.smallflex__item}>201 W 5th StreetSuite 1550Austin, TX 78701</Link>
					<Link to="" className={styles.smallflex__item}>+1-512-516-8880</Link>
					<Link to="" className={styles.smallflex__item}>someemail@gmail.com</Link>
				</div>
				
				<div className={`${styles.bigflex__smallflex} ${styles.smallflex}`}>
					<Link to="" className={styles.smallflex__item}><LinkedInIcon/></Link>
					<Link to="" className={styles.smallflex__item}><FacebookIcon/></Link>
					<Link to="" className={styles.smallflex__item}><TwitterIcon/></Link>
				</div>
			
			</div>
    	</div>
		</footer>
	);
};
