import { Id } from "../Id";
import { Question } from "./Question";

export interface Round extends Id {
  score: number;
  hasAttended: boolean;
  isTrueResponseCount: number;
  isFalseResponseCount: number;
  questions: Question[];
  time?: string;
}