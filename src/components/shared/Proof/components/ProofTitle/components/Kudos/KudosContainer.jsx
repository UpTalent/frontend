import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';

export const KudosContainer = memo(({ is_pressed, kudos, proofId }) => {
	const [kudosList, setKudosList] = useState([]);
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
