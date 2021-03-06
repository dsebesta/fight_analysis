import {LOGOUT_USER, AUTH_ERROR, AUTH_USER, SQL_IMPORT, FETCH_EVENTS_ALL, FETCH_EVENT, FETCH_MATCHUP, FETCH_FIGHTER} from './types';
import axios from 'axios';

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

const BASE_URL = 'http://derricksebesta.com:3000/api';
// const BASE_URL = 'http://localhost:3000/api';

export function sqlImport() {
    const request = instance.post(`${BASE_URL}/admin/scrape_data`);
    return {
        type: SQL_IMPORT,
        payload: request
    }
}

export function fetchEventsAll() {
    const request = instance.get(`${BASE_URL}/event`);
    return {
        type: FETCH_EVENTS_ALL,
        payload: request
    }
}

export function fetchEvent(id) {
    const request = instance.get(`${BASE_URL}/event/${id}`);
    return {
        type: FETCH_EVENT,
        payload: request
    }
}

export function fetchFighter(id) {
    const request = instance.get(`${BASE_URL}/fighter/${id}`);
    return {
        type: FETCH_FIGHTER,
        payload: request
    }
}

export function fetchMatchup(id, matchup) {
    const request = instance.get(`${BASE_URL}/fighter/${id}/${matchup}`);
    return {
        type: FETCH_MATCHUP,
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
