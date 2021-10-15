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
        let res = await http.get('/api/user/profile', config);

        dispatch({ 
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const login = async (user, password) => (dispatch) => {
    dispatch({ type: LOGOUT });

    try {
        let res = await http.post('/api/user/login', {
            user,
            password,
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token,
        });
    } catch (err) {
        console.error(err);
        dispatch({ type: LOGIN_FAIL });
    }
};