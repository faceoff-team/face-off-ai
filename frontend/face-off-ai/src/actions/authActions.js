import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types';

import { http } from '../store';

export const loadUser = async (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING});

    //Get token from state.
    const token = getState().auth.token;

    try {
        let res = await http.get('/api/user/profile');

        dispatch({ 
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const login = (user, password) => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });

    try {
        console.log('asking server.');
        let res = await http.post('/api/user/login', {
            user,
            password,
        });

        console.log(res);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                user: null,
            },
        });
    } catch (err) {
        console.error(err);
        dispatch({ type: LOGIN_FAIL });
    }
};

export const register = (username, password, email) => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS});

    try {
        let res = await http.post('/api/user/register', {
            username,
            password,
            email,
        });

        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                token: res.data.token,
                user: null,
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({ type: REGISTER_FAIL });
    }
}