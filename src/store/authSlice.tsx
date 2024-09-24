import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: { email: string } | null;
    isLoggedIn: boolean;
}
    
const initialState: AuthState = {
    token: null,
    user: null,
    isLoggedIn: false,
};
    
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string, user: { email: string } | null }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = !!action.payload.token;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;