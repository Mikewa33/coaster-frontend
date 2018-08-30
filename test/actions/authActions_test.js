import nock from 'nock'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
  AUTH_EMAIL_SENT,
  AUTH_ERROR_CLEAR
} from '../../src/actions/types';

import * as actions from '../../src/actions/authActions';
const ROOT_URL = 'http://localhost:3090';

describe('auth actions', () => {

    beforeEach(() => {
        nock.disableNetConnect();
        localStorage.setItem("token", '12345');
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });


  describe('feature return', () => {

    it('has the correct type and payload', () => {
      var scope = nock(ROOT_URL,{reqheaders: {
        'authorization': localStorage.getItem("token")
      }}).get('/').reply(200,{ message: 'Super secret code is ABC123' });
      const store = mockStore({ message: '' });

      return store.dispatch(actions.fetchMessage()).then(() => {
        const act = store.getActions();
        const expectedPayload = { type: FETCH_MESSAGE, payload: 'Super secret code is ABC123' }
        expect(act[0].type).to.equal(expectedPayload.type);
        expect(act[0].payload).to.equal(expectedPayload.payload);
      })
    });
  });

  describe('forgotpassword', () => {

    it('has the correct type and payload', () => {
      var scope = nock(ROOT_URL).post('/forgotpassword',function(body) {return { email: 'test@gmail.com'}}).reply(200,{ return_msg: 'An e-mail has been sent to test@gmail.com with further instructions.' });
      const store = mockStore({});

      return store.dispatch(actions.forgotPassword('test@gmail.com')).then(() => {
        const act = store.getActions();
        const expectedPayload = { type: AUTH_EMAIL_SENT, payload: 'An e-mail has been sent to test@gmail.com with further instructions.' }
        expect(act[0].type).to.equal(expectedPayload.type);
        expect(act[0].payload).to.equal(expectedPayload.payload);
      })


    });
  });

  describe('clearErrorMsg',() => {
    it('has the correct type',() =>{
        const act = actions.authClearErrorMsg();
        expect(act.type).to.equal(AUTH_ERROR_CLEAR);
    })
  });

  describe('signinUser', () => {

    it('has the correct type and payload', () => {
      var scope = nock(ROOT_URL).post('/signin',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(200,{ token: "majorbs123" , refreshToken: "bs123"});
      const store = mockStore({});

      return store.dispatch(actions.signinUser('test@gmail.com',"test")).then(() => {
        const act = store.getActions();
        const expectedPayload = { type: AUTH_USER }
        expect(act[0].type).to.equal(expectedPayload.type);
        expect(localStorage.getItem("token")).to.equal("majorbs123");
        expect(localStorage.getItem("refreshToken")).to.equal("bs123");
      })


    });
  });

  describe('signupUser', () => {
    it('has the correct type and payload', () => {
      var scope = nock(ROOT_URL).post('/signup',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(200,{ return_msg:"Plase confirm email" });
      const store = mockStore({});
      //Only checks payload don't care if redirect is correct
      return store.dispatch(actions.signupUser('test@gmail.com',"test")).then(() => {
        const act = store.getActions();
        const expectedPayload = { type: AUTH_EMAIL_SENT, payload: "Plase confirm email" }
        expect(act[0].type).to.equal(expectedPayload.type);
        expect(act[0].payload).to.equal(expectedPayload.payload);
      })


    });
  });

  describe('confirmationEmail', () => {

    it('has the correct type and payload', () => {
      var scope = nock(ROOT_URL).post('/confirmation',function(body) {return { token: 'tokenbs123'}}).reply(200,{ token: "majorbs123" , refreshToken: "bs123"});
      const store = mockStore({});
      //Only checks payload don't care if redirect is correct
      return store.dispatch(actions.confirmationEmail("tokenbs123", () => { return "nothing"})).then(() => {
        const act = store.getActions();
        const expectedPayload = { type: AUTH_USER }
        expect(act[0].type).to.equal(expectedPayload.type);
        expect(localStorage.getItem("token")).to.equal("majorbs123");
        expect(localStorage.getItem("refreshToken")).to.equal("bs123");
      })


    });
  });


  describe('signoutUser',() => {
    it('has the correct type',() =>{
        const act = actions.signoutUser();
        const store = mockStore();
        expect(act.type).to.equal(UNAUTH_USER);
        expect(localStorage.getItem('token')).to.equal(null)
    })
  });


});
