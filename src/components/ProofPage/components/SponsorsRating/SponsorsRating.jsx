import React from 'react';
import { talentsAPI } from '../../../../api/talentsAPI';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';
import { useEffect } from 'react';
import { SponsorItem } from './SponsorItem';
import styles from '../../ProofPage.module.css';
import sadCat from '../../../../assets/sadcat.png';

export const SponsorsRating = () => {
	const [sponsorList, setSponsorList] = useState(null);
	const dispatch = useDispatch();

	const getSponsorList = async () => {
		try {
			const { data } = await talentsAPI.getTopSponsors();
			setSponsorList(data);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};
	const sponsorItems = sponsorList?.map((el, i) => (
		<SponsorItem
			{...el}
			key={i}
			style={{ animationDelay: `${((i * 2) / 10).toFixed(2)}s` }}
		/>
	));

	useEffect(() => {
		getSponsorList();
	}, []);

	return (
		<div className={styles.sponsorBox}>
			<h2>YOUR TOP SPONSORS:</h2>
			{sponsorItems?.length ? (
				sponsorItems
			) : (
				<div className={styles.emptyList}>
					<img src={sadCat} alt="Kitty" />
					<p>Will be here in future...hopefully</p>
				</div>
			)}
		</div>
	);
};
