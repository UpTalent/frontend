import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSystemMessage: false,
	messageText: '',
	status: 'succes',
};

const systemMessagesSlice = createSlice({
	name: 'systemMessages',
	initialState,
	reducers: {
		setSystemMessage: {
			reducer: (state, action) => {
				Object.keys(state).forEach(key => {
					state[key] = action.payload[key];
				});
				
			},
			prepare: (isSystemMessage, messageText = null, status = 'success') => ({
				payload: {
					isSystemMessage,
					messageText,
					status,
				},
			}),
		},
	},
});

export const getSystemMessage = state => state.systemMessage.messageText;
export const systemMessageStatus = state => state.systemMessage.isSystemMessage;
export const getMessageStatus = state => state.systemMessage.status;

export const { setSystemMessage } = systemMessagesSlice.actions;
export default systemMessagesSlice.reducer;
