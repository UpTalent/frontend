import React from 'react';
import { GeneralTalent } from './components/GeneralTalent';

const testUsers = [
	{
		id: 1,
		skills: ['dancing', 'programming'],
		banner:
			'https://i.pinimg.com/564x/89/c5/2b/89c52ba7fee7f39a0669592d2ffbf795.jpg',
		photo:
			'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
		lastname: 'Lake',
		firstname: 'Shaky',
	},
	{
		id: 2,
		skills: ['dancing', 'programming', 'JAVA', 'enough'],
		banner: null,
		photo: null,
		lastname: 'Lake',
		firstname: 'Shaky',
	},

];

const Home = () => {
	return (
		<>
			{testUsers.map(user => (
				<GeneralTalent talent={user} key={user.id} isTalent={true} />
			))}
		</>
	);
};

export default Home;
