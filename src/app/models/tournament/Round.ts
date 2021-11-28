import { Id } from "../Id";
import { QuestionOption } from "./QuestionOption";

export interface Round extends Id {
  questionText: string;
  questionOptions: QuestionOption[];
}