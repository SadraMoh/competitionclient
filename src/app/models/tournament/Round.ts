import { Id } from "../Id";
import { QuestionOption } from "./QuestionOption";

export interface Round extends Id {
  /** id for the question */
  questionId: number;
  questionText: string;
  questionOptions: QuestionOption[];
}