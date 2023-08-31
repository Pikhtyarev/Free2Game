import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import cancelRequestsReducer from './slices/cancelRequestsSlice';

const appReducer = combineReducers({
	game: gameReducer,
	cancelRequests: cancelRequestsReducer
});

export function setupStore() {
	return configureStore({ reducer: appReducer });
}
