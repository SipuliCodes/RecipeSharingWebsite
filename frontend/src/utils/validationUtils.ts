export const isPasswordValid = (password: string): string => {
  let errorMessage: string = 'Password must have';
  if (password.length < 8) {
    errorMessage += ' atleast 8 characters';
  }
  if (!/\d/.test(password)) {
    if (errorMessage.length > 13) {
      errorMessage += ',';
    }
    errorMessage += ' a number';
  }

  if (!/[a-zäåö]/.test(password)) {
    if (errorMessage.length > 13) {
      errorMessage += ',';
    }
    errorMessage += ' a small letter';
  }

  if (!/[A-ZÄÅÖ]/.test(password)) {
    if (errorMessage.length > 13) {
      errorMessage += ',';
    }
    errorMessage += ' a big letter';
  }

  if (!/[^a-zA-Z0-9äåöÄÅÖ]/.test(password)) {
    if (errorMessage.length > 13) {
      errorMessage += ',';
    }
    errorMessage += ' a special character';
  }

  if (errorMessage.length < 14) {
    errorMessage = '';
  }

  return errorMessage;
};

export const arePasswordsSame = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const isUsernameValid = (username: string): boolean => {
  return username.length >= 3;
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};