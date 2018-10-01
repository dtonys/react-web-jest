function isEmpty(value) {
  return (value === undefined || value === null || value === '');
}

export function required( value ) {
  if ( isEmpty(value) ) {
    return 'Required field';
  }
  return undefined;
}

export function email(value) {
  if (isEmpty(value) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email';
  }
  return undefined;
}
