import React from 'react';
import { useState } from 'react';
import { talentsAPI } from '../../api/talentsAPI';
import { TalentsPage } from './TalentsPage';

export const TalentPageContainer = () => {
	let testResponse = {
		content: [
			{
				id: 1,
				lastname: 'Streich',
				firstname: 'Kristofer',
				banner:
					'https://i.pinimg.com/564x/89/c5/2b/89c52ba7fee7f39a0669592d2ffbf795.jpg',
				photo:
					'https://i.pinimg.com/564x/5d/7a/7c/5d7a7c3d2c83914c68bfb548c14cc73a.jpg',
				skills: ['Self-motivated', 'Proactive'],
			},
			{
				id: 2,
				lastname: 'Parisian',
				firstname: 'Maximo',
				photo:
					'https://s3.amazonaws.com/uifaces/faces/twitter/mhaligowski/128.jpg',
				banner: 'http://lorempixel.com/g/1366/768/sports/',
				skills: ['Leadership', 'Technical savvy'],
			},
			{
				id: 3,
				lastname: 'Schmitt',
				firstname: 'Hugh',
				photo:
					'https://s3.amazonaws.com/uifaces/faces/twitter/dcalonaci/128.jpg',
				banner: 'http://lorempixel.com/1280/1024/technics/',
				skills: [
					'Self-motivated',
					'Work under pressure',
					'Technical savvy',
					'Communication',
				],
			},
			{
				id: 4,
				lastname: 'Greenholt',
				firstname: 'Gerry',
				photo:
					'https://s3.amazonaws.com/uifaces/faces/twitter/jerrybai1907/128.jpg',
				banner: 'http://lorempixel.com/1280/1024/sports/',
				skills: ['Confidence', 'Work under pressure', 'Problem solving'],
			},
			{
				id: 5,
				lastname: 'Gibson',
				firstname: 'Jolanda',
				photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/gkaam/128.jpg',
				banner: 'http://lorempixel.com/640/480/food/',
				skills: ['Organisation', 'Confidence', 'Fast learner'],
			},
			{
				id: 6,
				lastname: 'Schumm',
				firstname: 'Roman',
				photo:
					'https://s3.amazonaws.com/uifaces/faces/twitter/aroon_sharma/128.jpg',
				banner: 'http://lorempixel.com/640/200/city/',
				skills: [
					'Organisation',
					'Confidence',
					'Self-motivated',
					'Technical savvy',
					'Fast learner',
				],
			},
			{
				id: 7,
				lastname: 'Ebert',
				firstname: 'Rosio',
				photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/meln1ks/128.jpg',
				banner: 'http://lorempixel.com/1024/768/food/',
				skills: ['Confidence', 'Work under pressure', 'Problem solving'],
			},
			{
				id: 8,
				lastname: 'Tremblay',
				firstname: 'Lino',
				photo: null,
				banner: 'http://lorempixel.com/g/720/348/transport/',
				skills: ['Networking skills', 'Self-motivated', 'Work under pressure'],
			},
			{
				id: 9,
				lastname: 'Lowe',
				firstname: 'Douglas',
				photo:
					'https://s3.amazonaws.com/uifaces/faces/twitter/alessandroribe/128.jpg',
				banner: 'http://lorempixel.com/g/1366/768/cats/',
				skills: ['Leadership', 'Self-motivated'],
			},
		],
		page_number: 0,
		page_size: 9,
		total_pages: 3,
	};
	const [talentsList, setTalents] = useState(testResponse);
	const requestTalent = async page => {
		const { data } = await talentsAPI.getTalents(page);
		setTalents(data);
	};
	return (
		<>
			<TalentsPage
				{...talentsList}
				isTalent={true}
				requestTalent={requestTalent}
			/>
		</>
	);
};
