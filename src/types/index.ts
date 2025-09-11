
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
export type IProject = {
  id: string;
  slug: string;
  name: string;
  url: string;
  images: string[];
  description: string;
  skills: string[];
  code: string;
  demo: string;
};
export type ISkill = {
  id: string;
  name: string;
  percent: number;
};
export type IReaction = {
  id: string;
  project_id: string;
  reaction_type: string;
  ip_address: string;
};