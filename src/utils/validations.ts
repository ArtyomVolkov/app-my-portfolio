const email = (value: string): string|null => {
  if (!value.length) {
    return "Email is required";
  }
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value) ? null : 'Invalid email';
};

const password = (value) => {
  if (!value.length) {
    return "Password is required";
  }
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) ? null: 'Invalid password';
};

export default { email, password };