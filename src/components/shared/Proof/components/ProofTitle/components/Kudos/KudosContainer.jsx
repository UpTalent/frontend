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
			try {
				const { data } = await kudosAPI.getProofsKudos(proofId);
				setKudosList(data);
				setOpenList(true);
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};
		const addingKudos = async kudosAmount => {
			try {
				setOpenMenu(false);
				const { data, status } = await kudosAPI.addKudos(proofId, kudosAmount);
				dispatch(setKudos(kudosState - kudosAmount));
				return { ...data, status };
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};

		const clickOnKudos = my_proof ? getKudoList : () => setOpenMenu(true);
		return (
			<Kudos
				{...{
					kudosed_by_me,
					kudos,
					addingKudos,
					isDisabled,
					kudosList,
					openList,
					setOpenList,
					openMenu,
					setOpenMenu,
					clickOnKudos,
				}}
			/>
		);
	},
);
