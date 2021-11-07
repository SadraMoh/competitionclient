import { Id } from "../Id";

export default interface User extends Id {
  fullName: string;
  profileImageFile: FormData;
  profileImageUrl: string;
  bio: string;  
}