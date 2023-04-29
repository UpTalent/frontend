import React from 'react';
import { talentsAPI } from '../../../../api/talentsAPI';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../redux/reducers/systemMessages';
import { useEffect } from 'react';
import { SponsorItem } from './SponsorItem';
import styles from '../../ProofPage.module.css';

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
		<SponsorItem {...el} key={i} style={{ animationDelay: `.${i*3}s` }} />
	));

	useEffect(() => {
		getSponsorList();
	}, []);

	return (
		<div className={styles.sponsorBox}>
			<h2>YOUR TOP SPONSORS:</h2>
			{sponsorItems}
		</div>
	);
};
