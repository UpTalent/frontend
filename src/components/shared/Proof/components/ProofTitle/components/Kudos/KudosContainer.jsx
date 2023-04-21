import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import { getIsAuth } from '../../../../../../../redux/reducers/authentification';

export const KudosContainer = memo(({ kudosed_by_me, kudos, proofId }) => {
	const [kudosList, setKudosList] = useState([]);
	const dispatch = useDispatch();
	const isAuth = useSelector(getIsAuth);

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
		<Kudos
			{...{
				kudosed_by_me,
				kudos,
				getKudoList,
				addKudos,
				isAuth,
				kudosList,
			}}
		/>
	);
});
