import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import './Slider.css';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { SliderTalent } from '../SliderTalent';

export const Slider = ({ testUsers }) => {
	return (
		<div className='slider'>
			<Swiper
				loop={true}
				navigation={{
					prevEl: '.swiperButtonPrev',
					nextEl: '.swiperButtonNext',
				}}
				// spaceBetween={60}
				slidesPerView={3}
				modules={[Navigation]}
			>
				{testUsers?.map(user => (
					<SwiperSlide key={user.id} style={{display:'flex', justifyContent:'center' }}>
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
				<Button variant='outlined' sx={{backgroundColor:'#fff', width:'150px'}} >View all</Button>
			</Link>
		</div>
	);
};
