import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Navigation } from 'swiper';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './Slider.css';
import { SliderTalent } from '../SliderTalent';
import { talentsAPI } from '../../../api/talentsAPI';

export const Slider = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [sliderTalentsList, setSliderTalentsList] = useState([]);

	const getSliderTalents = async () => {
		setIsLoading(true);
		const { data } = await talentsAPI.getTalents();
		setSliderTalentsList(data.content);
		setIsLoading(false);
	};

	useEffect(() => {
		getSliderTalents();
	}, []);

	return (
		<div className='slider'>
			{isLoading ? (
				<div className='loaderContainer'>
					<CircularProgress />
				</div>
			) : (
				<>
					<Swiper
						loop={true}
						navigation={{
							prevEl: '.swiperButtonPrev',
							nextEl: '.swiperButtonNext',
						}}
						slidesPerView={3}
						modules={[Navigation]}
						breakpoints={{
							0: {
								slidesPerView: 1,
							},
							1016: {
								slidesPerView: 2,
							},
							1400: {
								slidesPerView: 3,
							},
						}}
					>
						{sliderTalentsList?.map(user => (
							<SwiperSlide
								key={user.id}
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<SliderTalent talent={user} />
							</SwiperSlide>
						))}
					</Swiper>
					<div className='swiperButton swiperButtonPrev'>
						<ArrowBack fontSize='large' />
					</div>
					<div className='swiperButton swiperButtonNext'>
						<ArrowForward fontSize='large' />
					</div>
					<Link to='/talents'>
						<Button
							variant='outlined'
							sx={{ backgroundColor: '#fff', fontSize: '30px', width: '300px' }}
						>
							View all
						</Button>
					</Link>
				</>
			)}
		</div>
	);
};
