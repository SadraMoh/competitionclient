import { Id } from "../Id";

export interface UpdatePassword extends Id {
  oldPassword: string;
  newPassword: string;
}