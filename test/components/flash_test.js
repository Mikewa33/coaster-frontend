import { renderComponent, expect, $ } from '../test_helper';
import Flash from '../../src/components/flash';


describe('Flash', () => {
  let component;


  beforeEach(() => {
    component = renderComponent(Flash);
  });
  //TO DO TEST DISPLAYING OF flash
  it('has the correct class', () => {
    expect(component).to.have.class('flash');
  });
});