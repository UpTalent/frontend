import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Navigation } from 'swiper';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Swiper } from 'swiper/react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './Slider.css';

export const Slider = ({ sliderElements, viewAll, isLoading, item }) => {
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
							prevEl: `.prev${item}`,
							nextEl: `.next${item}`,
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
						{sliderElements}
					</Swiper>
					<div className={`swiperButton swiperButtonPrev prev${item}`}>
						<ArrowBack fontSize='large' />
					</div>
					<div className={`swiperButton swiperButtonNext next${item}`}>
						<ArrowForward fontSize='large' />
					</div>
					<Link to={`/${viewAll}`}>
						<Button
							variant='outlined'
							sx={{ backgroundColor: '#fff', fontSize: '20px', width: '200px' }}
						>
							View all
						</Button>
					</Link>
				</>
			)}
		</div>
	);
};
