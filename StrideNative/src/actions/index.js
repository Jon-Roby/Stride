import axios from 'axios';

import {
  UBER_SERVER_TOKEN,
  LYFT_BEARER
} from './keys';

const UBER_ROOT_URL = 'https://api.uber.com/v1/estimates/price?';
const LYFT_ROOT_URL = 'https://api.lyft.com/v1/cost?';

export const FETCH_ESTIMATES = 'FETCH_ESTIMATES';

export async function fetchEstimates(sLat, sLng, eLat, eLng) {
  try {
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

export function fetchUber(sLat, sLng, eLat, eLng) {
  axios.defaults.headers.common['Authorization'] = `Token ${UBER_SERVER_TOKEN}`;
  return axios.get(`${UBER_ROOT_URL}start_latitude=${sLat}&start_longitude=${sLng}&end_latitude=${eLat}&end_longitude=${eLng}&server_token=${UBER_SERVER_TOKEN}`);
}

export function fetchLyft(sLat, sLng, eLat, eLng) {
  axios.defaults.headers.common['Authorization'] = LYFT_BEARER;
  return axios.get(`${LYFT_ROOT_URL}start_lat=${sLat}&start_lng=${sLng}&end_lat=${eLat}&end_lng=${eLng}`);
}
