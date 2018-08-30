import { renderComponent, expect, $ } from '../../test_helper';
import Resetpassword from '../../../src/components/auth/resetpassword';


describe('Signout', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Resetpassword);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('reset-password');
  });


  it('has a password input', () => {
    expect(component.find('#password-input')).to.have.id('password-input');
  });

  it('has a confirm password input', () => {
    expect(component.find('#password-confirm-input')).to.have.id('password-confirm-input');
  });

  describe('entering some text into password', () => {
    beforeEach(() => {
      component.find('#password-input').simulate('change', 'test1234');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('#password-input')).to.have.value('test1234');
    });
  });

  describe('entering some text into confirm password', () => {
    beforeEach(() => {
      component.find('#password-confirm-input').simulate('change', 'test1234');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('#password-confirm-input')).to.have.value('test1234');
    });
  });

  //TO-DO TEST REDUX VALDIATION
  /*describe('checking if error displays on inputs being different', () => {
    beforeEach(() => {
      component.find('#password-input').simulate('change', 'test123457');
      component.find('#password-confirm-input').simulate('change', 'test1234');
    });

    it('shows that text in the textarea', () => {
      component.find('#password-input').simulate('change', 'test123457');
      component.find('#password-confirm-input').simulate('change','1');
      console.log(component.find('#password-confirm-div'))
      expect(component.find('#password-confirm-input')).to.have.value('test1234');
    });
  });*/
});