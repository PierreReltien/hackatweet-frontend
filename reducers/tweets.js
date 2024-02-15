import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.push(action.payload);
		},
		removeTweet: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},
		removeAllTweet: (state) => {
			state.value = [];
		},
	},
});

export const { addTweet, removeTweet, removeAllTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
