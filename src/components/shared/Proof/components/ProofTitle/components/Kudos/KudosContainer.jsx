import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';

export const KudosContainer = memo(({ kudosed_by_me, kudos, proofId }) => {
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
		await kudosAPI.addKudos(proofId);
	};

	return (
		<Kudos {...{ kudosed_by_me, kudos, getKudoList, addKudos, kudosList }} />
	);
});
