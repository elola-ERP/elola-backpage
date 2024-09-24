import Cookies from 'js-cookie';
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

        const result = await response.json();

        if (response.ok) {
            const token = result.data?.access_token;
            if (token) {
                Cookies.set('authToken', token);
                dispatch(login({ token, user: { email } }));
                return { success: true };
            }
        } else {
            console.log(result);    
            return { success: false, message: result.message || 'Login failed' };
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An unexpected error occurred' };
    }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
    console.log("button clicked");
    Cookies.remove('authToken');
    dispatch(logout());
};

export const checkAuth = () => (dispatch: AppDispatch) => {
    const token = Cookies.get('authToken');
    if (token) {
        dispatch(login({ token, user: null }));
    }
};
