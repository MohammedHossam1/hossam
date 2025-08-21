
export interface IUser {
  name: string,
  email: string,
  avatar: string,

}
type SignInName = "phone" | "password";
export type SignInInput = {
  id: string;
  name: SignInName;
  lable: string;
  type: string;
};
type SignUpName =
  | "name"
  | "email"
  | "phone"
  | "password"
  | "password_confirmation"
export type SignUpInput = {
  id: string;
  name: SignUpName;
  lable: string;
  type: string;
};