import React, { useEffect, useState } from 'react';
import { Filter } from '../components/Filter';
import { CardItem } from '../components/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/actions/gamesActions';
import { Box, Grid, LinearProgress, Pagination, Typography } from '@mui/material';
import { cancelPreviousRequests } from '../store/slices/cancelRequestsSlice';

export function MainPage() {
	const dispatch = useDispatch();
	const { error, loading, games } = useSelector((state) => state.game);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 24;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedGames = games.slice(startIndex, endIndex);

	useEffect(() => {
		dispatch(cancelPreviousRequests());
		dispatch(fetchGames());
	}, [dispatch]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<Filter />
			{loading && <LinearProgress sx={{ height: '20px', borderRadius: '5px' }} />}
			{error && <Typography sx={{ fontSize: '2rem' }}>{error}</Typography>}

			<Grid container spacing={4} sx={{ mb: 4 }}>
				{displayedGames.map((game) => (
					<CardItem key={game.id} game={game} />
				))}
			</Grid>

			<Box sx={{ mb: 4, bgcolor: 'primary_second.main', width: 'max-content', height: 'max-content', borderRadius: '5px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)' }}>
				<Pagination
					sx={{
						padding: '7px',
						'& .MuiPaginationItem-root': {
							color: '#bfc4bf'
						}
					}}
					color='primary'
					size='large'
					shape='rounded'
					showFirstButton
					showLastButton
					count={Math.ceil(games.length / itemsPerPage)}
					page={currentPage}
					onChange={(event, newPage) => setCurrentPage(newPage)}
				/>
			</Box>
		</Box>
	);
}
