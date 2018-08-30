import { renderComponent, expect, $ } from '../test_helper';
import Header from '../../src/components/header';


describe('Header', () => {
  let component;


  beforeEach(() => {
    component = renderComponent(Header);
  });
  //Find a way to set props
  it('has the correct class', () => {
    expect(component).to.have.class('header');
  });
});