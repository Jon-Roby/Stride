import React from 'react-native';
import {
  Component,
  View,
  Text,
  TextInput,
  ListView,
  ScrollView,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class EstimatesList extends Component {

  renderEstimates(estimatesData) {
    return (
      <View key={estimatesData.type}>
        <Text>{estimatesData.company}</Text>
        <Text>{estimatesData.type}</Text>
        <Text>{estimatesData.minPrice}</Text>
        <Text>{estimatesData.maxPrice}</Text>
        <Text>{estimatesData.currency}</Text>
      </View>
    )
  }

  render() {
    console.log("props: ", this.props.estimates);
    return (
      <View style={styles.description}>
        {this.props.estimates.map(this.renderEstimates)}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  description: {
    marginTop: 100,
  }
});

function mapStateToProps({ estimates }) {
  return { estimates }; // { estimates } === { estimates: estimates }
}

export default connect(mapStateToProps)(EstimatesList);
