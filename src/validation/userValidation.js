export const validateLogin = (login) => {
  const MIN_LENGTH = 4;
  const MAX_LENGTH = 16;
  if (login.length < MIN_LENGTH) return `Length must be at least ${MIN_LENGTH} symbols`;
  if (!/^[a-zA-Z]/.test(login)) return 'Must start with a letter';
  if (!/^[a-zA-Z0-9]+$/.test(login)) return 'Must containt only a-z, A-Z, 0-9';
  if (login.length > MAX_LENGTH) return `Length must not exceed ${MAX_LENGTH} symbols`;

  return '';
}

export const validateName = (name) => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 16;
  if (name.length < MIN_LENGTH) return `Length must be at least ${MIN_LENGTH} symbols`;
  if (!/^[a-zA-Z]+$/.test(name)) return `Must containt only a-z, A-Z`;
  if (name.length > MAX_LENGTH) return `Length must not exceed ${MAX_LENGTH} symbols`;

  return '';
}

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/; ///^[^\s@]+@[^\s@]+\.[^\s@]+$/ To prevent matching multiple @ signs
  if (!re.test(email)) return 'The email is not valid';

  return '';
}

export const validatePassword = (password) => {
  const MIN_LENGTH = 4;
  const MAX_LENGTH = 16;
  if (password.length < MIN_LENGTH) return `Length must be at least ${MIN_LENGTH} symbols`;
  if (!/^[a-zA-Z0-9]+$/.test(password)) return 'Must containt only a-z, A-Z, 0-9';
  if (!/(?=.*\d)/.test(password)) return 'Should contain at least one digit';
  if (!/(?=.*[a-z])/.test(password)) return 'Should contain at least one lower case letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Should contain at least one upper case letter';
  if (password.length > MAX_LENGTH) return `Length must not exceed ${MAX_LENGTH} symbols`;

  return '';
}

export const comparePasswords = (password, repassword) => {
  if (password !== repassword || !repassword.length) return 'Passwords do not match';

  return '';
}

export const validateDataToUpdate = (firstName, lastName, login) => {
  const result = {
    success: true,
    firstName: validateName(firstName),
    lastName: validateName(lastName),
    login: validateLogin(login),
  };

  if (result.firstName || result.lastName || result.login) {
    result.success = false;
  }

  return result;
};

