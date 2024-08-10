import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        signupForm: {
          signup: 'Sign Up',
          firstName: 'First name',
          lastName: 'Last name',
          username: 'Username',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm password',
          create: 'Create Account',
        },
        loginForm: {
          login: 'Login',
          username: 'Username or email',
          password: 'Password',
        }
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
