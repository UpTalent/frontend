import React, { useEffect, useState } from 'react';
import { Slider } from '../../../shared/Slider/Slider';
import { Proof } from '../../../shared/Proof';
import { proofAPI } from '../../../../api/proofAPI';
import { SwiperSlide } from 'swiper/react';
import styles from './ProofSlider.module.css';

export const ProofSlider = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [sliderProofList, setSliderProofList] = useState([]);

	const getSliderProofs = async () => {
		const { data } = await proofAPI.getAllProofs();
		setSliderProofList(data.content);
		setIsLoading(false);
	};

	const sliderElements = sliderProofList?.map(proof => (
		<SwiperSlide
			key={proof.id}
			style={{ display: 'flex', justifyContent: 'center' }}
		>
			<Proof proof={proof} withContent={false} className={styles.sliderProof} />
		</SwiperSlide>
	));

	useEffect(() => {
		getSliderProofs();
	}, []);

	return (
		<Slider
			viewAll={'proofs'}
			sliderElements={sliderElements}
			isLoading={isLoading}
			item={'proof'}
		/>
	);
};
