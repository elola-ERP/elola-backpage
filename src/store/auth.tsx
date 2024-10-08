import Cookies from 'js-cookie';
import { axiosInstance } from '../api/axiosClient';
import { login, logout } from './authSlice';
import { AppDispatch } from './store';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        // Perform the API call using axios
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });

        const result = response.data;

        if (response.status === 200) {
            const token = result?.data?.access_token;
            if (token) {
                Cookies.set('authToken', token);
                dispatch(login({ token, user: { email } }));
                return { success: true };
            }
        } else {
            console.log(result);
            return { success: false, message: result.message || 'Login failed' };
        }
    } catch (error: any) {
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
