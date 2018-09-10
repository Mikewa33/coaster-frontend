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
          console.log(Date.now())
          let coasters = []
          for(let i = 0; response.data.length > i; i++){
            coasters = coasters.concat(response.data[i].coasters);
          }
          console.log(Date.now())
          dispatch({
            type: PARKS_GET,
            payload: {parks: response.data, coasters: coasters}
          });  
        })
        .catch(response => {
          console.log(response)
          //This means the user isn't auth
          //accountErrorCheck(response, "/account", dispatch)
        });
    }
}