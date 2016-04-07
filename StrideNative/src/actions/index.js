import axios from 'axios';

import {
  GOOGLE_KEY,
  UBER_SERVER_TOKEN,
  LYFT_BEARER
} from './keys';

const GOOGLE_MAPS_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const UBER_ROOT_URL = 'https://api.uber.com/v1/estimates/price?';
const LYFT_ROOT_URL = 'https://api.lyft.com/v1/cost?';

export const FETCH_ESTIMATES = 'FETCH_ESTIMATES';
export const FETCH_LOCATION = 'FETCH_LOCATION';

export async function fetchEstimates(start, end) {
  try {
    //let locs = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Paris&types=geocode&key=AIzaSyA-J_DCji-kKHbZ3KcXOGa-FGWqziF7Fa0')

    // TO DO: Handle errors later
    // TO DO: Two step authentication

    let startReq = await axios.get(`${GOOGLE_MAPS_ROOT_URL}${start}&key=${GOOGLE_KEY}`);
    let endReq = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${end}key=${GOOGLE_KEY}`);

    let sLat = startReq.data.results[0].geometry.location.lat;
    let sLng = startReq.data.results[0].geometry.location.lng;
    let eLat = endReq.data.results[0].geometry.location.lat;
    let eLng = endReq.data.results[0].geometry.location.lng;

    let lyftRequest = await fetchLyft(sLat, sLng, eLat, eLng);
    let uberRequest = await fetchUber(sLat, sLng, eLat, eLng);

    return {
      type: FETCH_ESTIMATES,
      payload: {
        lyftRequest: lyftRequest,
        uberRequest: uberRequest
      }
    }

  } catch(error) {
    // Handle error
    console.error(error);
  }

}

// export async function fetchEstimates(sLat, sLng, eLat, eLng) {
//   try {
//     let lyftRequest = await fetchLyft(sLat, sLng, eLat, eLng);
//     let uberRequest = await fetchUber(sLat, sLng, eLat, eLng);
//
//     return {
//       type: FETCH_ESTIMATES,
//       payload: {
//         lyftRequest: lyftRequest,
//         uberRequest: uberRequest
//       }
//     }
//
//   } catch(error) {
//     // Handle error
//     console.error(error);
//   }
// }

export function fetchUber(sLat, sLng, eLat, eLng) {
  axios.defaults.headers.common['Authorization'] = `Token ${UBER_SERVER_TOKEN}`;
  return axios.get(`${UBER_ROOT_URL}start_latitude=${sLat}&start_longitude=${sLng}&end_latitude=${eLat}&end_longitude=${eLng}&server_token=${UBER_SERVER_TOKEN}`);
}

export function fetchLyft(sLat, sLng, eLat, eLng) {
  axios.defaults.headers.common['Authorization'] = LYFT_BEARER;
  return axios.get(`${LYFT_ROOT_URL}start_lat=${sLat}&start_lng=${sLng}&end_lat=${eLat}&end_lng=${eLng}`);
}
