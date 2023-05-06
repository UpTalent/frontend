import {
	Badge,
	Button,
	Checkbox,
	FormControlLabel,
	Menu,
	MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../Filter.module.css';
import { useSelector } from 'react-redux';
import { getSkills } from '../../../../../../redux/reducers/skills';
import { useStoreDispatch } from '../../../../../../redux/store';
import { getAllSkills } from '../../../../../../redux/reducers/skills';

export const BySkills = ({ setFilterItems, filterItems }) => {
	const skillList = useSelector(getAllSkills);
	const dispatch = useStoreDispatch();
	const [openMenu, setOpenMenu] = useState(null);

	const handleClick = event => {
		setOpenMenu(event.currentTarget);
	};
	const addSkill = skill => {
		if (!filterItems.includes(skill)) {
			setFilterItems([...filterItems, skill]);
		}
	};
	const handleClose = () => {
		setOpenMenu(null);
	};

	useEffect(() => {
		skillList.length === 0 && dispatch(getSkills());
	}, []);

	return (
		<div className={styles.bySkills}>
			<Badge badgeContent={filterItems.length} color='secondary'>
				<Button
					onClick={handleClick}
					variant='contained'
					sx={{ borderRadius: '5px' }}
				>
					Skills
				</Button>
			</Badge>
			<Menu
				anchorEl={openMenu}
				open={Boolean(openMenu)}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: '300px',
					},
				}}
			>
				{skillList.map((el, i) => (
					<MenuItem key={i} onClick={() => addSkill(el)}>
						<FormControlLabel
							control={<Checkbox checked={filterItems.includes(el)} />}
							label={el.name}
						/>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
