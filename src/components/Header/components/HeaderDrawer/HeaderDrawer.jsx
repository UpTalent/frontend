import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from '../Navbar/Navbar';
import { AuthButtons } from '../AuthButtons/AuthButtons';
import { Logo } from '../Logo/Logo';

export const HeaderDrawer = ({mobileOpen, setMobileOpen}) => {
	const drawerWidth = 280;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<>
			<Logo />
			<Divider />
			<Navbar />
			<Divider />
			<AuthButtons />
		</>
	);

	return (
		<>
			<IconButton
				color='inherit'
				aria-label='open drawer'
				edge='end'
				onClick={handleDrawerToggle}
				sx={{ mr: 2, display: { sm: 'none' } }}
			>
				<MenuIcon color='primary'/>
			</IconButton>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
};
