import React, {
  AppRegistry,
  Component
} from 'react-native';

import Native from './src/index';

class StrideNative extends Component {
  render() {
    return (
      <Native />
    );
  }
}

AppRegistry.registerComponent('StrideNative', () => StrideNative);
