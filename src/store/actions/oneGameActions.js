import axios from 'axios';
import { gameSlice } from '../slices/gameSlice';

const formatDate = (dateString) => dateString.split('-').reverse().join('.');

const fetchGameData = async (id) => {
	const url = `/api/game?id=${id}`;
	const response = await axios.get(url);

	return {
		...response.data,
		release_date: formatDate(response.data.release_date)
	};
};

const fetchGameDataWithRetries = async (id, dispatch) => {
	let retries = 3;
	let error = null;
	while (retries > 0) {
		try {
			const game = await fetchGameData(id);

			sessionStorage.setItem(`game${id}`, JSON.stringify({ data: game, timestamp: Date.now() }));
			dispatch(gameSlice.actions.fetchGameSuccess(game));

			setTimeout(() => sessionStorage.removeItem(`game${id}`), 5 * 60 * 1000);

			return;
		} catch (e) {
			error = e;
			retries--;
		}
	}
	dispatch(gameSlice.actions.fetchError(error));
};

export const fetchOneGame = (id) => async (dispatch) => {
	const cachedGame = JSON.parse(sessionStorage.getItem(`game${id}`));

	if (cachedGame && Date.now() - cachedGame.timestamp <= 5 * 60 * 1000) {
		dispatch(gameSlice.actions.fetchGameSuccess(cachedGame.data));
		return;
	}

	dispatch(gameSlice.actions.fetching());

	await fetchGameDataWithRetries(id, dispatch);
};
