import React, { useEffect } from 'react';
import { Filter } from '../components/Filter';
import { Card } from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../store/actions/gameActions';

export function MainPage() {
	const dispatch = useDispatch();

	const { error, loading, games } = useSelector((state) => (state = state.game));

	useEffect(() => {
		dispatch(fetchGames());
	}, []);

	return (
		<div>
			<Filter />
			{games.map((game) => (
				<Card key={game.id} game={game} />
			))}
		</div>
	);
}
