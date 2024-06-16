export interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type User = Omit<SignupFormData, 'confirmPassword'>

export type LoggedInUser = Omit<User, 'password'> & { friends: string[], id: string }

export interface LoggedInUserWithToken {
  user: LoggedInUser,
  token: string
}

export interface LoginFormData {
  username: string,
  password: string
}