import { TFunction } from 'i18next';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isPasswordValid = (
  password: string,
  t: TFunction<'translation', 'settingsPage'>
): string => {
  let errorMessage: string = t('passwordErrors.mustHave');
  const errorMessageStartLength = errorMessage.length;

  if (password.length < 8) {
    errorMessage += t('passwordErrors.eightChars');
  }

  if (!/\d/.test(password)) {
    if (errorMessage.length > errorMessageStartLength) {
      errorMessage += ',';
    }
    errorMessage += t('passwordErrors.number');
  }

  if (!/[a-zäåö]/.test(password)) {
    if (errorMessage.length > errorMessageStartLength) {
      errorMessage += ',';
    }
    errorMessage += t('passwordErrors.smallLetter');
  }

  if (!/[A-ZÄÅÖ]/.test(password)) {
    if (errorMessage.length > errorMessageStartLength) {
      errorMessage += ',';
    }
    errorMessage += t('passwordErrors.bigLetter');
  }

  if (!/[^a-zA-Z0-9äåöÄÅÖ]/.test(password)) {
    if (errorMessage.length > errorMessageStartLength) {
      errorMessage += ',';
    }
    errorMessage += t('passwordErrors.specialChar');
  }

  if (errorMessage.length <= errorMessageStartLength) {
    errorMessage = '';
  }

  return errorMessage;
};

export const arePasswordsSame = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const isUsernameValid = (username: string): boolean => {
  return username.length >= 3;
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
