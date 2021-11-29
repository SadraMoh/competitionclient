import { Id } from "../Id";

export interface Participant extends Id {
  imageUrl: string;
  fullName: string;
  score: string;
  responseLifeTime: number;
}