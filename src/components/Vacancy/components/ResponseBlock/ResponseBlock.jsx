import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getRole } from '../../../../redux/reducers/authentification';
import { ResponseForm } from './ResponseForm';
import { Button } from '@mui/material';
import { DisabledText } from '../../../shared/DisabledText/DisabledText';
import { TalentForm } from './ResponseForm/TalentForm/TalentForm';

export const ResponseBlock = ({ isDisabled }) => {
	const [isOpen, setIsOpen] = useState(false);
	const userRole = useSelector(getRole);

	return (
		<div>
			{!isOpen && (
				<DisabledText condition={isDisabled} helperText={'You don`t have enough skills to apply'}>
					<Button
						variant='contained'
						onClick={() => setIsOpen(true)}
						disabled={isDisabled}
						sx={{ borderRadius: '5px', width: '160px', fontSize: 'large' }}
					>
						Apply
					</Button>
				</DisabledText>
			)}
			{isOpen && <TalentForm setIsOpen={setIsOpen} />}
		</div>
	);
};
