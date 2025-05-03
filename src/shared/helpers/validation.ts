const messages = {
  requiredField: 'Field is required',
  confirmPassword: 'Passwords did not matches'
}

const requiredField = (value: string, message = messages.requiredField) => {
  return !value.length ? message: null;
};

const confirmPassword = (password: string, confirm: string, message = messages.confirmPassword) => {
  return password !== confirm ? message : null;
}

const minLength = (value: string, num: number) => {
  return value.length < num ? `Min length ${num}` : null;
}

const maxLength = (value: string, num: number) => {
  return value.length > num ? `Max length ${num}` : null;
}

export default {
  requiredField,
  minLength,
  maxLength,
  confirmPassword
}