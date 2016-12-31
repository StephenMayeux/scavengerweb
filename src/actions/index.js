import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        FETCH_MESSAGE,
        FETCH_PROFILES,
        FETCH_ONE_PROFILE,
        UPDATE_PROFILE,
        CLEAR_PROFILE } from './types';

const API_URL = 'http://localhost:3000';
//const API_URL = 'https://sandboxauthserver.herokuapp.com';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/user/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_PROFILE, payload: response.data.user }); // do I need this?
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        browserHistory.push(`/profiles/${response.data.user._id}`);
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ firstname, lastname, email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/user/signup`, { firstname, lastname, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_PROFILE, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        browserHistory.push('/');
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
  localStorage.removeItem('currentUser');
  return { type: UNAUTH_USER };
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

export function editUser(id, { firstname, lastname }) {
  return function(dispatch) {
    axios.put(`${API_URL}/user/profiles/${id}`, { firstname, lastname })
      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data.profile));
        dispatch({ type: UPDATE_PROFILE, payload: response.data.profile })
        browserHistory.push(`/`);
      });
  }
}

export function clearProfile() {
  return function(dispatch) {
    dispatch({ type: CLEAR_PROFILE });
  }
}
