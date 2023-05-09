import React, { useState } from 'react';
import styles from './NothingToDisplay.module.css';
import cat from '../../../assets/notFoundCat.svg';

export const NothingToDisplay = ({ searchData }) => {
	const [filteredData] = useState(searchData)
	const viewSearch = filteredData?.map(el => el.name).join(', ');
	return (
		<div className={styles.NothingToDisplay}>
            <img src={cat} alt={cat} />
			<p className={styles.text}>
				No results matching <b>{viewSearch}</b>
			</p>
		</div>
	);
};
