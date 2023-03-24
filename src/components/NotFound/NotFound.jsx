import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import notFoundImage from '../../assets/notFoundImage.svg';

export const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<img src={notFoundImage} alt="notFoundImage" />
			</div>
			<div className={styles.infoBlock}>
				<h1>404</h1>
				<p>
					We're sorry. the page you requested could no be found <br />
					Please go back to the home page
				</p>
				<Button
					component={Link}
					to={'/'}
					color="dark"
					variant="contained"
					sx={{ width: '150px', fontSize: 'large' }}
				>
					Go home
				</Button>
			</div>
		</div>
	);
};
