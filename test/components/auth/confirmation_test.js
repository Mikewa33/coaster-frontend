import { renderComponent, expect, $ } from '../../test_helper';
import Confirmation from '../../../src/components/auth/confirmation';


describe('Confirmation', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Confirmation);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('confirmation');
  });

  it('shows correct exit text', () => {
    expect(component).to.have.text("Email Confirmed! Please proceed to the the App");
  });
});
