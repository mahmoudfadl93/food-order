import { ILogin } from "./login.model";

export interface IUser extends ILogin {
  id?:string
}
