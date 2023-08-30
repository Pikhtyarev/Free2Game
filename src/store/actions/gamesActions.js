import axios from 'axios';
import { gameSlice } from '../slices/gameSlice';
import queryString from 'query-string';

const formatDate = (dateString) => {
	const piece = dateString.split('-');
	return `${piece[2]}.${piece[1]}.${piece[0]}`;
};

let cachedGames = [];

export const fetchGames = (platform = null, category = null, sortBy = null) => {
	return async (dispatch) => {
		try {
			dispatch(gameSlice.actions.fetching());

			const params = { ...(platform && { platform }), ...(category && { category }), ...(sortBy && { 'sort-by': sortBy }) };

			const url = `https://www.freetogame.com/api/games?${queryString.stringify(params)}`;

			console.log(url);

			let games = cachedGames;
			if (!cachedGames.length || platform || category || sortBy) {
				const response = await axios.get(url);
				games = response.data.map((game) => ({
					...game,
					release_date: formatDate(game.release_date)
				}));
				cachedGames = games;
			}

			dispatch(gameSlice.actions.fetchGamesSuccess(games));

			console.log(games);
		} catch (error) {
			dispatch(gameSlice.actions.fetchError(error));
		}
	};
};
