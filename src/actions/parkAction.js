import axios from 'axios';
import {
  PARKS_GET,
  PARK_GET
} from './types';

const ROOT_URL = 'http://localhost:3090';
const MAIN_URL = 'http://localhost:3000';

export function getParks() {
    return function(dispatch) {
      return axios.get(`${MAIN_URL}/parks`)
        .then(response => {
          let coasters = []
          for(let i = 0; response.data.length > i; i++){
            coasters = coasters.concat(response.data[i].coasters);
          }
          dispatch({
            type: PARKS_GET,
            payload: {parks: response.data, coasters: coasters}
          });  
        })
        .catch(response => {
          //Puts flash msg error
        });
    }
}

export function getParkInfo(id){
  return function(dispatch) {
    return axios.get(`${MAIN_URL}/parks/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: PARK_GET,
        payload: response.data
      })
    })
    .catch(response => {
       //Puts refresh here if auth is stale
    });
  }
}
// axios.post(`${ROOT_URL}/account_email`,{ email: email, password: password}
export function setParkVist(id, value){
  return function(dispatch) {
    return axios.post(`${MAIN_URL}/parks/${id}/set_visit_count`,{value: value}, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      //dispatch({
      //  type: PARK_GET,
       // payload: response.data
      //})
    })
    .catch(response => {
       //Puts refresh here if auth is stale
    });
  }
}

