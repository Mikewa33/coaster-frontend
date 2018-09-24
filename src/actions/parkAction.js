import axios from 'axios';
import {
  PARKS_GET,
  PARK_GET,
  PARK_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';
const MAIN_URL = 'http://localhost:3000';

import { callingRefresh, flash } from './appWide'

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
          parkErrorCheck(response, "/", dispatch)
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
      parkErrorCheck(response, "/", dispatch)
       //Puts refresh here if auth is stale
    });
  }
}
export function setParkVist(id, value, set_value = false){
  return function(dispatch) {
    return axios.post(`${MAIN_URL}/parks/${id}/set_visit_count`,{value: value, set_value: set_value}, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: PARK_GET,
        payload: response.data
      })
    })
    .catch(response => {
      parkErrorCheck(response, "/", dispatch)
       //Puts refresh here if auth is stale
    });
  }
}

function parkErrorCheck(response, path, dispatch) {
  const token = localStorage.getItem('token');
  if(response.response.data.error){
    dispatch(parkError(response.response.data.error))
  }else if(token){
    callingRefresh(response,path,dispatch);
  }
  else{
    console.log("POP UP")
    //display sign up pop up
  }
}

function parkError(error) {
  return {
    type: PARK_ERROR,
    payload: error
  };
}

