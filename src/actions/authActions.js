import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
  CLEAN_FLASH,
  AUTH_EMAIL_SENT,
  AUTH_ERROR,
  AUTH_ERROR_CLEAR
} from './types';

import { callingRefresh, flash } from './appWide'

const ROOT_URL = 'http://localhost:3090';

export function forgotPassword({email}){
  return function(dispatch){
    return axios.post(`${ROOT_URL}/forgotpassword`,{email})
      .then(response => {
        dispatch(emailWasSent(response.data.return_msg));

      })
      .catch(response => {
        dispatch(authError("Emails are down try again later"));
      })
  }
}

export function resetPassword({password},token_query, callback){
  return function(dispatch){
    axios.post(`${ROOT_URL}/resetpassword`,{password,token_query})
      .then(response =>{
        dispatch(flash(response.data.return_msg));
        window.setTimeout(() => {
          dispatch({ type: CLEAN_FLASH })
        }, 8000);
        callback();
      }).catch(() =>{
        dispatch(authError("Something went wrong please try again"));
      })
    }
}


export function signinUser({ email, password }, callback) {
  return function(dispatch) {
    // Submit email/password to the server
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // - redirect to the route '/feature'
        callback();
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password, username }) {
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then(response => {
        dispatch(emailWasSent(response.data.return_msg));
      })
      .catch(response => {
        dispatch(authError(response.response.data.error));});
  }
}

export function confirmationEmail(token, callback){
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/confirmation`, { token })
      .then(response => {
        //dispatch(emailWasSent(response.data.return_msg));
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // - redirect to the route '/feature'
        callback()
      })
      .catch(response => {
        dispatch(authError(response.response.data.error));});
  }
}

export function emailWasSent(msg){
  return {
    type: AUTH_EMAIL_SENT,
    payload: msg
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    return axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
      .catch(response => {
        //This means the user isn't auth
        callingRefresh(response,"/feature",dispatch);
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function authClearErrorMsg(){
  return {
    type: AUTH_ERROR_CLEAR
  }
}

/* export function callingRefresh(response, previous_url,dispatch){
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
} */
