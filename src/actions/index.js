import {LOGOUT_USER, AUTH_ERROR, AUTH_USER, SQL_IMPORT, FETCH_FIGHTERS} from './types';
import axios from 'axios';

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

const BASE_URL = 'http://localhost:3000/api';

export function fetchFighters() {
    const request = instance.get(`${BASE_URL}/fighters`);
    return {
        type: FETCH_FIGHTERS,
        payload: request
    }
}

export function sqlImport() {
    const request = instance.post(`${BASE_URL}/events`);
    return {
        type: SQL_IMPORT,
        payload: request
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function signinUser({username, password}) {
    return function (dispatch) {
        axios.post(`${BASE_URL}/users/login`, {username, password}).then(resp => {
            // console.log('axios success', resp);
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', resp.data.token);
            history.push('/console');
        }).catch(err => {
            // console.log('axios failure', err);
            dispatch(authError('bad login info'))
        })
    }
}

export function signupUser({username, password}) {
    return function(dispatch) {
        axios.post(`${BASE_URL}/users/register`, {username, password}).then(resp => {
            // console.log('axios success', resp);
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', resp.data.token);
            history.push('/console');

        }).catch(err => {
            // console.log('axios failure', err);
            dispatch(authError(err.response.data.error));
        })
    }
}


export function authError(err) {
    return {
        type: AUTH_ERROR,
        payload: err
    }
}
