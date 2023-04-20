import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';

export const KudosContainer = memo(({ is_pressed, kudos, proofId }) => {
	const [kudosList, setKudosList] = useState(testKudosList);
	const dispatch = useDispatch();

	const getKudoList = async () => {
		try {
			const { data } = await kudosAPI.getProofsKudos(proofId);
			setKudosList(data);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	const addKudos = async () => {
		try {
			await kudosAPI.addKudos(proofId);
		} catch (error) {
			dispatch(setSystemMessage(true, error.message, 'error'));
		}
	};

	return <Kudos {...{ is_pressed, kudos, getKudoList, addKudos, kudosList }} />;
});

const testKudosList = [
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Firstname',
		kudos: 1,
		sent: '2013-08-24T14:15:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2023-05-15T14:15:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2022-04-08T14:13:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2023-08-24T14:14:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2019-09-24T14:16:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2016-08-24T14:17:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2015-08-24T14:17:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2019-08-04T14:17:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2020-08-24T14:17:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2019-07-24T14:17:22Z',
	},
	{
		photo: null,
		firstname: 'Firstname',
		lastname: 'Lastname',
		kudos: 1,
		sent: '2019-06-24T14:17:22Z',
	},
];
