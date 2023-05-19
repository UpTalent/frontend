import React, { memo, useState } from 'react';
import { Kudos } from './Kudos';
import { kudosAPI } from '../../../../../../../api/kudosAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemMessage } from '../../../../../../../redux/reducers/systemMessages';
import {
	getRole,
	setKudos,
} from '../../../../../../../redux/reducers/authentification';

export const KudosContainer = memo(
	({
		sum_kudos_from_me,
		kudos,
		proofId,
		my_proof,
		talentView,
		skills,
		setLocalSkills,
	}) => {
		const [kudosList, setKudosList] = useState([]);
		const [openList, setOpenList] = useState(false);
		const [openMenu, setOpenMenu] = useState(false);

		const dispatch = useDispatch();
		const isDisabled = useSelector(getRole) !== 'sponsor' && !my_proof;

		const messageForUser = () => {
			dispatch(
				setSystemMessage(
					true,
					'This feature is available only for sponsors',
					'warning',
				),
			);
		};

		//temp
		const updateSkills = newSkills => {
			debugger;
			setLocalSkills(
				skills.map(skill => {
					const foundKudos = newSkills.find(
						el => el.skill_id === skill.id,
					)?.kudos;
					return {
						...skill,
						kudos: foundKudos ? skill.kudos + foundKudos : skill.kudos,
					};
				}),
			);
		};

		const getKudoList = async () => {
			try {
				const { data } = await kudosAPI.getProofsKudos(proofId);
				setKudosList(data);
				setOpenList(true);
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};
		const addingKudos = async kudosedSkills => {
			try {
				setOpenMenu(false);
				const { data, status } = await kudosAPI.addKudos(
					proofId,
					kudosedSkills,
				);
				//temp
				updateSkills(kudosedSkills);

				const currentKudos = !isNaN(talentView)
					? data.current_count_kudos
					: data.current_sum_kudos_by_sponsor;

				dispatch(setKudos(data.current_sponsor_balance));
				return {
					currentKudos,
					status,
					sponsorKudos: data.current_sum_kudos_by_sponsor,
				};
			} catch (error) {
				dispatch(setSystemMessage(true, error.message, 'error'));
			}
		};

		const clickOnKudos = my_proof ? getKudoList : () => setOpenMenu(true);
		return (
			<Kudos
				{...{
					sum_kudos_from_me,
					kudos,
					addingKudos,
					isDisabled,
					kudosList,
					openList,
					setOpenList,
					openMenu,
					setOpenMenu,
					clickOnKudos,
					messageForUser,
					skills,
				}}
			/>
		);
	},
);
