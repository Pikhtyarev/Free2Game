import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

const appReducer = combineReducers({
	game: gameReducer
});

export function setupStore() {
	return configureStore({ reducer: appReducer });
}
