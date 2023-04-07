import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSystemMessage: false,
	messageText: '',
};

const systemMessagesSlice = createSlice({
	name: 'systemMessages',
	initialState,
	reducers: {
		setSystemMessage: {
			reducer: (state, action) => {
				state.isSystemMessage = action.payload.isMessage;
				state.messageText = action.payload.messageText;
			},
			prepare: (isMessage, messageText = null) => ({
				payload: {
					isMessage,
					messageText,
				},
			}),
		},
	},
});

export const { setSystemMessage } = systemMessagesSlice.actions;
export default systemMessagesSlice.reducer;
