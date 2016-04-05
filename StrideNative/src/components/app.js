import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import SearchBar from '../containers/search_bar';
//import EstimatesList from '../containers/estimates_list';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <SearchBar />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default App;
