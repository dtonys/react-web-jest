import { mount } from 'enzyme';
import React from 'react';
import Login from '../components/Login/Login';


describe('Login Page', () => {

  test('Should mount and render', () => {
    const loginPage = mount( <Login /> );
    // console.log(loginPage.debug());
    expect(loginPage).toEqual(expect.anything());
  });

  test('Shows a form', () => {
    const loginPage = mount( <Login /> );
    expect(loginPage.find('form').exists()).toBe(true);
  });

  test('Shows an error message on submitting with an invalid email', () => {
    const loginPage = mount( <Login /> );
    loginPage.find('input[name="email"]')
      .simulate('change', { target: { value: 'email@test', name: 'email' } });
    loginPage.find('input[name="password"]')
      .simulate('change', { target: { value: '12345678', name: 'password' } });
    loginPage.find('form').simulate('submit');
    expect(
      loginPage.find('[data-test="emailError"]').first().contains('Invalid email')
    ).toBe(true);
  });

  test('Shows an error message on submitting with a blank password', () => {
    const loginPage = mount( <Login /> );
    loginPage.find('input[name="email"]')
      .simulate('change', { target: { value: 'email@test.com', name: 'email' } });
    loginPage.find('input[name="password"]')
      .simulate('change', { target: { value: '', name: 'password' } });
    loginPage.find('form').simulate('submit');
    expect(
      loginPage.find('[data-test="passwordError"]').first().contains('Required field')
    ).toBe(true);
  });

  test('Shows an error message on server error', (done) => {
    const errorResponse = [
      JSON.stringify({
        success: false,
        error: 'incorrect password',
      }),
      { status: 422 },
    ];
    fetch.mockResponseOnce(...errorResponse);

    const loginPage = mount( <Login /> );
    loginPage.find('input[name="email"]')
      .simulate('change', { target: { value: 'email@test.com', name: 'email' } });
    loginPage.find('input[name="password"]')
      .simulate('change', { target: { value: '12345678', name: 'password' } });
    loginPage.find('form').simulate('submit');
    setTimeout(() => {
      loginPage.update();
      expect(
        loginPage.find('[data-test="serverError"]').first().contains('incorrect password')
      ).toBe(true);
      done();
    }, 1);
  });

});
