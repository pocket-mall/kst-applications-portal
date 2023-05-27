import {Admin} from "pocketbase";

export interface AdminAuthResponse {
  [key: string]: any;
  token: string;
  admin: Admin;
}
