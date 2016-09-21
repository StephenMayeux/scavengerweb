import { FETCH_PROFILES, FETCH_ONE_PROFILE } from '../actions/types';

const INITIAL_STATE = { allProfiles: [], profile: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROFILES:
      return { ...state, allProfiles: action.payload }
    case FETCH_ONE_PROFILE:
      return { ...state, profile: action.payload }
  }
  return state;
}
