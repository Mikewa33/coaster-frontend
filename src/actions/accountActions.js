import axios from 'axios';
import { callingRefresh } from './appWide'
import {
    ACCOUNT_INFO, ACCOUNT_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';


export function getAccountInfo() {
    return function(dispatch) {
      return axios.get(`${ROOT_URL}/account`, {
        headers: { authorization: localStorage.getItem('token') }
      })
        .then(response => {
            dispatch({
                type: ACCOUNT_INFO,
                payload: response.data.email
            });  
        })
        .catch(response => {
          //This means the user isn't auth
          accountErrorCheck(response, "/account", dispatch)
        });
    }
  }

export function updateEmail({ email, password }, callback) {
    return function(dispatch) {
        return axios.post(`${ROOT_URL}/account_email`,{ email: email, password: password}, {
            headers: { authorization: localStorage.getItem('token') } 
          }).then(response => {
            dispatch({
                type: ACCOUNT_INFO,
                payload: response.data.email
            });
            callback()
        })
        .catch(response => {
          //This means the user isn't auth
          accountErrorCheck(response, "/account", dispatch)
          //callingRefresh(response,"/account",dispatch);
        });
    }
}

export function updatePassword({currentPassword, password}, callback) {
    return function(dispatch) {
        return axios.post(`${ROOT_URL}/account_password`,{ currentPassword: currentPassword, password: password}, {
            headers: { authorization: localStorage.getItem('token') } 
          }).then(response => {
            callback()
        })
        .catch(response => {
          //This means the user isn't auth
          accountErrorCheck(response, "/account", dispatch)
          //callingRefresh(response,"/account",dispatch);
        });
    }
}

function accountErrorCheck(response, path, dispatch) {
    if(response.response.data.error){
        dispatch(accountError(response.response.data.error))
    }else{
        callingRefresh(response,path,dispatch);
    }
}

function accountError(error) {
    return {
      type: ACCOUNT_ERROR,
      payload: error
    };
  }