import { FETCH_ESTIMATES } from '../actions/index';


export default function(state = [], action) {

  switch (action.type) {
    // case FETCH_ESTIMATES:
    //   console.log(action);
    //
    //   var uberCons = action.payload.uberRequest.data.prices.map((car) => {
    //     return {
    //       company: "Uber",
    //       type: car.display_name,
    //       currency: car.currency_code,
    //       minPrice: car.minimum,
    //       maxPrice: car.high_estimate
    //     }
    //   }).sort((left, right) => { return left.minPrice - right.minPrice });
    //
    //   var lyftCons = action.payload.lyftRequest.data.cost_estimates.map((car) => {
    //     return {
    //       company: "Lyft",
    //       type: car.display_name,
    //       currency: car.currency,
    //       minPrice: (car.estimated_cost_cents_min/100).toFixed(2),
    //       maxPrice: (car.estimated_cost_cents_max/100).toFixed(2)
    //     }
    //   }).sort((left, right) => { return left.minPrice - right.minPrice });
    //
    //   var result = [...uberCons, ...lyftCons].sort((left, right) => {return left.minPrice - right.minPrice});
    //   return result;


    case FETCH_ESTIMATES:

      var uberCons = action.payload.uberRequest.data.prices.map((car) => {
        return {
          company: "Uber",
          type: car.display_name,
          currency: car.currency_code,
          minPrice: car.minimum,
          maxPrice: car.high_estimate
        }
      }).sort((left, right) => { return left.minPrice - right.minPrice });

      var lyftCons = action.payload.lyftRequest.data.cost_estimates.map((car) => {
        return {
          company: "Lyft",
          type: car.display_name,
          currency: car.currency,
          minPrice: (car.estimated_cost_cents_min/100).toFixed(2),
          maxPrice: (car.estimated_cost_cents_max/100).toFixed(2)
        }
      }).sort((left, right) => { return left.minPrice - right.minPrice });

      var result = [...uberCons, ...lyftCons].sort((left, right) => {return left.minPrice - right.minPrice});
      return result;
  }
  return state;
}
