import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        FETCH_MESSAGE,
        FETCH_PROFILES } from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        console.log(response);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
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
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
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
  const response = axios.get(`${API_URL}/profiles`);
  return {
    type: FETCH_PROFILES,
    payload: response
  };
}

export function fetchOneProfile(id) {
  const response = axios.get(`${API_URL}/profiles/${id}`);
  return {
    type: FETCH_ONE_PROFILE,
    payload: response
  };
}
