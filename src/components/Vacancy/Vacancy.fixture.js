import React from 'react';
import { VacancyPage } from './VacancyPage';

const vacancy = {
	id: 0,
	title: 'Required designer for new social media',
	content: `Required skills
    Experience working remotely
    Work experience in a food company
    Experience working independently
    A person who takes pride in his work. Both the technical and product aspects
    Written English
    Technical requirements
    3+ years of commercial experience in front-end development and JavaScript
    2+ years of experience with React, Vue.js or Svelte
    Experience with Svelte 3 is a big bonus
    Excellent knowledge of JavaScript, including ES2020+
    Knowledge of TypeScript is preferred
    Knowledge of HTML5 / CSS 3 / PostCSS including Flexbox and CSS Grid Layout
    Animations, cross-browser compatibility, and responsiveness (Canvas, SVG)
    Event tracking analytics
    Experience with WebSockets
    Duties
    You will initially be tasked with expanding our webapp (Svelte) with new UI features, sophisticated charts, smart tables, and more. Once you are familiar with the product, you will be able to perform more complex tasks on the server (Node.js)
    About the project
    Entriwise is SaaS software for Amazon, Walmart, eBay, Shopify merchants who use NetSuite and QuickBooks for accounting and inventory management.`,
	published: '2023-06-14T16:20:02.344Z',
	status: 'DRAFT',
	skills: [
		{
			name: 'Java',
		},
		{
			name: 'React',
		},
		{
			name: 'SQL',
		},
	],
    author: {
        id: 0,
        avatar: 'https://i.pinimg.com/564x/7b/1d/27/7b1d270564a7c404f2dff9fa796e9280.jpg',
        name: 'Mega sponsor 228'
    }
};

export default {
	VacancyPage: <VacancyPage vacancy={vacancy} />,
};
