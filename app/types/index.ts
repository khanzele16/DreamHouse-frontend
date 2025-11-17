export interface IRegisterForm {
  name: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  identifier: string;
  password: string;
}