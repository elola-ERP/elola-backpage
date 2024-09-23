import { login, logout } from './authSlice';
import { AppDispatch } from './store';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch('https://salemate-be-production.up.railway.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            }
        );

        if (response.ok) {
            const result = await response.json();
            const token = result.data?.access_token;
            if (token) {
                localStorage.setItem('authToken', token);
                dispatch(login({ token, user: { email } }));
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('authToken');
    dispatch(logout());
};

export const checkAuth = () => (dispatch: AppDispatch) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // You might want to validate the token with your backend here
        dispatch(login({ token, user: null }));
    }
};
