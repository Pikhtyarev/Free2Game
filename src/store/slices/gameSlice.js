import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	error: '',
	games: []
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		fetching(state) {
			state.loading = true;
		},
		fetchSuccess(state, action) {
			state.loading = false;
			state.games = action.payload;
		},
		fetchError(state, action) {
			state.loading = false;
			state.error = action.payload.message;
		}
	}
});

export default gameSlice.reducer;
