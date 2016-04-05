import React, { Component } from 'react';
import { connect } from 'react-redux';

// <tr key={estimatesData.display_name}>
//   <td>{estimatesData.display_name}</td>
//   <td>{estimatesData.estimate}</td>
//   <td>{estimatesData.low_estimate}</td>
//   <td>{estimatesData.high_estimate}</td>
//   <td>{estimatesData.duration}</td>
//   <td>{estimatesData.surge_multiplier}</td>
//   <td>{estimatesData.currency_code}</td>
// </tr>

// <th>Price</th>
// <th>Low Estimate</th>
// <th>High Estimate</th>
// <th>Duration</th>
// <th>Surge Multiplier</th>
// <th>Currency Code</th>

class EstimatesList extends Component {

  renderEstimates(estimatesData) {
    // console.log("estimatesData: ", estimatesData);
    // console.log(estimatesData.display_name);
    return (
      <tr key={estimatesData.type}>
        <td>{estimatesData.company}</td>
        <td>{estimatesData.type}</td>
        <td>{estimatesData.minPrice}</td>
        <td>{estimatesData.maxPrice}</td>
        <td>{estimatesData.currency}</td>
      </tr>
    )
  }

  render() {
    // console.log("props: ", this.props.estimates);
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Company</th>
            <th>Type</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Currency</th>
          </tr>
        </thead>

        <tbody>
          {this.props.estimates.map(this.renderEstimates)}
        </tbody>
      </table>
    )
  }
}

// function mapStateToProps(state) {
//   // this is from reducer/index.js
//   return { estimates: state.estimates }
// }

// Condense ->

// function mapStateToProps({ estimates }) {
//   // const estimates = state.estimates;
//   return { estimates: estimates };
// }

// Condense ->

function mapStateToProps({ estimates }) {
  return { estimates }; // { estimates } === { estimates: estimates }
}

export default connect(mapStateToProps)(EstimatesList);
