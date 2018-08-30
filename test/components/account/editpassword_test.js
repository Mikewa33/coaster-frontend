import { renderComponent, expect, $ } from '../../test_helper';
import EditPassword from '../../../src/components/account/editpassword';


describe('EditPassword', () => {
    let component;
  
    beforeEach(() => {
      component = renderComponent(EditPassword);
    });
  
    it('has the correct password id', () => {
      expect(component.find('#current-password-input')).to.have.id('current-password-input');
    });

    it('has the correct new password id', () => {
      expect(component.find('#new-password-input')).to.have.id('new-password-input');
    });

    it('has the correct confirm password id', () => {
        expect(component.find('#confirm-password-input')).to.have.id('confirm-password-input');
    });
});