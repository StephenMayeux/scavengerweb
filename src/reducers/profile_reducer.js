import { FETCH_PROFILES } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PROFILES:
      return { ...state, allUsers: action.payload }
  }
  return state;
}
