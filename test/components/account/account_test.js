import { renderComponent, expect, $ } from '../../test_helper';
import Account from '../../../src/components/account/account';


describe('Account', () => {
    let component;
  
    beforeEach(() => {
      component = renderComponent(Account);
    });
  
    it('has the correct email id', () => {
      expect(component.find('#email-change')).to.have.id('email-change');
    });

    it('has the correct password id', () => {
      expect(component.find('#password-change')).to.have.id('password-change');
    });
});