import { Id } from "../Id";

export default interface User extends Id {
  fullName: string;
  profileImageFile?: File;
  profileImageUrl: string;
  bio: string;  
}