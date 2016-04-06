import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import SearchBar from '../containers/search_bar';
import EstimatesList from '../containers/estimates_list';

class App extends Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchBar,
        }}/>

    );
  }
}

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

export default App;
