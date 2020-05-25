export default function validateLogin(values) {
  let errors = {};
  if (values.name.length <= 0) {
    errors.name = 'name is invalid';
  }
  if (values.name.length >= 20) {
    errors.name = 'name is to long';
  }
  if (values.type === 'automatic' && values.price === '') {
    errors.price = 'price must be a number';
  }
  return errors;
}
