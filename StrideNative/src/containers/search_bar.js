import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEstimates } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLatitude: '37.7772',
      startLongitude: '-122.4233',
      endLatitude: '37.7972',
      endLongitude: '-122.4533'
    };

    this.onStartLatChange = this.onStartLatChange.bind(this);
    this.onStartLongChange = this.onStartLongChange.bind(this);
    this.onEndLatChange = this.onEndLatChange.bind(this);
    this.onEndLongChange = this.onEndLongChange.bind(this);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onStartLatChange(text) {
    this.setState({ startLatitude: text });
  }

  onStartLongChange(event) {
    this.setState({ startLongitude: event.target.value });
  }

  onEndLatChange(event) {
    this.setState({ endLatitude: event.target.value });
  }

  onEndLongChange(event) {
    this.setState({ endLongitude: event.target.value });
  }

  onFormSubmit(event) {
    console.log(event.target.value);
    event.preventDefault();
    this.props.fetchEstimates(this.state.startLatitude, this.state.startLongitude, this.state.endLatitude, this.state.endLongitude);

    // To remove:
    // this.setState({ ... })
  }

  render() {
    return (

      <ScrollView contentContainerStyle={styles.contentContainer}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Enter latitude"
        value={this.state.startLatitude}
        onChangeText={this.onStartLatChange} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Enter latitude"
          value={this.state.startLatitude}
          onChangeText={this.onStartLatChange} />

      </ScrollView>




    );
  }
}

// <ScrollView>
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder="Enter latitude"
//   value={this.state.startLatitude}
//   onChangeText={this.onStartLatChange} />
//   <TextInput
//     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//     placeholder="Enter latitude"
//     value={this.state.startLatitude}
//     onChangeText={this.onStartLatChange} />
//
// </ScrollView>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textEdit: {
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  contentContainer: { paddingVertical: 20, paddingHorizontal: 20 } 
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
