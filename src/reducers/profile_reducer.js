import { FETCH_PROFILES, FETCH_ONE_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE } from '../actions/types';

const INITIAL_STATE = { allProfiles: [], profile: null, user: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROFILES:
      return { ...state, allProfiles: action.payload }
    case FETCH_ONE_PROFILE:
      return { ...state, profile: action.payload }
    case UPDATE_PROFILE:
      return { ...state, user: action.payload }
    case CLEAR_PROFILE:
      return { ...state, profile: null }
  }
  return state;
}
