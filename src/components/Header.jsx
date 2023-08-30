import { AppBar, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/freetogame-logo.png';

export function Header() {
	return (
		<AppBar position='static' sx={{ display: 'flex', alignItems: 'center', mb: 4, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.8)' }}>
			<Container>
				<Toolbar disableGutters sx={{ display: 'flex', gap: 5 }}>
					<img style={{ height: '50px' }} src={logo} alt='logo' />
					<Link style={{ textDecoration: 'none' }} to=''>
						<Button
							variant='contained'
							sx={{
								bgcolor: '#273028',
								color: '#2b8f38',
								'&:hover': {
									backgroundColor: '#273028',
									boxShadow: 'none'
								}
							}}>
							CATALOG
						</Button>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
