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
        let res = await http.post('/api/user/login', {
            user,
            password,
        });

        let res2 = await http.get(`api/user/profile/`, {
            headers: {
                Authorization: res.data.token
            },
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                user: {
                    userid: res2.data.user.userID,
                    username: res2.data.user.username,
                    bio: res2.data.user.bio,
                    photo: res2.data.user.imagePath
                }
                
            },
        });
    } catch (err) {
        console.error(err);
        dispatch({ type: LOGIN_FAIL });
    }
};

export const register = (username, password, email) => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });

    try {
        let res = await http.post('/api/user/register', {
            email,
            username,
            password,
        });

        let res2 = await http.get(`api/user/profile/`, {
            headers: {
                Authorization: res.data.token
            },
        });

        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                token: res.data.token,
                user: {
                    userid: res2.data.user.userID,
                    username: res2.data.user.username,
                    bio: res2.data.user.bio,
                    photo: res2.data.user.imagePath
                }
            },
        });

    } catch (err) {
        console.error(err);
        dispatch({ type: REGISTER_FAIL });
    }
};

export const logout = async () => {
    dispatch({ type: LOGOUT_SUCCESS });
};