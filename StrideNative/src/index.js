import React from 'react-native';
import {
  Component
} from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'; 

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

class Native extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Native;
