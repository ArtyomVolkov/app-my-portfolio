const RegExp = {
  email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
};

const email = (value: string): string|null => {
  if (!value.length) {
    return "Email is required";
  }
  return !RegExp.email.test(value) ? 'Invalid email' : null;
};

const password = (value) => {
  if (!value.length) {
    return "Password is required";
  }
  return !RegExp.password.test(value) ? 'Invalid password': null
};

export default { email, password };