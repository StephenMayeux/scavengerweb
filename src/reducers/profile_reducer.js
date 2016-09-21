import { FETCH_PROFILES } from '../actions/types';

const INITIAL_STATE = { allProfiles: [], profile: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PROFILES:
      return { ...state, allProfiles: action.payload }
  }
  return state;
}
