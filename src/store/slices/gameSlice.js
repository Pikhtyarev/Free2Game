import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	error: '',
	games: [],
	cachedGames: []
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		fetching(state) {
			state.loading = true;
			state.error = '';
		},
		fetchGameSuccess(state, action) {
			state.loading = false;
			state.game = action.payload;
			state.error = '';
		},
		fetchGamesSuccess(state, action) {
			state.loading = false;
			state.games = action.payload;
			state.cachedGames = action.payload;
			state.error = '';
		},
		fetchError(state, action) {
			state.loading = false;
			state.error = `Failed to get data. Error: ${action.payload.message}`;
		}
	}
});

export default gameSlice.reducer;
