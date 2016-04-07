import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  MapView,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEstimates } from '../actions/index';

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">










//   // Create the search box and link it to the UI element.
//   var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(input);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//
//
//
//
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });
//
//   var markers = [];
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();
//
//     if (places.length == 0) {
//       return;
//     }
//
//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];
//
//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };
//
//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));
//
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//   });
// }







import EstimatesList from './estimates_list';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLatitude: '37.7772',
      startLongitude: '-122.4233',
      endLatitude: '37.7972',
      endLongitude: '-122.4533',

      start: '808 Stanyan St San Francisco, CA 94117',
      end: '1080 Folsom St San Francisco, CA 94103',

      isLoading: false
    };

    this.onStartLatChange = this.onStartLatChange.bind(this);
    this.onStartLongChange = this.onStartLongChange.bind(this);
    this.onEndLatChange = this.onEndLatChange.bind(this);
    this.onEndLongChange = this.onEndLongChange.bind(this);

    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);

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

  onStartChange(text) {
    this.setState({ start: text});
  }

  onEndChange(text) {
    this.setState({ end: text});
  }

  // onFormSubmit(event) {
  //   this.setState({ isLoading: true });
  //   this.props.fetchEstimates(this.state.startLatitude, this.state.startLongitude, this.state.endLatitude, this.state.endLongitude)
  //     .then((res) => {
  //       console.log("the response: ", res);
  //       this.props.navigator.push({
  //         title: 'Results',
  //         component: EstimatesList,
  //         passProps: {info: res}
  //       })
  //     })
  //
  //   // To remove:
  //   // this.setState({ ... })
  // }

  onFormSubmit(event) {
    this.props.fetchEstimates(this.state.start, this.state.end)
      .then((res) => {
        this.props.navigator.push({
          title: 'Results',
          component: EstimatesList,
          passProps: {info: res}
        });
      });
  }

  render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>

        {/* Search */}
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter start"
            value={this.state.start}
            onChangeText={this.onStartChange} />

          <TextInput
            style={styles.searchInput}
            placeholder="Enter end"
            value={this.state.end}
            onChangeText={this.onEndChange} />
        </View>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.onFormSubmit.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>

        { /* <MapView
          style={ styles.map }
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

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
        </TouchableHighlight> */ }
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
},

map: {
  height: 300,
  width: 300,
  padding: 4,
  marginRight: 5,
  flex: 4,

  borderWidth: 1,
  borderColor: '#48BBEC',
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
