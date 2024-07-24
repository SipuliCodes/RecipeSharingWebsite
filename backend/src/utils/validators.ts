import { ValidateMessage } from "../interfaces/validatorInterfaces";

export const emailValidator = {
  validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  message: (props: ValidateMessage) => `${props.value} is not a valid email`
};