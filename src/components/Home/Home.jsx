import React from 'react';
import { Slider } from '../shared/Slider';

const testUsers = [
	{
		id: 1,
		skills: ['Dancing', 'Dancing', 'Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 2,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 3,
		skills: ['Dancing', 'Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 4,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 5,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 6,
		skills: ['Dancing', 'Dancing', 'Dancing', 'Dancing', 'Dancing', 'Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 7,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 8,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
	{
		id: 9,
		skills: ['Dancing'],
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
	},
];

export const Home = () => {
	return <Slider testUsers={testUsers} />;
};
