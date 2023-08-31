import axios from 'axios';
import { gameSlice } from '../slices/gameSlice';
import queryString from 'query-string';

const formatDate = (dateString) => dateString.split('-').reverse().join('.');

let cachedGames = [];

const fetchGamesData = async (url) => {
	const response = await axios.get(url);
	const games = response.data.map((game) => ({
		...game,
		release_date: formatDate(game.release_date)
	}));
	cachedGames = games;
	return games;
};

const fetchGamesDataWithRetries = async (url, dispatch) => {
	let retries = 3;
	while (retries > 0) {
		try {
			const games = await fetchGamesData(url);

			dispatch(gameSlice.actions.fetchGamesSuccess(games));
			return;
		} catch (error) {
			retries--;
			dispatch(gameSlice.actions.fetchError(error));
		}
	}
};

export const fetchGames =
	(platform = null, category = null, sortBy = null) =>
	async (dispatch) => {
		dispatch(gameSlice.actions.fetching());

		const params = { ...(platform && { platform }), ...(category && { category }), ...(sortBy && { 'sort-by': sortBy }) };
		const url = `/api/games?${queryString.stringify(params)}`;

		if (!cachedGames.length || platform || category || sortBy) {
			await fetchGamesDataWithRetries(url, dispatch);
		} else {
			dispatch(gameSlice.actions.fetchGamesSuccess(cachedGames));
		}
	};
