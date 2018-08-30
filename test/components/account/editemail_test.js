import { renderComponent, expect, $ } from '../../test_helper';
import EditEmail from '../../../src/components/account/editemail';


describe('EditEmail', () => {
    let component;
  
    beforeEach(() => {
      component = renderComponent(EditEmail, {},  {'account':{'email': 'test123@gmail.com'}});
    });
  
    it('has the correct email id', () => {
      expect(component.find('#email-input')).to.have.id('email-input');
      expect(component.find('#email-input')).to.have.value('test123@gmail.com');
    });

    it('has the correct password id', () => {
      expect(component.find('#password-input')).to.have.id('password-input');
    });
});