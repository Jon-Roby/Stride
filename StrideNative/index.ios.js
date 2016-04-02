import React, {
  AppRegistry,
  Component
} from 'react-native';

import App from './src/index';

class StrideNative extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('StrideNative', () => StrideNative);
