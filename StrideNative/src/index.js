import React from 'react-native';
import {
  Component
} from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';

import App from './app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
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
