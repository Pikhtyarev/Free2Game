import axios from 'axios';
import { gameSlice } from '../slices/gameSlice';

const formatDate = (dateString) => {
	const piece = dateString.split('-');
	return `${piece[2]}.${piece[1]}.${piece[0]}`;
};

export const fetchOneGame = (id) => {
	sessionStorage.removeItem(`game${id}`);

	return async (dispatch) => {
		const cachedGame = JSON.parse(sessionStorage.getItem(`game${id}`));

		if (cachedGame && new Date().getTime() - cachedGame.timestamp <= 30 * 1000) {
			dispatch(gameSlice.actions.fetchGameSuccess(cachedGame.data));
			return;
		}

		try {
			dispatch(gameSlice.actions.fetching());

			const url = `/api/game?id=${id}`;

			const response = await axios.get(url);

			const game = response.data;
			game.release_date = formatDate(game.release_date);

			console.log(game);

			sessionStorage.setItem(`game${id}`, JSON.stringify({ data: game, timestamp: new Date().getTime() }));
			dispatch(gameSlice.actions.fetchGameSuccess(game));

			setTimeout(() => {
				sessionStorage.removeItem(`game${id}`);
			}, 30 * 1000);
		} catch (error) {
			dispatch(gameSlice.actions.fetchError(error));
		}
	};
};
