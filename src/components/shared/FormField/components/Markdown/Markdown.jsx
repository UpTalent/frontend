import React from 'react';
import markdown from '../../../../../assets/markdownIcon.png';
import styles from '../../../../LoginForm/Forms.module.css';

export const Markdown = () => {
	return (
		<div className={styles.markdown}>
			<img src={markdown} alt='Markdown supported' />
			<p>Markdown supported</p>
		</div>
	);
};
