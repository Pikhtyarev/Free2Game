import axios from 'axios';
import { gameSlice } from '../slices/gameSlice';

export const fetchGames = () => {
	return async (dispatch) => {
		try {
			dispatch(gameSlice.actions.fetching());

			const response = await axios.get('/api/games');
			console.log(response);

			dispatch(gameSlice.actions.fetchSuccess(response.data));
		} catch (error) {
			dispatch(gameSlice.actions.fetchError(error));
		}
	};
};
