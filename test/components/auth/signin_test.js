import { renderComponent, expect } from '../../test_helper';
import Signin from '../../../src/components/auth/signin';

describe('Signin', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Signin);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('sign-in');
  });

  it('has a email input', () => {
    expect(component.find('#email-input')).to.have.id('email-input');
  });

  it('has a password input', () => {
    expect(component.find('#password-input')).to.have.id('password-input');
  });


  

  it('forgot password link is there', () => {
    expect(component.find('#forgot-password-link')).to.have.id('forgot-password-link');
  });

  describe('entering some text into email', () => {
    beforeEach(() => {
      component.find('#email-input').simulate('change', 'test@gmail.com');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('#email-input')).to.have.value('test@gmail.com');
    });
  });

  describe('entering some text into password', () => {
    beforeEach(() => {
      component.find('#password-input').simulate('change', 'test1234');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('#password-input')).to.have.value('test1234');
    });
  });


  
});