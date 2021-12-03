import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_SUCCESS,
    UPDATE_FAIL
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
}

export const update = (username_input, bio_input, id_input, token_input, photo_input) => async (dispatch) => {
    try {
        const res = await http.put("/api/user/profile", {
            username: username_input,
            bio: bio_input,
            id: id_input, 
            photo: photo_input
        }, {
            headers: {
                authorization: token_input
            }
        });

        dispatch({
            type: UPDATE_SUCCESS,
            payload: {
                token: token_input,
                user: {
                    userid: id_input,
                    username: username_input,
                    bio: bio_input,
                    photo: photo_input
                }
            }
        });
        return "success";
        
    }
    catch (err) {
        console.log(err);
        dispatch({type: UPDATE_FAIL});
        return null;
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
    return "success";
};
