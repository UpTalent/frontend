import React, { useEffect, useState } from 'react';
import { talentsAPI } from '../../../../api/talentsAPI';
import { SwiperSlide } from 'swiper/react';
import { SliderTalent } from '../../../shared/Slider/SliderTalent';
import { Slider } from '../../../shared/Slider/Slider';

export const TalentsSlider = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [sliderTalentsList, setSliderTalentsList] = useState([]);

	const getSliderTalents = async () => {
		const { data } = await talentsAPI.getTalents();
		setSliderTalentsList(data.content);
		setIsLoading(false);
	};

	const sliderElements = sliderTalentsList?.map(user => (
		<SwiperSlide
			key={user.id}
			style={{ display: 'flex', justifyContent: 'center' }}
		>
			<SliderTalent talent={user} />
		</SwiperSlide>
	));

	useEffect(() => {
		getSliderTalents();
	}, []);
    
	return <Slider sliderElements={sliderElements} viewAll={'talents'} isLoading={isLoading} item={'talent'}/>;
};
