import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOneGame } from '../store/actions/oneGameActions';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export function CardItem({ game }) {
	const { id, thumbnail, title, release_date, genre, developer } = game;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const clickHandler = () => {
		navigate(`/game/${id}`);
		dispatch(fetchOneGame(id));
	};

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} onClick={clickHandler}>
			<Card sx={{ bgcolor: 'primary_second.main', cursor: 'pointer', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' }}>
				<CardMedia component='img' image={thumbnail} alt='thumbnail' title={title} />
				<CardContent>
					<Typography variant='h6'>{title}</Typography>
					<CardContent sx={{ my: 2, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='body2'>
							Release
							<br />
							{release_date}
						</Typography>
						<Button variant='contained'>{genre}</Button>
					</CardContent>
					<Typography>{developer}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}
