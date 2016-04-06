import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEstimates } from '../actions/index';

import EstimatesList from './estimates_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLatitude: '37.7772',
      startLongitude: '-122.4233',
      endLatitude: '37.7972',
      endLongitude: '-122.4533',
      isLoading: false
    };

    this.onStartLatChange = this.onStartLatChange.bind(this);
    this.onStartLongChange = this.onStartLongChange.bind(this);
    this.onEndLatChange = this.onEndLatChange.bind(this);
    this.onEndLongChange = this.onEndLongChange.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // event.nativeEvent.text
  onStartLatChange(text) {
    this.setState({ startLatitude: text });
  }

  onStartLongChange(text) {
    this.setState({ startLongitude: text });
  }

  onEndLatChange(text) {
    this.setState({ endLatitude: text });
  }

  onEndLongChange(text) {
    this.setState({ endLongitude: text });
  }

  onFormSubmit(event) {
    this.setState({ isLoading: true });
    this.props.fetchEstimates(this.state.startLatitude, this.state.startLongitude, this.state.endLatitude, this.state.endLongitude)
      .then((res) => {
        console.log("the response: ", res);
        this.props.navigator.push({
          title: 'Results',
          component: EstimatesList,
          passProps: {info: res}
        })
      })

    // To remove:
    // this.setState({ ... })
  }

  render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Where do you want to go?
        </Text>

        <Text style={styles.description}>
          Search by maps or enter coordinates manually.
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter latitude"
            value={this.state.startLatitude}
            onChangeText={this.onStartLatChange} />

          <TextInput
            style={styles.searchInput}
            placeholder="Enter longitude"
            value={this.state.startLongitude}
            onChangeText={this.onStartLongChange} />

          <TextInput
            style={styles.searchInput}
            placeholder="Enter latitude"
            value={this.state.endLatitude}
            onChangeText={this.onEndLatChange} />

          <TextInput
            style={styles.searchInput}
            placeholder="Enter longitude"
            value={this.state.endLongitude}
            onChangeText={this.onEndLongChange} />
        </View>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.onFormSubmit.bind(this)}>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
      </View>
    );
  }
}








// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   textEdit: {
//     height: 40,
//     borderColor: 'grey',
//     backgroundColor: 'white',
//     borderWidth: 1
//   },
//   contentContainer: { paddingVertical: 20, paddingHorizontal: 20 }
// });

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
});


// <form onSubmit={this.onFormSubmit} className="input-group">
//   <input
//     placeholder="Enter latitude"
//     className="form-control"
//     value={this.state.startLatitude}
//     onChange={this.onStartLatChange} />
//
//   <input
//     placeholder="Enter longitude"
//     className="form-control"
//     value={this.state.startLongitude}
//     onChange={this.onStartLongChange} />
//
//   <input
//     placeholder="Enter latitude"
//     className="form-control"
//     value={this.state.endLatitude}
//     onChange={this.onEndLatChange} />
//
//   <input
//     placeholder="Enter longitude"
//     className="form-control"
//     value={this.state.endLongitude}
//     onChange={this.onEndLongChange} />
//
//   <span className="input-group-btn">
//     <button type="submit" className="btn btn-secondary">Submit</button>
//   </span>
// </form>

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEstimates }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
