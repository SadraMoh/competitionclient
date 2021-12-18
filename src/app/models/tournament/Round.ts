import { Id } from "../Id";
import { Question } from "./Question";

export interface Round extends Id {
  questions: Question[]
}