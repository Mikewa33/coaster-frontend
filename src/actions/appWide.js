import axios from 'axios';

import {
  UNAUTH_USER,
  FLASH
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function callingRefresh(response, previous_url,dispatch){
  axios.get(`${ROOT_URL}/refreshing`, {
    headers: { authorization: localStorage.getItem('refreshToken') }
  })
  .then(response => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    //Isnt great but gets the job done. It is a quick double reload
    window.location.reload();
  })
  .catch(response => {
    localStorage.removeItem('token');
    dispatch({
      type: UNAUTH_USER
    });
  });
}


export function flash(flash) {
  return {
    type: FLASH,
    payload: flash
  };
}

