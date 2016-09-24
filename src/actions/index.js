import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        FETCH_MESSAGE,
        FETCH_PROFILES,
        FETCH_ONE_PROFILE,
        UPDATE_PROFILE } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_PROFILE, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/edit');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ name, email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { name, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_PROFILE, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/edit');
      })
      .catch(() => {
        dispatch(authError('Email in use'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

// example of making auth'd requests
export function fetchMessage() {
  axios.get(API_URL, {
    headers: { authorization: localStorage.getItem('token') }
  })
  .then(response => {
    dispatch({
      type: FETCH_MESSAGE,
      payload: response.data.message
    });
  });
}

export function fetchProfiles() {
  return function(dispatch) {
    axios.get(`${API_URL}/profiles`)
      .then(response => {
        dispatch({ type: FETCH_PROFILES, payload: response });
      });
  }
}

export function fetchOneProfile(id) {
  return function(dispatch) {
    axios.get(`${API_URL}/profiles/${id}`)
      .then(response => {
        dispatch({ type: FETCH_ONE_PROFILE, payload: response });
      });
  }
}

export function editUser(id, { name, email, city, homepage, avatar }) {
  return function(dispatch) {
    axios.put(`${API_URL}/profiles/${id}`, { name, email, city, homepage, avatar })
      .then(response => {
        console.log('about to dispatch', response);
        dispatch({ type: UPDATE_PROFILE, payload: response.data })
        browserHistory.push(`/profiles/${id}`);
      });
  }
}
