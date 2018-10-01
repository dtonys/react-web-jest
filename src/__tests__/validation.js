import { required, email } from '../helpers/validation';


describe('Validator tests', () => {

  test('required', () => {
    expect(required('')).toBeTruthy();
    expect(required('asdf')).toBeUndefined();
  });

  test('email', () => {
    expect(email('')).toBeTruthy();
    expect(email('asdf')).toBeTruthy();
    expect(email('something@gmail.com')).toBeUndefined();
  });

});
