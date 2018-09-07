import axios from 'axios';
import { callingRefresh } from './appWide';
import {
  PARKS_GET
} from './types';

const ROOT_URL = 'http://localhost:3090';
const MAIN_URL = 'http://localhost:3000';

export function getParks() {
    return function(dispatch) {
      return axios.get(`${MAIN_URL}/parks`, {
        headers: { authorization: localStorage.getItem('token') }
      })
        .then(response => {
          dispatch({
            type: PARKS_GET,
            payload: response.data
          });  
        })
        .catch(response => {
          //This means the user isn't auth
          //accountErrorCheck(response, "/account", dispatch)
        });
    }
}