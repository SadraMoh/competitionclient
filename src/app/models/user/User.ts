import { Id } from "../Id";
import { Spoils } from "./Spoils";

export default interface User extends Id {
  fullName: string;
  // profileImageFile?: File;
  profileImageUrl: string;
  bio: string;
  spoils?: Spoils;
}