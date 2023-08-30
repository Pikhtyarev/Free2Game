import { ArrowBack } from '@mui/icons-material';
import { Grid, ImageList, ImageListItem, Typography, Button, LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOneGame } from '../store/actions/oneGameActions';

export function GamePage() {
	const { error, loading, game } = useSelector((state) => state.game);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOneGame(id));
	}, [dispatch, id]);

	function msr() {
		const gameMsr = game?.minimum_system_requirements;

		if (!game?.minimum_system_requirements) {
			return <Grid item></Grid>;
		} else {
			return (
				<Grid item sx={{ ...styleForGridItem, mb: 1, maxWidth: '100%' }}>
					<Typography variant='button'>Minimum system requirements:</Typography>
					<hr />
					<Typography variant='subtitle1'>Operation system: {gameMsr?.os}</Typography>
					<Typography variant='subtitle1'>Processor: {gameMsr?.processor}</Typography>
					<Typography variant='subtitle1'>Memory: {gameMsr?.memory}</Typography>
					<Typography variant='subtitle1'>Graphics: {gameMsr?.graphics}</Typography>
					<Typography variant='subtitle1'>Storage: {gameMsr?.storage}</Typography>
				</Grid>
			);
		}
	}

	// MUI
	const styleForGridItem = {
		padding: 1,
		width: 'max-content',
		borderRadius: '5px',
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
		bgcolor: 'primary_second.main'
	};

	return (
		<Grid container spacing={4}>
			{loading && <LinearProgress sx={{ height: '20px', borderRadius: '5px' }} />}
			{error && <Typography sx={{ fontSize: '2rem' }}>{error}</Typography>}

			<Grid item xs={12} md={6}>
				<Grid item sx={{ position: 'sticky', top: '30px', display: 'flex', flexDirection: 'column' }}>
					<Link to='/'>
						<Button variant='contained' sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)' }}>
							<ArrowBack />
							Catalog
						</Button>
					</Link>
					<img style={{ width: '100%', borderRadius: '5px', boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)', marginTop: '30px' }} src={game?.thumbnail} alt='thumbnail' />
				</Grid>
			</Grid>

			<Grid item xs={12} md={6}>
				<Grid item sx={{ ...styleForGridItem, mb: 4 }}>
					<Typography variant='h4'>{game?.title}</Typography>
				</Grid>
				<Grid item sx={{ ...styleForGridItem, mb: 1 }}>
					<Typography variant='subtitle1'>Release Date: {game?.release_date}</Typography>
				</Grid>
				<Grid item sx={{ ...styleForGridItem, mb: 1 }}>
					<Typography variant='subtitle1'>Publisher: {game?.publisher}</Typography>
				</Grid>
				<Grid item sx={{ ...styleForGridItem, mb: 1 }}>
					<Typography variant='subtitle1'>Developer: {game?.developer}</Typography>
				</Grid>
				<Grid item sx={{ ...styleForGridItem, mb: 1 }}>
					<Typography variant='subtitle1'>Genre: {game?.genre}</Typography>
				</Grid>

				{msr()}

				<ImageList
					sx={{
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
						boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',
						borderRadius: '5px 5px 0px 0px',
						overflowX: 'auto',
						'&::-webkit-scrollbar': {
							width: '10px'
						},
						'&::-webkit-scrollbar-thumb': {
							bgcolor: 'primary_second.main',
							borderRadius: '0px 0px 5px 5px'
						},
						'&::-webkit-scrollbar-track': {
							background: 'transparent',
							borderRadius: '0px 0px 5px 5px'
						}
					}}
					cols={game?.screenshots?.length}
					rowHeight='auto'>
					{game && game.screenshots ? (
						game.screenshots.map((s) => (
							<ImageListItem key={s.id} sx={{ minWidth: 375 }}>
								<img style={{ borderRadius: '5px 5px 0px 0px' }} src={s.image} alt={`Screenshot ${s.id}`} loading='lazy' />
							</ImageListItem>
						))
					) : (
						<ImageListItem></ImageListItem>
					)}
				</ImageList>
			</Grid>
		</Grid>
	);
}
