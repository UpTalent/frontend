import React from 'react';
import { Proof } from './Proof';
import { KudosedProof } from '../../Profile/components/MainInfo/components/KudosHistory/components/KudosedProof';

const proof = {
	id: 1,
	icon_number: 0,
	title: 'Title',
	summary: 'Summary',
    kudos: 0,
    content: 'Hello world',
	published: '2023-06-13T10:47:30.667Z',
	skills: [
		{
			id: 0,
			name: 'JavaScript',
			kudos: 0,
		},
	],
	author: {
		id: 0,
		name: 'AuthorName',
		avatar: 'somepng',
	},
};

const kudosedProof = {
	proof_idd: 0,
	icon_number: 0,
	title: 'Title',
	total_sum_kudos: 0,
	skills: [
		{
			name: 'string',
			kudos: 0,
		},
	],
	author: {
		id: 0,
		name: 'UserName',
		avatar: 'string',
	},
};

export default {
	InPreview: (
		<Proof
			proof={proof}
			withContent={true}
			showControlls={false}
			inForm={true}
		/>
	),
	InSlider: <Proof proof={proof} inSlider={true} />,
	InOwnTalentProfile: (
		<Proof proof={proof} withContent={true} showControlls={true} />
	),
	InOtherTalentProfile: (
		<Proof proof={proof} withContent={true} showControlls={false} />
	),
	InKudosHistory: <KudosedProof proofInfo={kudosedProof} />,

	OnProofsPage: <Proof proof={proof} withContent={false} inForm={true} />,
};
