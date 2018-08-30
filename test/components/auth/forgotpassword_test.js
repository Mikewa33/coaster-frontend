import { renderComponent, expect } from '../../test_helper';
import Forgotpassword from '../../../src/components/auth/forgotpassword';

describe('Forgotpassword', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Forgotpassword);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('forgot-password');
  });

  it('has a email input', () => {
    expect(component.find('#email-input')).to.have.id('email-input');
  });

  
  describe('entering some text into email', () => {
    beforeEach(() => {
      component.find('#email-input').simulate('change', 'test@gmail.com');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('#email-input')).to.have.value('test@gmail.com');
    });
  });


  
});