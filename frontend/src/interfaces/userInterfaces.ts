export interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type User = Omit<SignupFormData, 'confirmPassword'>

export interface LoginFormData {
  username: string,
  password: string
}