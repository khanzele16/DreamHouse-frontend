export interface IRegisterForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  identifier: string;
  password: string;
}