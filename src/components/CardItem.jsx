import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOneGame } from '../store/actions/oneGameActions';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export function CardItem({ game }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const clickHandler = () => {
		navigate(`/game/${game.id}`);
		dispatch(fetchOneGame(game.id));
	};

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} onClick={clickHandler}>
			<Card sx={{ bgcolor: 'primary_second.main', cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' }}>
				<CardMedia component='img' image={game.thumbnail} alt='thumbnail' title={game.title} />
				<CardContent>
					<Typography variant='h6'>{game.title}</Typography>
					<CardContent sx={{ my: 2, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='body2'>
							Release
							<br />
							{game.release_date}
						</Typography>
						<Button variant='contained'>{game.genre}</Button>
					</CardContent>
					<Typography>{game.developer}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}
