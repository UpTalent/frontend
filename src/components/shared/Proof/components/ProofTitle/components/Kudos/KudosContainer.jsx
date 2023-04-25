import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import {
	getRole,
	getUserKudos,
	setKudos,
} from '../../../../../../../redux/reducers/authentification';

export const KudosContainer = memo(
	({ kudosed_by_me, kudos, proofId, my_proof }) => {
		const [kudosList, setKudosList] = useState([]);
		const [openList, setOpenList] = useState(false);
		const [openMenu, setOpenMenu] = useState(false);

		const kudosState = useSelector(getUserKudos);

		const dispatch = useDispatch();
		const isDisabled = useSelector(getRole) !== 'sponsor' && !my_proof;

		const getKudoList = async () => {
			const { data } = await kudosAPI.getProofsKudos(proofId);
			setKudosList(data);
			setOpenList(true);
		};

		const handleKudosClick = async kudosAmount => {
			try {
				if (my_proof) {
					await getKudoList();
				} else {
					setOpenMenu(false);
					const { data, status } = await kudosAPI.addKudos(
						proofId,
						kudosAmount,
					);
					dispatch(setKudos(kudosState - kudosAmount));
					return { ...data, status };
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
					isDisabled,
					kudosList,
					openList,
					setOpenList,
					openMenu,
					setOpenMenu,
					my_proof,
				}}
			/>
		);
	},
);
