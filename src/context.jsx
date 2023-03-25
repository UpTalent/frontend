import React, { createContext, useState } from 'react';
import App from './App';

export const Context = createContext();

export const ContextHOC = () => {
	const testUser = {
		id: 1,
		banner: null,
		photo: null,
		firstName: 'Alice',
		lastname: 'Smith',
		email: 'alice.smith@gmail.com',
		skills: ['Java', 'JS', 'Time management'],
		birthday: '1997-10-31',
		location: 'Ukraine, Kharkiv',
		aboutMe:
			'Highly-motivated Java Developer, with one year of experience practicing and learning Java, and connected technologies seeking a full-time position where I can apply my skills. I have an economic academic education and business processing background and some experience with it. All my experience will be useful in teamwork in software development. I often worked in a team, as a friendly, inquisitive but result-target person. That last thing helps me to deep learn English up to the Intermediate level, Java Core, Java 8, MySQL, JDBC, Hibernate, and Spring and take real pleasure from it, and I am inquisitive I can feel it in my future job.',
		password: 'somePassword12343',
	};

	const [isTalent, setIsTalent] = useState(false);
	const [isTalentProfile, setIsTalentProfile] = useState(false);
	const [talent, setTalent] = useState(testUser);
	const [talentList, setTalentList] = useState([]);

	const state = {
		isTalent,
		setIsTalent,
		isTalentProfile,
		setIsTalentProfile,
		talent,
		setTalent,
		talentList,
		setTalentList,
	};

	return (
		<Context.Provider value={state}>
			<App />
		</Context.Provider>
	);
};
