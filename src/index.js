import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import Profiles from './containers/profiles';
import ProfileView from './containers/profile_view';
import ProfileEdit from './containers/profile_edit'; // should be protected with HOC
import Signup from './containers/signup';
import Signin from './containers/signin';
import Signout from './containers/signout';
import reducers from './reducers';
import { AUTH_USER, UPDATE_PROFILE } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const currentUser = localStorage.getItem('currentUser');
if (token && currentUser) {
  store.dispatch({ type: AUTH_USER });
  store.dispatch({ type: UPDATE_PROFILE, payload: JSON.parse(currentUser) })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Profiles} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="profiles/:id" component={ProfileView} />
        <Route path="edit" component={ProfileEdit} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.render-target'));
