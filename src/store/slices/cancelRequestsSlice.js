import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const cancelRequestsSlice = createSlice({
	name: 'cancelRequests',
	initialState,
	reducers: {
		cancelPreviousRequests: (state) => !state
	}
});

export const { cancelPreviousRequests } = cancelRequestsSlice.actions;

export default cancelRequestsSlice.reducer;
