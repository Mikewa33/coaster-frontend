import nock from 'nock'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import {
    ACCOUNT_INFO,
    ACCOUNT_ERROR
} from '../../src/actions/types';

import * as actions from '../../src/actions/accountActions';
const ROOT_URL = 'http://localhost:3090';

describe('account actions', () => {

    beforeEach(() => {
        nock.disableNetConnect();
        localStorage.setItem("token", '12345');
    });

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });


    describe('get account info return', () => {
        it('has the correct type and payload', () => {
          var scope = nock(ROOT_URL,{reqheaders: {
            'authorization': localStorage.getItem("token")
          }}).get('/account').reply(200,{ email: 'test123@gmail.com' });
          const store = mockStore({ email: '' });
    
          return store.dispatch(actions.getAccountInfo()).then(() => {
            const act = store.getActions();
            const expectedPayload = { type: ACCOUNT_INFO, payload: 'test123@gmail.com' }
            expect(act[0].type).to.equal(expectedPayload.type);
            expect(act[0].payload).to.equal(expectedPayload.payload);
          })
        });
    });

    describe('update email', () => {
        it('has the correct type and payload', () => {
          var scope = nock(ROOT_URL,{reqheaders: {'authorization': localStorage.getItem("token")}}).post('/account_email',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(200,{email: 'test1@gmail.com'});
          const store = mockStore({});
    
          return store.dispatch(actions.updateEmail({"email":'test@gmail.com',"password":"test"},() => { return null})).then(() => {
            const act = store.getActions();
            const expectedPayload = { type: ACCOUNT_INFO, payload: 'test1@gmail.com' }
            expect(act[0].type).to.equal(expectedPayload.type);
            expect(act[0].payload).to.equal(expectedPayload.payload);
          })
        });

        it('gets an error message', () => {
            var scope = nock(ROOT_URL,{reqheaders: {'authorization': localStorage.getItem("token")}}).post('/account_email',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(401,{error: 'Cant change email'});
            const store = mockStore({});
      
            return store.dispatch(actions.updateEmail({"email":'test@gmail.com',"password":"test"},() => { return null})).then(() => {
              const act = store.getActions();
              const expectedPayload = { type: ACCOUNT_ERROR, payload: 'Cant change email' }
              expect(act[0].type).to.equal(expectedPayload.type);
              expect(act[0].payload).to.equal(expectedPayload.payload);
            })
          });
    });


    describe('update password', () => {
        it('has the correct type and payload', () => {
          var scope = nock(ROOT_URL,{reqheaders: {'authorization': localStorage.getItem("token")}}).post('/account_password',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(200,{});
          const store = mockStore({});
    
          return store.dispatch(actions.updatePassword({"currentPassword":'123456',"password":"test"},() => { return null})).then(() => {
            //nothing to check just confirm it doesn't error on the request
          })
        });

        it('gets an error message', () => {
            var scope = nock(ROOT_URL,{reqheaders: {'authorization': localStorage.getItem("token")}}).post('/account_password',function(body) {return { email: 'test@gmail.com', password: "test"}}).reply(401,{error: 'Cant change password'});
            const store = mockStore({});
      
            return store.dispatch(actions.updatePassword({"currentPassword":'123456',"password":"test"},() => { return null})).then(() => {
              const act = store.getActions();
              const expectedPayload = { type: ACCOUNT_ERROR, payload: 'Cant change password' }
              expect(act[0].type).to.equal(expectedPayload.type);
              expect(act[0].payload).to.equal(expectedPayload.payload);
            })
        });
    });
});