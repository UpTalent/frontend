import React from 'react';
import cl from './Footer.module.css'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
export const Footer = () => {
	return (
		<footer className={cl.footer}>
			<h2 className={cl.footer__header}>CONTACTS</h2>
        
        <div className={cl.footer__wraper}>
			<div className={`${cl.footer__bigflex} ${cl.bigflex}`}>
		
				<div className={`${cl.bigflex__smallflex} ${cl.smallflex}`}>
					<Link to="https://www.softserveinc.com/uk-ua" target="blank" className={cl.smallflex__item}>© Copyright 2023 SoftServe</Link>
				</div>
				
				<div className={`${cl.bigflex__smallflex} ${cl.smallflex}`}>
					<Link to="" className={cl.smallflex__item}>LVIV HQ</Link>
					<Link to="" className={cl.smallflex__item}>2D Sadova StreetLviv 79021</Link>
					<Link to="" className={cl.smallflex__item}>+380-32-240-9999</Link>
					<Link to="" className={cl.smallflex__item}>uptalentinfo@gmail.com</Link>
				</div>
				
				<div className={`${cl.bigflex__smallflex} ${cl.smallflex}`}> 
					<Link to="" className={cl.smallflex__item}>USA HQ – AUSTIN</Link>
					<Link to="" className={cl.smallflex__item}>201 W 5th StreetSuite 1550Austin, TX 78701</Link>
					<Link to="" className={cl.smallflex__item}>+1-512-516-8880</Link>
					<Link to="" className={cl.smallflex__item}>someemail@gmail.com</Link>
				</div>
				
				<div className={`${cl.bigflex__smallflex} ${cl.smallflex}`}>
					<Link to="" className={cl.smallflex__item}><LinkedInIcon/></Link>
					<Link to="" className={cl.smallflex__item}><FacebookIcon/></Link>
					<Link to="" className={cl.smallflex__item}><TwitterIcon/></Link>
				</div>
			
			</div>
    	</div>
		</footer>
	);
};
