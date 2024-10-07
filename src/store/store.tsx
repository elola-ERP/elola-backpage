import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taxReducer from './taxSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        taxes: taxReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;