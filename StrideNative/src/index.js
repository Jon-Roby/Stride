import React from 'react-native';
import {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Yo World</Text>
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
