import { renderComponent, expect, $ } from '../../test_helper';
import Signout from '../../../src/components/auth/signout';


describe('Signout', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Signout);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('sign-out');
  });

  it('shows correct exit text', () => {
    expect(component).to.have.text('Sorry to see you go...');
  });
});