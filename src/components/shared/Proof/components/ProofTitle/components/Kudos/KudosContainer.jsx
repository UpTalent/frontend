import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import { getIsAuth } from '../../../../../../../redux/reducers/authentification';

export const KudosContainer = memo(
	({ kudosed_by_me, kudos, proofId, inForm = false, my_proof }) => {
		const [kudosList, setKudosList] = useState([]);
		const [openList, setOpenList] = useState(false);

		const dispatch = useDispatch();
		const isDisabled = useSelector(get) && !inForm;

		const getKudoList = async () => {
			const { data } = await kudosAPI.getProofsKudos(proofId);
			setKudosList(data);
			setOpenList(true);
		};

		const handleKudosClick = async () => {
			console.log(my_proof);
			try {
				if (my_proof) {
					await getKudoList();
				} else {
					const { status } = await kudosAPI.addKudos(proofId);
					return status;
				}
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};

		return (
			<Kudos
				{...{
					kudosed_by_me,
					kudos,
					handleKudosClick,
					isAuth,
					kudosList,
					openList,
					setOpenList,
				}}
			/>
		);
	},
);
